import Button from "@/Components/Button";
import Container from "@/Components/Container";
import ColGroup from "@/Components/Form/ColGroup";
import Input from "@/Components/Form/Input";
import Label from "@/Components/Form/Label";
import RowGroup from "@/Components/Form/RowGroup";
import InputError from "@/Components/InputError";
import Player from "@/Components/Player/Player";
import TabsButton from "@/Components/Tabs/TabsButton";
import Layouts from "@/Layouts/Layouts";
import * as htmlToImage from "html-to-image";
import { formationOption } from "@/utils/Options";
import {
    formation211,
    formation22,
    formation301,
    positionDefault,
} from "@/utils/Position";
import { Menu, Tab } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { CompactPicker } from "react-color";
import Draggable from "react-draggable";
import CreatableSelect from "react-select/creatable";
import Footer from "@/Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillCamera, AiOutlineLoading3Quarters } from "react-icons/ai";
import { convertToBase64, resizeImage } from "@/utils/Base64Compressed";
import { strBeforeNumber } from "@/utils";
import { v4 as uuidv4 } from "uuid";

export default function Editor(props) {
    // eslint-disable-next-line no-unused-vars
    const { team, players, flash, errors } = props;
    const [positionPlayer, setPositionPlayer] = useState([]);
    const [teamName, setTeamName] = useState(team.name || "");
    const [formationName, setFormationName] = useState(team.formation || 22);
    const [bodyColor, setBodyColor] = useState(team.primary || "#D33115");
    const [armColor, setArmColor] = useState(team.secondary || `#FCDC00`);
    const [fontColor, setFontColor] = useState("#FFFFFF");
    const [imageProcessing, setImageProcessing] = useState({});

    const handleFormation = (e) => {
        if (!e.value) return false;
        const dataPlayer = [...positionPlayer];

        if (e.value === 22) {
            formation22.forEach((item, i) => {
                const findPlayer = dataPlayer.find(
                    (item, indexPlayer) => indexPlayer === i
                );
                findPlayer.name = findPlayer.name;
                findPlayer.number = findPlayer.number;
                findPlayer.avatar = findPlayer.avatar;
                findPlayer.posx = item.posx;
                findPlayer.posy = item.posy;
            });
        }
        if (e.value === 301) {
            formation301.forEach((item, i) => {
                const findPlayer = dataPlayer.find(
                    (item, indexPlayer) => indexPlayer === i
                );
                findPlayer.name = findPlayer.name;
                findPlayer.number = findPlayer.number;
                findPlayer.avatar = findPlayer.avatar;
                findPlayer.posx = item.posx;
                findPlayer.posy = item.posy;
            });
        }
        if (e.value === 211) {
            formation211.forEach((item, i) => {
                const findPlayer = dataPlayer.find(
                    (item, indexPlayer) => indexPlayer === i
                );
                findPlayer.name = findPlayer.name;
                findPlayer.number = findPlayer.number;
                findPlayer.avatar = findPlayer.avatar;
                findPlayer.posx = item.posx;
                findPlayer.posy = item.posy;
            });
        }
        setFormationName(e.value);
        return setPositionPlayer(dataPlayer);
    };

    const handleChangePlayer = (e, id, attr) => {
        const player = [...positionPlayer];
        const findPlayer = player.find((item) => item.id === id);
        if (attr === "icon") {
            findPlayer.icon = e.value;
        } else {
            if (e.target.name === "name") {
                findPlayer.name = e.target.value || "Player";
            }
            if (e.target.name === "nomor") {
                findPlayer.number =
                    e.target.value >= 100 ? 100 : e.target.value;
            }
        }
        console.log(player);
        setPositionPlayer(player);
    };

    const handlePlayerPosition = (id, x, y) => {
        const player = [...positionPlayer];
        const findPlayer = player.find((item) => item.id === id);
        findPlayer.posx = x;
        findPlayer.posy = y;
        setPositionPlayer(player);
    };

    const handleFormationSave = () => {
        Inertia.post(route("team.save"), {
            name: teamName,
            formation: formationName,
            primary: bodyColor,
            secondary: armColor,
            players: positionPlayer,
        });
        console.log({
            name: teamName,
            formation: formationName,
            primary: bodyColor,
            secondary: armColor,
            players: positionPlayer,
        });
    };

    const refFormation = useRef(null);
    const capture = useCallback(() => {
        if (refFormation.current === null) {
            return false;
        }
        htmlToImage
            .toPng(refFormation.current, {
                cacheBust: true,
                quality: 1,
                canvasWidth: 1512,
                canvasHeight: 1840,
            })
            .then(function (dataUrl) {
                var link = document.createElement("a");
                link.download = "Formation.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refFormation]);

    const uploadRef = useRef([]);
    const handleClickFile = (index) => {
        uploadRef.current[index].click();
    };
    const handleUploadAvatar = (e, index) => {
        setImageProcessing({ ...imageProcessing, [index]: true });
        const files = e.target.files[0];
        const player = [...positionPlayer];
        const findPlayer = player.find(
            (item, indexPlayer) => indexPlayer === index
        );
        convertToBase64(files, function (err, data) {
            if (err) {
                console.log(err);
            }
            resizeImage(data, 200, 200).then((result) => {
                console.log({
                    original: data.length,
                    compressed: result.length,
                });
                findPlayer.avatar = result;
                setTimeout(() => {
                    setPositionPlayer(player);
                    setImageProcessing({ ...imageProcessing, [index]: false });
                }, 1000);
            });
        });
    };

    useEffect(() => {
        const dataDefault = positionDefault.map((item) => {
            return {
                ...item,
                id: uuidv4(),
            };
        });
        setPositionPlayer(players.length > 0 ? players : dataDefault);
    }, [players]);

    useEffect(() => {
        if (flash.success) {
            toast.success(`${flash.success}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        if (flash.error) {
            toast.error(`${flash.error}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        if (JSON.stringify(errors) !== "{}") {
            toast.error(`Gagal menyimpan formasi`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }, [flash, errors]);
    return (
        <>
            <Layouts>
                {flash.success || flash.error || errors ? (
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover={false}
                        theme="light"
                    />
                ) : (
                    <></>
                )}
                <Head title="Formation" />
                <section className="w-full my-[2rem]">
                    <Container>
                        <div className="flex flex-col p-4 w-full md:w-[51rem] h-full bg-white rounded-lg">
                            <div className="flex flex-col md:flex-row md:gap-[1.2rem]">
                                <div className="flex flex-col">
                                    <div className="flex justify-center md:justify-around gap-3 mb-4">
                                        <Button
                                            className=" bg-slate-900"
                                            onClick={() => capture()}
                                        >
                                            Save as image
                                        </Button>
                                        <Button
                                            className=" bg-slate-900"
                                            onClick={() => {
                                                handleFormationSave();
                                            }}
                                        >
                                            Save formation
                                        </Button>
                                    </div>
                                    <div
                                        ref={refFormation}
                                        className="relative field w-[378px] h-[480px] scale-[0.9] -translate-x-[30px] sm:translate-x-0 sm:scale-100"
                                    >
                                        {positionPlayer?.map((item, i) => (
                                            <Draggable
                                                position={{
                                                    x: item.posx
                                                        ? parseFloat(item.posx)
                                                        : 50,
                                                    y: parseFloat(item.posy),
                                                }}
                                                defaultPosition={{
                                                    x: parseFloat(item.posx),
                                                    y: parseFloat(item.posy),
                                                }}
                                                bounds={"parent"}
                                                onStop={(e, data) =>
                                                    handlePlayerPosition(
                                                        item.id,
                                                        data.x,
                                                        data.y
                                                    )
                                                }
                                                key={i}
                                                disabled={i >= 5 ? true : false}
                                            >
                                                <div
                                                    className={`absolute ${
                                                        i >= 5
                                                            ? "cursor-default pointer-events-none"
                                                            : "cursor-move"
                                                    }`}
                                                >
                                                    <Player
                                                        color={
                                                            i + 1 === 1 &&
                                                            "#FFBF00"
                                                        }
                                                        bodyColor={bodyColor}
                                                        armColor={armColor}
                                                        iconType={item.name}
                                                        key={i}
                                                        className={`${
                                                            i >= 5 &&
                                                            "scale-[0.8]"
                                                        }`}
                                                        avatar={
                                                            item.avatar ||
                                                            undefined
                                                        }
                                                    />

                                                    {item.avatar ? (
                                                        <p
                                                            className={`absolute inset-0 flex justify-center items-center text-md font-bold`}
                                                            style={{
                                                                color: fontColor,
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
                                                                color: fontColor,
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
                                        ))}
                                    </div>
                                </div>

                                {/* Option */}
                                <div className="relative w-full md:w-96 py-2 flex flex-col overflow-y-scroll h-[540px]">
                                    <h1 className="flex text-2xl md:text-3xl font-extrabold">
                                        Opsi Tim
                                    </h1>
                                    <Tab.Group
                                        as="div"
                                        className="md:order-one order-last"
                                    >
                                        <Tab.List className="flex gap-[1.2rem]">
                                            <TabsButton>Tampilan</TabsButton>
                                            <TabsButton>Pemain</TabsButton>
                                        </Tab.List>
                                        {/* apperance */}
                                        <Tab.Panels className="mt-3">
                                            <Tab.Panel>
                                                <ColGroup>
                                                    <Label>Nama Tim</Label>
                                                    <Input
                                                        name="name"
                                                        placeholder="team name"
                                                        type="text"
                                                        padding="py-[4px] px-4"
                                                        defaultValue={
                                                            team.name || ""
                                                        }
                                                        onChange={(e) =>
                                                            setTeamName(
                                                                e.target.value
                                                            )
                                                        }
                                                        error={errors.name}
                                                    />
                                                    {errors.name && (
                                                        <InputError
                                                            message={
                                                                errors.name
                                                            }
                                                        />
                                                    )}
                                                </ColGroup>
                                                <ColGroup>
                                                    <Label>Formasi</Label>
                                                    <CreatableSelect
                                                        isClearable
                                                        options={
                                                            formationOption
                                                        }
                                                        defaultValue={{
                                                            label:
                                                                strBeforeNumber(
                                                                    "-",
                                                                    team.formation
                                                                ) || "2-2",
                                                            value:
                                                                team.formation ||
                                                                "2-2",
                                                        }}
                                                        onChange={(e) =>
                                                            handleFormation(e)
                                                        }
                                                    />
                                                    {errors.formation && (
                                                        <InputError
                                                            message={
                                                                errors.formation
                                                            }
                                                        />
                                                    )}
                                                </ColGroup>
                                                {/* flex justify-between items-center */}
                                                <div className="">
                                                    <Label>Warna</Label>

                                                    <ColGroup>
                                                        <div className="flex justify-start gap-x-8">
                                                            <Menu
                                                                as="div"
                                                                className="relative flex flex-col"
                                                            >
                                                                <Label className="text-sm">
                                                                    Primary
                                                                </Label>
                                                                <Menu.Button
                                                                    className={`w-[40px] h-6 border-2 border-black rounded-md`}
                                                                    style={{
                                                                        backgroundColor: `${bodyColor}`,
                                                                    }}
                                                                ></Menu.Button>
                                                                <Menu.Items className="absolute top-0 translate-y-[50%] z-[999]">
                                                                    <Menu.Item>
                                                                        <CompactPicker
                                                                            className="z-[99]"
                                                                            onChange={(
                                                                                color,
                                                                                e
                                                                            ) => {
                                                                                setBodyColor(
                                                                                    color.hex
                                                                                );
                                                                            }}
                                                                        />
                                                                    </Menu.Item>
                                                                </Menu.Items>
                                                            </Menu>
                                                            <Menu
                                                                as="div"
                                                                className="relative flex flex-col "
                                                            >
                                                                <Label className="text-sm">
                                                                    Secondary
                                                                </Label>
                                                                <Menu.Button
                                                                    className={`w-[40px] h-6 border-2 border-black rounded-md`}
                                                                    style={{
                                                                        backgroundColor: `${armColor}`,
                                                                    }}
                                                                ></Menu.Button>
                                                                <Menu.Items className="absolute top-0 translate-y-[50%] z-[999]">
                                                                    <Menu.Item>
                                                                        <CompactPicker
                                                                            onChange={(
                                                                                colors,
                                                                                e
                                                                            ) =>
                                                                                setArmColor(
                                                                                    colors.hex
                                                                                )
                                                                            }
                                                                        />
                                                                    </Menu.Item>
                                                                </Menu.Items>
                                                            </Menu>
                                                            <Menu
                                                                as="div"
                                                                className="relative flex flex-col "
                                                            >
                                                                <Label className="text-sm">
                                                                    Nomor
                                                                </Label>
                                                                <Menu.Button
                                                                    className={`w-[40px] h-6 border-2 border-black rounded-md`}
                                                                    style={{
                                                                        backgroundColor: `${fontColor}`,
                                                                    }}
                                                                ></Menu.Button>
                                                                <Menu.Items className="absolute top-0 -translate-x-1/2 translate-y-[50%] z-[999]">
                                                                    <Menu.Item>
                                                                        <CompactPicker
                                                                            onChange={(
                                                                                colors,
                                                                                e
                                                                            ) =>
                                                                                setFontColor(
                                                                                    colors.hex
                                                                                )
                                                                            }
                                                                        />
                                                                    </Menu.Item>
                                                                </Menu.Items>
                                                            </Menu>
                                                        </div>
                                                    </ColGroup>
                                                </div>
                                            </Tab.Panel>
                                        </Tab.Panels>

                                        {/* Player */}
                                        <Tab.Panels className="mt-3">
                                            <Tab.Panel>
                                                <RowGroup>
                                                    <Label className="w-3/12">
                                                        Nomor
                                                    </Label>
                                                    <Label className="w-9/12">
                                                        Player
                                                    </Label>
                                                    <Label className="w-6/12 text-center">
                                                        Avatar
                                                    </Label>
                                                </RowGroup>
                                                <div className="">
                                                    <p className="font-bold mt-2 capitalize">
                                                        # Pemain Utama
                                                    </p>
                                                    {positionPlayer?.map(
                                                        (item, i) => (
                                                            <React.Fragment
                                                                key={i}
                                                            >
                                                                {i < 5 && (
                                                                    <>
                                                                        <RowGroup className="mt-2 mb-4">
                                                                            <Input
                                                                                className="text-center w-2/12"
                                                                                defaultValue={
                                                                                    item.number
                                                                                }
                                                                                step={
                                                                                    "1"
                                                                                }
                                                                                min={
                                                                                    "0"
                                                                                }
                                                                                max={
                                                                                    "100"
                                                                                }
                                                                                padding={
                                                                                    "!py-[3px] !px-1"
                                                                                }
                                                                                name="nomor"
                                                                                type="number"
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    handleChangePlayer(
                                                                                        e,
                                                                                        item.id
                                                                                    );
                                                                                }}
                                                                            />
                                                                            <Input
                                                                                name="name"
                                                                                type="text"
                                                                                className="w-6/12"
                                                                                placeholder={`${
                                                                                    item.name &&
                                                                                    `${item.name}`
                                                                                }`}
                                                                                padding={
                                                                                    "py-1"
                                                                                }
                                                                                error={
                                                                                    !item.name
                                                                                }
                                                                                defaultValue={
                                                                                    item.name ||
                                                                                    `player#${item.id}`
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleChangePlayer(
                                                                                        e,
                                                                                        item.id
                                                                                    )
                                                                                }
                                                                            />
                                                                            <div className="flex w-3/12 items-center justify-center">
                                                                                <Label className="cursor-pointer">
                                                                                    <div className="flex items-center justify-center relative">
                                                                                        {imageProcessing[
                                                                                            i
                                                                                        ] ? (
                                                                                            <AiOutlineLoading3Quarters className="animate-spin w-[35px] h-[35px]" />
                                                                                        ) : (
                                                                                            <img
                                                                                                src={
                                                                                                    item.avatar ||
                                                                                                    "/assets/img/placeholders/placeholder-avatar.png"
                                                                                                }
                                                                                                alt=""
                                                                                                className="w-[35px] h-[35px] rounded-full"
                                                                                            />
                                                                                        )}
                                                                                        <div
                                                                                            className="absolute hover:bg-black/50 inset-0 rounded-full opacity-0 hover:opacity-100"
                                                                                            onClick={() =>
                                                                                                handleClickFile(
                                                                                                    i
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <AiFillCamera className="m-auto h-full text-white opacity-100" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <input
                                                                                        type="file"
                                                                                        ref={(
                                                                                            ref
                                                                                        ) =>
                                                                                            !uploadRef.current.includes(
                                                                                                ref
                                                                                            ) &&
                                                                                            uploadRef.current.push(
                                                                                                ref
                                                                                            )
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleUploadAvatar(
                                                                                                e,
                                                                                                i
                                                                                            )
                                                                                        }
                                                                                        className="hidden"
                                                                                    />
                                                                                </Label>
                                                                            </div>
                                                                        </RowGroup>
                                                                    </>
                                                                )}
                                                            </React.Fragment>
                                                        )
                                                    )}
                                                </div>
                                                {/* pemain cadangan */}
                                                <div className="">
                                                    <p className="font-bold mt-2 capitalize">
                                                        # Pemain cadangan
                                                    </p>
                                                    {positionPlayer?.map(
                                                        (item, i) => (
                                                            <React.Fragment
                                                                key={i}
                                                            >
                                                                {i >= 5 && (
                                                                    <>
                                                                        <RowGroup className="mt-2 mb-4">
                                                                            <Input
                                                                                className="text-center w-2/12"
                                                                                defaultValue={
                                                                                    item.number
                                                                                }
                                                                                step={
                                                                                    "1"
                                                                                }
                                                                                min={
                                                                                    "0"
                                                                                }
                                                                                max={
                                                                                    "100"
                                                                                }
                                                                                padding={
                                                                                    "!py-[3px] !px-1"
                                                                                }
                                                                                name="nomor"
                                                                                type="number"
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    handleChangePlayer(
                                                                                        e,
                                                                                        item.id
                                                                                    );
                                                                                }}
                                                                            />
                                                                            <Input
                                                                                name="name"
                                                                                type="text"
                                                                                className="w-6/12"
                                                                                placeholder={`${
                                                                                    item.name &&
                                                                                    `${item.name}`
                                                                                }`}
                                                                                padding={
                                                                                    "py-1"
                                                                                }
                                                                                error={
                                                                                    !item.name
                                                                                }
                                                                                defaultValue={
                                                                                    item.name ||
                                                                                    `player#${item.id}`
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleChangePlayer(
                                                                                        e,
                                                                                        item.id
                                                                                    )
                                                                                }
                                                                            />
                                                                            <div className="flex w-3/12 items-center justify-center">
                                                                                <Label className="cursor-pointer">
                                                                                    <div className="flex items-center justify-center relative">
                                                                                        {imageProcessing[
                                                                                            i
                                                                                        ] ? (
                                                                                            <AiOutlineLoading3Quarters className="animate-spin w-[35px] h-[35px]" />
                                                                                        ) : (
                                                                                            <img
                                                                                                src={
                                                                                                    item.avatar ||
                                                                                                    "/assets/img/placeholders/placeholder-avatar.png"
                                                                                                }
                                                                                                alt=""
                                                                                                className="w-[35px] h-[35px] rounded-full"
                                                                                            />
                                                                                        )}
                                                                                        <div
                                                                                            className="absolute hover:bg-black/50 inset-0 rounded-full opacity-0 hover:opacity-100"
                                                                                            onClick={() =>
                                                                                                handleClickFile(
                                                                                                    i
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <AiFillCamera className="m-auto h-full text-white opacity-100" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <input
                                                                                        type="file"
                                                                                        ref={(
                                                                                            ref
                                                                                        ) =>
                                                                                            !uploadRef.current.includes(
                                                                                                ref
                                                                                            ) &&
                                                                                            uploadRef.current.push(
                                                                                                ref
                                                                                            )
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleUploadAvatar(
                                                                                                e,
                                                                                                i
                                                                                            )
                                                                                        }
                                                                                        className="hidden"
                                                                                    />
                                                                                </Label>
                                                                            </div>
                                                                        </RowGroup>
                                                                    </>
                                                                )}
                                                            </React.Fragment>
                                                        )
                                                    )}
                                                </div>
                                            </Tab.Panel>
                                        </Tab.Panels>
                                    </Tab.Group>
                                </div>
                            </div>
                            <hr className="bg-black mt-5" />
                            <div className="w-full p-2 bg-white">
                                <h1 className="font-bold text-2xl md:text-3xl">
                                    Cara Membuat Formasi Pemain
                                </h1>
                                <p className="font-semibold leading-7 md:leading-8 capitalize">
                                    1. Masukkan nama tim Anda <br />
                                    2. Pilih formasi Anda dari formasi yang
                                    telah ditentukan sebelumnya, termasuk 2-2,
                                    1-1-2, 1-0-3, dll atau anda dapat
                                    mengubahnya sendiri. <br /> 3. Upload Avatar
                                    dan ubah nama pemain di menu Pemain.
                                </p>
                            </div>
                        </div>
                    </Container>
                    <Footer />
                </section>
            </Layouts>
        </>
    );
}
