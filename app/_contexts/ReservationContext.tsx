"use client";
import { useContext, createContext, useState, Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";

interface ReservationProviderProps {
    children: React.ReactNode
}

interface ReservationContextType {
    range: DateRange | undefined,
    setRange: Dispatch<SetStateAction<DateRange | undefined>>,
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({ children }: ReservationProviderProps): JSX.Element {
    const [range, setRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });

    return <ReservationContext.Provider value={{ range, setRange }}> {children}</ReservationContext.Provider >
}

export function useReservation(): ReservationContextType {
    const context = useContext(ReservationContext);
    if (!context) throw new Error('Reservation used outside context scope');

    return context;
}