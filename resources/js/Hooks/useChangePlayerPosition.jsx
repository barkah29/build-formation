function useChangePlayerPosition(positionPlayer, setPositionPlayer) {
    const handlePlayerPosition = (id, x, y) => {
        const player = [...positionPlayer];
        const findPlayer = player.find((item) => item.id === id);
        findPlayer.posx = x;
        findPlayer.posy = y;
        setPositionPlayer(player);
    };
    return { handlePlayerPosition };
}

export default useChangePlayerPosition;
