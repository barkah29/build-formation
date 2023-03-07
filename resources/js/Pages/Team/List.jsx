import Layouts from "@/Layouts/Layouts";
import React, { useMemo, useState, useCallback, useRef } from "react";
import Container from "@/Components/Container";
import Title from "@/Components/Title/Title";
import { Head } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { Inertia } from "@inertiajs/inertia";
import { Dialog } from "@headlessui/react";
import Draggable from "react-draggable";
import Player from "@/Components/Player/Player";
import * as htmlToImage from "html-to-image";

function FieldFormation({ data, dataRef }) {
    return (
        <div className="relative field w-[378px] h-[480px]" ref={dataRef}>
            {data?.players?.length > 0 ? (
                data?.players?.map((item, i) => (
                    <>
                        <Draggable
                            position={{
                                x: item.posx ? parseFloat(item.posx) : 50,
                                y: parseFloat(item.posy),
                            }}
                            key={i}
                            disabled={true}
                        >
                            <div
                                className={`absolute ${
                                    i >= 5
                                        ? "cursor-default pointer-events-none"
                                        : "cursor-move"
                                }`}
                            >
                                <Player
                                    color={i + 1 === 1 && "#FFBF00"}
                                    bodyColor={data.primary}
                                    armColor={data.secondary}
                                    key={i}
                                    className={`${i >= 5 && "scale-[0.8]"}`}
                                    avatar={item.avatar || undefined}
                                />

                                {item.avatar ? (
                                    <p
                                        className={`absolute inset-0 flex justify-center items-center text-md font-bold`}
                                        style={{
                                            color: "white",
                                        }}
                                    >
                                        <span className="rounded-full drop-shadow-md">
                                            {item.number}
                                        </span>
                                    </p>
                                ) : (
                                    <p
                                        className={`absolute inset-0 flex justify-center items-center text-md font-bold`}
                                        style={{
                                            color: "white",
                                        }}
                                    >
                                        {item.number}
                                    </p>
                                )}

                                <p
                                    className={`text-sm absolute z-[50] text-outline bottom-0 right-1/2 translate-x-1/2 translate-y-full w-[100px] text-center text-white break-words`}
                                >
                                    {item.name || "Player"}
                                </p>
                            </div>
                        </Draggable>
                    </>
                ))
            ) : (
                <div className="absolute inset-0 flex justify-center items-center bg-black/50">
                    <p className="text-white text-2xl font-bold break-words">
                        Formasi tim belum di buat
                    </p>
                </div>
            )}
        </div>
    );
}

function ViewTeam({ data, isOpen, setIsOpen }) {
    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-[99999]"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mt-5 rounded bg-white">
                        <Dialog.Title
                            className={"flex items-center justify-center my-2"}
                        >
                            <span className="font-semibold text-2xl">
                                Tim: {data?.name}
                            </span>
                        </Dialog.Title>
                        {/* field formation */}
                        <FieldFormation data={data} />
                        <div className="p-2">
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="bg-rose-500 py-2 px-4 rounded text-white "
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}

function PreviewTeam({ data }) {
    const [modalView, setModalView] = useState(false);
    function handleTeam(data) {
        setModalView(true);
        setTeam(data);
    }
    return (
        <>
            <button
                className="bg-blue-500 px-4 py-2 rounded-md text-white capitalize font-semibold active:bg-blue-600 transition-colors"
                onClick={() => handleTeam(data)}
            >
                preview
            </button>
            {modalView && (
                <ViewTeam
                    isOpen={modalView}
                    setIsOpen={setModalView}
                    data={data}
                />
            )}
        </>
    );
}

