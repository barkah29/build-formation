import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import Dropdown from "@/Components/Dropdown";

const NavLink = (props) => {
    const { href, name, className, active } = props;
    return (
        <Link
            href={href}
            className={`capitalize font-semibold hover:bg-white/10 active:bg-white/20 p-2 rounded-md ${
                className || ""
            }`}
        >
            <span className={`${active ? "text-white" : " text-white/50"}`}>
                {name}
            </span>
        </Link>
    );
};

const Navbar = () => {
    const { auth } = usePage().props;
    return (
        <header className="sticky top-0 w-full bg-gray-900 z-[9999]">
            <nav className="flex px-4 md:px-8 gap-1 md:gap-[1.25rem] h-[70px] items-center md:container-md justify-between">
                <div className="flex">
                    {auth.user ? (
                        <NavLink
                            name="dashboard"
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        />
                    ) : (
                        <NavLink
                            name="home"
                            href={route("home")}
                            active={route().current("home")}
                        />
                    )}
                    {auth.user ? (
                        <NavLink
                        name="Team"
                        href={route("team")}
                        active={route().current("team")}
                    />
                    ) : null}
                </div>
                {auth.user ? (
                    <>
                        <div className="flex">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md  bg-white/10 text-white focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {auth.user.name}

                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex gap-2">
                            <NavLink
                                name="Login"
                                href={route("login")}
                                active={route().current("login")}
                            />
                            <NavLink
                                name="Register"
                                href={route("register")}
                                active={route().current("register")}
                            />
                        </div>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
