import ColGroup from "@/Components/Form/ColGroup";
import Input from "@/Components/Form/Input";
import Label from "@/Components/Form/Label";
import InputError from "@/Components/InputError";
import { strBeforeNumber } from "@/utils";
import { formationOption } from "@/utils/Options";
import { Menu, Tab } from "@headlessui/react";
import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { CompactPicker } from "react-color";
import CreatableSelect from "react-select/creatable";

const ApperanceContext = createContext();
function OptionApperance(props) {
    const ApperanceProvider = ApperanceContext.Provider;
    const {
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
    } = props.dataProps;
    return (
        <>
            <ApperanceProvider
                value={{
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
                }}
            >
                <Tab.Panels className="mt-3">
                    <Tab.Panel>
                        <OptionSetTeam />
                        <OptionSetFormation />
                        <OptionSetColor />
                    </Tab.Panel>
                </Tab.Panels>
            </ApperanceProvider>
        </>
    );
}

function OptionSetTeam() {
    const { setTeamName, errors, team } = useContext(ApperanceContext);
    return (
        <>
            <ColGroup>
                <Label>Nama Tim</Label>
                <Input
                    name="name"
                    placeholder="team name"
                    type="text"
                    padding="py-[4px] px-4"
                    defaultValue={team.name || ""}
                    onChange={(e) => setTeamName(e.target.value)}
                    error={errors.name}
                />
                {errors.name && <InputError message={errors.name} />}
            </ColGroup>
        </>
    );
}

function OptionSetFormation() {
    const { team, errors, handleFormation } = useContext(ApperanceContext);
    return (
        <ColGroup>
            <Label>Formasi</Label>
            <CreatableSelect
                isClearable
                options={formationOption}
                defaultValue={{
                    label: strBeforeNumber("-", team.formation) || "2-2",
                    value: team.formation || "2-2",
                }}
                onChange={(e) => handleFormation(e)}
            />
            {errors.formation && <InputError message={errors.formation} />}
        </ColGroup>
    );
}

function OptionSetColor() {
    const {
        bodyColor,
        setBodyColor,
        armColor,
        setArmColor,
        fontColor,
        setFontColor,
    } = useContext(ApperanceContext);
    return (
        <>
            <div className="">
                <Label>Warna</Label>
                <ColGroup>
                    <div className="flex justify-start gap-x-8">
                        <Menu as="div" className="relative flex flex-col">
                            <Label className="text-sm">Primary</Label>
                            <Menu.Button
                                className={`w-[40px] h-6 border-2 border-black rounded-md`}
                                style={{
                                    backgroundColor: `${bodyColor}`,
                                }}
                            ></Menu.Button>
                            <Menu.Items className="absolute top-0 translate-y-[50%] z-[999]">
                                <Menu.Item>
                                    <CompactPicker
                                        className="z-[99]"
                                        onChange={(color, e) => {
                                            setBodyColor(color.hex);
                                        }}
                                    />
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                        <Menu as="div" className="relative flex flex-col ">
                            <Label className="text-sm">Secondary</Label>
                            <Menu.Button
                                className={`w-[40px] h-6 border-2 border-black rounded-md`}
                                style={{
                                    backgroundColor: `${armColor}`,
                                }}
                            ></Menu.Button>
                            <Menu.Items className="absolute top-0 translate-y-[50%] z-[999]">
                                <Menu.Item>
                                    <CompactPicker
                                        onChange={(colors, e) =>
                                            setArmColor(colors.hex)
                                        }
                                    />
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                        <Menu as="div" className="relative flex flex-col ">
                            <Label className="text-sm">Nomor</Label>
                            <Menu.Button
                                className={`w-[40px] h-6 border-2 border-black rounded-md`}
                                style={{
                                    backgroundColor: `${fontColor}`,
                                }}
                            ></Menu.Button>
                            <Menu.Items className="absolute top-0 -translate-x-1/2 translate-y-[50%] z-[999]">
                                <Menu.Item>
                                    <CompactPicker
                                        onChange={(colors, e) =>
                                            setFontColor(colors.hex)
                                        }
                                    />
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </ColGroup>
            </div>
        </>
    );
}

export default OptionApperance;
