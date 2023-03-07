import React from "react";
import Label from "../Form/Label";
import { AiFillCamera, AiOutlineLoading3Quarters } from "react-icons/ai";
import RowGroup from "../Form/RowGroup";
import Input from "../Form/Input";

function PlayerForm(props) {
    const {
        item,
        idx,
        uploadRef,
        handleClickFile,
        imageProcessing,
        handleChangePlayer,
        handleUploadAvatar,
    } = props.dataProps;

    return (
        <>
            <>
                <RowGroup className="mt-2 mb-4">
                    <Input
                        className="text-center w-2/12"
                        defaultValue={item?.number}
                        step={"1"}
                        min={"0"}
                        max={"100"}
                        padding={"!py-[3px] !px-1"}
                        name="nomor"
                        type="number"
                        onChange={(e) => {
                            handleChangePlayer(e, item?.id);
                        }}
                    />
                    <Input
                        name="name"
                        type="text"
                        className="w-6/12"
                        placeholder={`${item?.name && `${item?.name}`}`}
                        padding={"py-1"}
                        error={!item?.name}
                        defaultValue={item?.name || `player#${item?.id}`}
                        onChange={(e) => handleChangePlayer(e, item?.id)}
                    />
                    <div className="flex w-3/12 item?s-center justify-center">
                        <Label className="cursor-pointer">
                            <div className="flex item?s-center justify-center relative">
                                {imageProcessing[idx] ? (
                                    <AiOutlineLoading3Quarters className="animate-spin w-[35px] h-[35px]" />
                                ) : (
                                    <img
                                        src={
                                            item?.avatar ||
                                            "/assets/img/placeholders/placeholder-avatar.png"
                                        }
                                        alt=""
                                        className="w-[35px] h-[35px] rounded-full"
                                    />
                                )}
                                <div
                                    className="absolute hover:bg-black/50 inset-0 rounded-full opacity-0 hover:opacity-100"
                                    onClick={() => handleClickFile(idx)}
                                >
                                    <AiFillCamera className="m-auto h-full text-white opacity-100" />
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={(ref) =>
                                    !uploadRef.current.includes(ref) &&
                                    uploadRef.current.push(ref)
                                }
                                onChange={(e) => handleUploadAvatar(e, idx)}
                                className="hidden"
                            />
                        </Label>
                    </div>
                </RowGroup>
            </>
        </>
    );
}

export default PlayerForm;
