"use client";
import { ReactNode, useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";

import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "./Logo";

interface HeaderProps {
    children: ReactNode;
}

export default function Header({ children }: HeaderProps): JSX.Element {
    const [showMenu, setShowMenu] = useState(false);
    const route = usePathname();
    useEffect(() => {
        AOS.init();
    }, []);


    useEffect(() => {
        setShowMenu(false);
    }, [route]);

    return (
        <header className="z-10">
            <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                <Logo />
                <ul className="hidden sm:flex sm:flex-row sm:gap-10 sm:items-center">
                    {children}
                </ul>

                <ul className={`flex flex-col gap-4 px-2 w-[16rem] transition-transform duration-300 fixed right-0 top-0 ${showMenu ? "translate-x-0" : "translate-x-full"
                    } bg-primary-900 text-center h-full sm:hidden`}>
                    <div className="flex justify-end p-4 ">
                        <XMarkIcon
                            onClick={() => setShowMenu(false)}
                            className="h-7 w-7 cursor-pointer text-primary-300 hover:text-primary-100 transition"
                        />
                    </div>
                    {children}
                </ul>

                <Bars3Icon className="h-7 w-7 block sm:hidden cursor-pointer"
                    onClick={() => {
                        setShowMenu(true);
                    }}
                />
            </div>
        </header>
    );
}
