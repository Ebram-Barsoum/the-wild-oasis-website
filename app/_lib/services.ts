import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";

export interface Cabin {
    id: number;
    name: string;
    description: string;
    image: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
}

export interface Settings {
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
}

export interface Country {
    name: string;
    flag: string;
}

export interface User {
    id: number;
    created_at: Date;
    fullName: string;
    email: string;
    nationality: string | null;
    nationalID: string | null;
    countryFlag: string | null;
}

export interface Booking {
    id: number;
    created_at: Date;
    startDate: Date;
    endDate: Date;
    numNights: number;
    numGuests: number;
    hasBreakfast: boolean;
    isPaid: boolean;
    cabinPrice: number;
    extraBedPrice: number;
    totalPrice: number;
    status: string;
    observations: string | null;
    guestId: number;
    cabinId: number;
}

let cachedCountries: Country[] | null = null;

export async function getCabins(): Promise<Cabin[] | null> {
    const {
        data,
        error,
    }: {
        data: Cabin[] | null;
        error: unknown | null;
    } = await supabase.from("cabins").select("*").order("name");

    if (error) {
        throw Error("Failed to fetch cabins");
    }

    return data;
}

export async function getCabin(cabinId: number): Promise<Cabin | null> {
    const { data, error }: { data: Cabin | null; error: any | null } =
        await supabase.from("cabins").select("*").eq("id", cabinId).single();

    if (error) {
        console.log(error.message);
        notFound();
    }

    return data;
}

export async function getCountries(): Promise<Country[]> {
    if (cachedCountries) return cachedCountries;

    const response = await fetch(
        "https://restcountries.com/v2/all?fields=name,flag"
    );

    if (response.status !== 200) {
        throw Error("failed to fetch countries");
    }

    const countries: Country[] = await response.json();
    cachedCountries = countries;

    return countries;
}

export async function getSettings(): Promise<Settings> {
    // await new Promise((res) => {
    //     setTimeout(res, 2000);
    // });

    const { data: settings, error } = await supabase
        .from("settings")
        .select(
            "minBookingLength,maxBookingLength,maxGuestsPerBooking,breakfastPrice"
        )
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return settings;
}

export async function getBookedDatesByCabin(cabinId: number): Promise<Date[]> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const strToday = today.toISOString();

    const { data: bookings, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("cabinId", cabinId)
        .neq("status", 'checked-out')
        .gte("startDate", strToday)

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    const bookedDates = bookings
        .map((booking) => {
            return eachDayOfInterval({
                start: new Date(booking.startDate),
                end: new Date(booking.endDate),
            });
        })
        .flat();

    return bookedDates;
}

export async function getGuest(
    email: string | null | undefined
): Promise<User | null> {
    const { data: user, error } = await supabase
        .from("guests")
        .select("*")
        .eq("email", email)
        .single();

    // we will handle the error in middleware

    // if (error) {
    //     throw new Error(error.message);
    // }

    return user;
}

export async function createGuest(
    newGuest: Partial<User>
): Promise<User | null> {
    const { data, error } = await supabase.from("guests").insert([newGuest]);

    if (error) {
        console.log(error);
        throw new Error("Failed to create new guest!");
    }

    return data;
}

export async function updateGuest(
    updatedGuest: Partial<User>,
    id: number
): Promise<User | null> {
    const { data, error } = await supabase
        .from("guests")
        .update(updatedGuest)
        .eq("id", id)
        .select("*")
        .single();

    if (error) {
        console.log(error);
        throw new Error("Failed to update guest data");
    }

    return data;
}

export async function getBookings(userId: number): Promise<Partial<Booking>[]> {
    const { data, error } = await supabase
        .from("bookings")
        .select(
            "id, created_at, startDate, endDate, numNights, observations, numGuests, totalPrice, status, guestId, cabinId"
        )
        .eq("guestId", userId);

    if (error) {
        console.log(error.message);
        throw new Error("Bookings couldn't be loaded");
    }

    return data;
}

export async function deleteBooking(bookingId: number) {
    const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

    if (error) {
        console.log(error.message);
        throw new Error("Failed to delete booking");
    }
}

export async function getBooking(bookingId: number): Promise<Booking> {
    const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .single();

    if (error) {
        console.log(error.message);
        throw new Error(`booking ${bookingId} could not be loaded`);
    }

    return data;
}

export async function updateBooking(
    bookingId: number,
    updatedBooking: Partial<Booking>
): Promise<Booking> {
    const { data, error } = await supabase
        .from("bookings")
        .update(updatedBooking)
        .eq("id", bookingId)
        .select("*")
        .single();

    if (error) {
        console.log(error.message);
        throw new Error(`booking ${bookingId} could not be updated`);
    }

    return data;
}

export async function createBooking(booking: Partial<Booking>): Promise<Booking> {
    const { data, error } = await supabase.from("bookings").insert([booking]).select().single();

    if (error) {
        console.log(error.message);
        throw new Error("Failed to create new booking");
    }

    return data;
}
