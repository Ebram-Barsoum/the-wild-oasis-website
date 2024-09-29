"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { Booking, createBooking, deleteBooking, getBookings, getSettings, updateBooking, updateGuest } from "./services";
import { redirect } from "next/navigation";

export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in to update profile");

    const ID_REGEX = /^[a-zA-Z0-9]{6,12}$/;

    const nationalID = String(formData.get("nationalID"));

    const nationalityData = formData.get('nationality');
    const [nationality, countryFlag] = typeof nationalityData === 'string' ? nationalityData?.split("%") : [null, null];

    if (!ID_REGEX.test(nationalID as string)) throw new Error('Provided national Id is not valid');

    const updatedData = { nationalID, nationality, countryFlag };

    console.log(updatedData);

    await updateGuest(updatedData, Number(session?.user?.id));

    revalidatePath('/account/profile');
}

export async function deleteReservationAction(bookingId: number) {
    // 1) Authentication
    const session = await auth();
    if (!session) throw new Error("You must be logged in to delete a reservation");

    // 2) Authorization
    const userBookings = await getBookings(Number(session?.user?.id));

    let isFound: boolean = false;
    userBookings.forEach((booking) => {
        if (booking.id === bookingId) {
            isFound = true;
            return;
        }
    });

    if (!isFound) throw new Error("You are not allowed to delete this reservation");

    // 3) Mutation
    await deleteBooking(bookingId);

    // 4) Revalidation
    revalidatePath('/account/reservatinos');
}

export async function updateReservationAction(bookingId: number, newData: Partial<Booking>) {
    // 1) Authentication
    const session = await auth();
    if (!session) throw new Error("You must be logged in to update a reservation");

    // 2) Authorization
    const userBookings = await getBookings(Number(session?.user?.id));

    let isFound: boolean = false;
    userBookings.forEach((booking) => {
        if (booking.id === bookingId) {
            isFound = true;
            return;
        }
    });

    if (!isFound) throw new Error("You are not allowed to update this reservation");

    // 3) Mutation
    await updateBooking(bookingId, newData);

    // 4) Revalidation
    revalidatePath('/account/reservations');
    revalidatePath(`/account/reservations/edit/${bookingId}`);

    // 5) Redirection
    redirect('/account/reservations');
}

export async function createReservationAction(booking: Partial<Booking>): Promise<void> {
    // 1) Authentication
    const session = await auth();
    if (!session) throw new Error("You must be logged in to create a reservation");

    // 2) Adding the guestId and extraPrice
    const guestId = Number(session?.user?.id);
    booking.guestId = guestId;

    const { breakfastPrice } = await getSettings();

    if (booking.hasBreakfast) {
        booking.totalPrice = Number(booking.totalPrice) + (breakfastPrice * (booking.numNights || 0));
    }

    // 3) Mutation
    await createBooking(booking);

    // 4) Revalidation
    revalidatePath('/account/reservations');

    // 5) Redirection
    redirect('/account/reservations');
}