export default function useChangePlayer(positionPlayer, setPositionPlayer) {
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
        setPositionPlayer(player);
    };
    return { handleChangePlayer };
}
