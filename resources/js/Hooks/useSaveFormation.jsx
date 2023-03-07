import { Inertia } from "@inertiajs/inertia";

export default function useSaveFormation(props) {
    const data = props;
    const handleFormationSave = () => {
        Inertia.post(route("team.save"), data);
    };

    return { handleFormationSave };
}