function SaveImage({ data }) {
    const refFormation = useRef(null);
    const [progress, setProgress] = useState(false);

    const capture = useCallback(() => {
        setProgress(true);
        setTimeout(() => {
            if (refFormation.current === null) {
                return false;
            }
            htmlToImage
                .toPng(refFormation.current)
                .then(function (dataUrl) {
                    var link = document.createElement("a");
                    link.download = "Formation.png";
                    link.href = dataUrl;
                    link.click();
                    setProgress(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 1000);
    }, [refFormation]);

    return (
        <>
            <div className="flex items-center">
                {data?.players?.length === 0 ? (
                    <p>-</p>
                ) : (
                    <button
                        className="bg-indigo-500 text-white py-2 px-4 rounded"
                        onClick={() => capture()}
                    >
                        Export
                    </button>
                )}
            </div>

            {progress && (
                <Dialog
                    open={progress}
                    onClose={() => setIsOpen(false)}
                    className="relative z-[99999]"
                >
                    <div
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                    />

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="mt-5 rounded bg-white">
                            {/* field formation */}
                            <FieldFormation
                                data={data}
                                isExporting={progress}
                                dataRef={refFormation}
                            />
                            <div className="absolute inset-0 flex justify-center items-center bg-black/70">
                                <div className="flex items-center">
                                    <p className="text-white text-2xl font-bold break-words">
                                        Menyimpan gambar
                                    </p>
                                    <img
                                        src="/assets/icon-animated/spinner.svg"
                                        width={100}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </>
    );
}

export default function List(props) {
    const [data, setData] = useState(props.collection.data || []);
    const [search, setSearch] = useState(false);
    const customStyles = {
        rows: {
            style: {
                minHeight: "72px",
            },
        },
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "18px",
            },
        },
        cells: {
            style: {
                fontWeight: "semibold",
                fontSize: "16px",
            },
        },
    };
    const columns = [
        {
            name: "No",
            selector: (row, i) => i + 1,
        },
        {
            name: "Nama tim",
            selector: (row) => row.name,
        },
        {
            name: "Opsi",
            selector: (row) => (
                <>
                    {row.id !== 1 ? (
                        <>
                            <div className="flex gap-2">
                                <PreviewTeam
                                    data={{
                                        id: row.id,
                                        name: row.name,
                                        players: row.players,
                                        primary: row.primary,
                                        secondary: row.secondary,
                                    }}
                                />
                                <SaveImage
                                    data={{
                                        id: row.id,
                                        name: row.name,
                                        players: row.players,
                                        primary: row.primary,
                                        secondary: row.secondary,
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <span>-</span>
                    )}
                </>
            ),
        },
    ];

    const dataTeam = useMemo(() => {
        if (!search) return data;
        return data.filter((item, i) => {
            return item.name.toLowerCase().includes(search.toLowerCase());
        });
    }, [search]);

    const getData = (value) => {
        Inertia.get(`/team?page=${value}`);
    };
    return (
        <>
            <Head title="Home" />
            <Layouts>
                {/* editor */}
                <section>
                    <Container>
                        <div className="p-2 md:w-[60rem] mx-auto rounded-lg ">
                            <div className="flex justify-between items-center flex-row">
                                <Title>Daftar Tim</Title>
                                <div className="flex gap-1 md:gap-5 items-center">
                                    <label className="md:text-xl" htmlFor="">
                                        Search :
                                    </label>
                                    <input
                                        type="text"
                                        className="rounded-lg w-36 h-8"
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <DataTable
                                className="mt-5 shadow-md"
                                columns={columns}
                                data={dataTeam}
                                paginationServer
                                pagination
                                paginationTotalRows={
                                    search
                                        ? dataTeam.length
                                        : props.collection.total
                                }
                                paginationDefaultPage={
                                    props.collection.current_page
                                }
                                paginationComponentOptions={{
                                    noRowsPerPage: true,
                                }}
                                paginationPerPage={props.collection.per_page}
                                highlightOnHover
                                onChangePage={(page) => getData(page)}
                                customStyles={customStyles}
                            />
                        </div>
                    </Container>
                </section>
            </Layouts>
        </>
    );
}
