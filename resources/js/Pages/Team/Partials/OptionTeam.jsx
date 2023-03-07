import React from "react";
import OptionApperance from "./OptionTeam/OptionApperance";
import OptionPlayer from "./OptionTeam/OptionPlayer";
import { Tab } from "@headlessui/react";
import TabsButton from "@/Components/Tabs/TabsButton";

function OptionTeam(props) {
    const { dataProps } = props;
    return (
        <div className="relative w-full md:w-96 py-2 flex flex-col overflow-y-scroll h-[540px]">
            <h1 className="flex text-2xl md:text-3xl font-extrabold">
                Opsi Tim
            </h1>
            <Tab.Group as="div" className="md:order-one order-last">
                <Tab.List className="flex gap-[1.2rem]">
                    <TabsButton>Tampilan</TabsButton>
                    <TabsButton>Pemain</TabsButton>
                    <TabsButton>Pelatih</TabsButton>
                </Tab.List>
                <OptionApperance dataProps={dataProps} />
                <OptionPlayer dataProps={dataProps} />
            </Tab.Group>
        </div>
    );
}

export default OptionTeam;
