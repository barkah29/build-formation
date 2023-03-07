import Container from "@/Components/Container";
import Layouts from "@/Layouts/Layouts";
import { Head } from "@inertiajs/inertia-react";
import { useState } from "react";
import Footer from "@/Components/Footer";
import FlashMessage from "@/Components/Flash/FlashMessage";
import FieldEditor from "./Partials/FieldEditor";
import OptionTeam from "./Partials/OptionTeam";
import Guide from "./Partials/Guide";
import useSaveFormation from "@/Hooks/useSaveFormation";
import useUploadAvatar from "@/Hooks/useUploadAvatar";
import useChangeFormation from "@/Hooks/useChangeFormation";
import useChangePlayerPosition from "@/Hooks/useChangePlayerPosition";
import useChangePlayer from "@/Hooks/useChangePlayer";
import useBindPlayer from "@/Hooks/useBindPlayer";

export default function Editor(props) {
    const { team, players, flash, errors } = props;
    const [positionPlayer, setPositionPlayer] = useState([]);
    const [teamName, setTeamName] = useState(team.name || "");
    const [formationName, setFormationName] = useState(team.formation || 22);
    const [bodyColor, setBodyColor] = useState(team.primary || "#D33115");
    const [armColor, setArmColor] = useState(team.secondary || `#FCDC00`);
    const [fontColor, setFontColor] = useState("#FFFFFF");

    // save formation
    const { handleFormationSave } = useSaveFormation({
        name: teamName,
        formation: formationName,
        primary: bodyColor,
        secondary: armColor,
        players: positionPlayer,
    });

    // uploadAvatar
    const { handleUploadAvatar, imageProcessing } = useUploadAvatar(
        positionPlayer,
        setPositionPlayer
    );

    // handle Change Formation
    const { handleFormation, positionDefault } = useChangeFormation(
        positionPlayer,
        setPositionPlayer,
        setFormationName
    );

    // handleChangePositonPlayer
    const { handlePlayerPosition } = useChangePlayerPosition(
        positionPlayer,
        setPositionPlayer
    );

    // Edit player
    const { handleChangePlayer } = useChangePlayer(
        positionPlayer,
        setPositionPlayer
    );

    // re-renderer players
    useBindPlayer(players, setPositionPlayer);

    return (
        <Layouts>
            <Head title="Formation" />
            <FlashMessage dataProps={{ flash, errors }} />
            <section className="w-full my-[2rem]">
                <Container>
                    <div className="flex flex-col p-4 w-full md:w-[51rem] h-full bg-white rounded-lg">
                        <div className="flex flex-col md:flex-row md:gap-[1.2rem]">
                            {/* editor */}
                            <FieldEditor
                                dataProps={{
                                    positionPlayer,
                                    bodyColor,
                                    fontColor,
                                    armColor,
                                }}
                                handlePlayerPosition={handlePlayerPosition}
                                handleFormationSave={handleFormationSave}
                            />
                            {/* Option */}
                            <OptionTeam
                                dataProps={{
                                    team,
                                    errors,
                                    bodyColor,
                                    fontColor,
                                    armColor,
                                    setTeamName,
                                    handleFormation,
                                    setFontColor,
                                    setBodyColor,
                                    setArmColor,
                                    positionPlayer,
                                    imageProcessing,
                                    handleUploadAvatar,
                                    handleChangePlayer,
                                }}
                            />
                        </div>
                        <hr className="bg-black mt-5" />
                        <Guide />
                    </div>
                </Container>
                <Footer />
            </section>
        </Layouts>
    );
}
