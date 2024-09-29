import { ReactNode } from "react";
import SideNavigations from "@/app/_components/SideNavigations";

interface LayoutProps {
    children: ReactNode
}

export default function layout({ children }: LayoutProps): JSX.Element {
    return (
        <main className="h-[86dvh] grid grid-cols-[auto_1fr] gap-2 md:grid-cols-[16rem_1fr]  sm:gap-4">
            <SideNavigations />
            <section className="px-2 md:px-4 py-6 overflow-y-auto scrollbar-hidden">
                {children}
            </section>
        </main>
    )
}
