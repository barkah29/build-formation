import { positionDefault } from "@/utils/Position";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function useBindPlayer(players, setPositionPlayer) {
    useEffect(() => {
        const dataDefault = positionDefault.map((item) => {
            return {
                ...item,
                id: uuidv4(),
            };
        });
        setPositionPlayer(players.length > 0 ? players : dataDefault);
    }, [players]);
    return;
}
