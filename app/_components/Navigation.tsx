/* eslint-disable @next/next/no-img-element */
import { auth } from "@/app/_lib/auth";
import Link from "next/link";
import { ReactNode } from "react";

interface NavigationProps {
  style?: string;
  icon?: ReactNode;
}

interface Link {
  text: string;
  path: string;
  image?: string | null;
}

const links: Link[] = [
  {
    text: "Cabins",
    path: "/cabins",
  },
  {
    text: "About",
    path: "/about",
  },
  {
    text: "Your Account",
    path: "/account",
    image: "",
  },
];

export default async function Navigation({
  icon,
}: NavigationProps): Promise<JSX.Element> {
  const session = await auth();

  if (session) links[2].image = session.user?.image;

  return (
    <>
      {links.map((link, index) => (
        <li key={link.path}>
          <Link
            href={link.path}
            className=" text-xl hover:text-accent-400 transition-colors flex items-center"
            prefetch={true}
          >
            {session && index === 2 && (
              <img
                src={session.user?.image || ''}
                alt={session.user?.name || ''}
                width={100}
                height={100}
                className="h-7 w-7 rounded-full mr-2"
              />
            )}
            <span>{link.text}</span>
          </Link>
        </li>
      ))}
    </>
  );
}
