import React from "react";
import Label from "@/Components/Form/Label";
import RowGroup from "@/Components/Form/RowGroup";
import { Tab } from "@headlessui/react";
import { useRef } from "react";
import { createContext } from "react";
import { useContext } from "react";
import PlayerForm from "@/Components/Player/PlayerForm";
const PlayerContext = createContext();

function OptionPlayer(props) {
    const PlayerProvider = PlayerContext.Provider;
    const {
        positionPlayer,
        imageProcessing,
        handleUploadAvatar,
        handleChangePlayer,
    } = props.dataProps;
    const uploadRef = useRef([]);
    const handleClickFile = (index) => {
        uploadRef.current[index].click();
    };
    return (
        <>
            <PlayerProvider
                value={{
                    positionPlayer,
                    imageProcessing,
                    handleUploadAvatar,
                    handleClickFile,
                    uploadRef,
                    handleChangePlayer,
                }}
            >
                <Tab.Panels className="mt-3">
                    <Tab.Panel>
                        <RowGroup>
                            <Label className="w-3/12">Nomor</Label>
                            <Label className="w-9/12">Player</Label>
                            <Label className="w-6/12 text-center">Avatar</Label>
                        </RowGroup>
                        <PlayPlayers />
                        <BackupPlayers />
                    </Tab.Panel>
                </Tab.Panels>
            </PlayerProvider>
        </>
    );
}

function PlayPlayers() {
    const {
        positionPlayer,
        handleClickFile,
        imageProcessing,
        uploadRef,
        handleChangePlayer,
        handleUploadAvatar,
    } = useContext(PlayerContext);
    return (
        <div className="">
            <p className="font-bold mt-2 capitalize"># Pemain Utama</p>
            {positionPlayer?.map((item, idx) => (
                <React.Fragment key={idx}>
                    {idx < 5 && (
                        <PlayerForm
                            dataProps={{
                                item,
                                idx,
                                handleClickFile,
                                imageProcessing,
                                uploadRef,
                                handleChangePlayer,
                                handleUploadAvatar,
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

function BackupPlayers() {
    const {
        positionPlayer,
        handleClickFile,
        imageProcessing,
        uploadRef,
        handleChangePlayer,
        handleUploadAvatar,
    } = useContext(PlayerContext);

    return (
        <>
            {/* pemain cadangan */}
            <div className="">
                <p className="font-bold mt-2 capitalize"># Pemain cadangan</p>
                {positionPlayer?.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {idx >= 5 && (
                            <PlayerForm
                                dataProps={{
                                    item,
                                    idx,
                                    handleClickFile,
                                    imageProcessing,
                                    uploadRef,
                                    handleChangePlayer,
                                    handleUploadAvatar,
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}

export default OptionPlayer;
