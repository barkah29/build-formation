import {
    formation211,
    formation22,
    formation301,
    positionDefault,
} from "@/utils/Position";

export default function useChangeFormation(
    positionPlayer,
    setPositionPlayer,
    setFormationName
) {
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
        setPositionPlayer(dataPlayer);
    };
    return { handleFormation, positionDefault };
}
