"use client";
import { ArrowRightStartOnRectangleIcon, CalendarIcon, HomeIcon, UserIcon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";


interface NavLink {
    text: string,
    icon: ReactNode,
    path: (String | any),
}

const navLinks: NavLink[] = [
    {
        text: 'Home',
        icon: <HomeIcon className="h-5 w-5 text-primary-500" />,
        path: '/account',
    },
    {
        text: 'Reservations',
        icon: <CalendarIcon className="h-5 w-5 text-primary-500" />,
        path: '/account/reservations',
    },
    {
        text: 'Profile',
        icon: <UserIcon className="h-5 w-5 text-primary-500" />,
        path: '/account/profile',
    }
];

export default function SideNavigations(): JSX.Element {
    const route = usePathname();
    return (
        <aside className="border-r-[1px] border-r-primary-900 flex flex-col py-4">
            <ul className="flex flex-col gap-2">
                {navLinks.map((link) =>
                    <Link key={link.path} prefetch={true} href={link.path} className={`${link.path === route && 'bg-primary-900'} flex gap-3 text-lg font-bold text-primary-300 w-full py-3 px-4 hover:bg-primary-900`}>
                        {link.icon}
                        <span className="hidden md:block">{link.text}</span>
                    </Link>)}
            </ul>

            <SignOutButton />

        </aside>
    );
}
