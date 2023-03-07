import { convertToBase64, resizeImage } from "@/utils/Base64Compressed";
import { useState } from "react";

export default function useUploadAvatar(positionPlayer, setPositionPlayer) {
    const [imageProcessing, setImageProcessing] = useState({});

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
                findPlayer.avatar = result;
                setTimeout(() => {
                    setPositionPlayer(player);
                    setImageProcessing({ ...imageProcessing, [index]: false });
                }, 1000);
            });
        });
    };
    return { handleUploadAvatar, imageProcessing, setImageProcessing };
}
