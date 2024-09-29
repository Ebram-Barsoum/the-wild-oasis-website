"use client";
import { ReactNode, useState } from "react";
import { updateProfileAction } from "../_lib/actions";
import { User } from "../_lib/services";
import SubmitButton from "./SubmitButton";

interface UpdateProfileFormProps {
    children: ReactNode;
    guest: User | null;
}

export default function UpdateProfileForm({
    children,
    guest,
}: UpdateProfileFormProps) {
    const [id, setId] = useState<string>(guest?.nationalID || "");

    return (
        <form
            action={updateProfileAction}
            className="py-4 px-4 sm:px-8 flex flex-col gap-6 bg-primary-900 my-8"
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Full name</label>
                <input
                    type="text"
                    id="name"
                    name="fullName"
                    defaultValue={guest?.fullName}
                    disabled
                    className="p-2 sm:p-4"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={guest?.email}
                    disabled
                    className="p-2 sm:p-4"
                />
            </div>

            {children}

            <div className="flex flex-col gap-2">
                <label htmlFor="ID">National ID number</label>
                <input
                    type="text"
                    id="ID"
                    name="nationalID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter your national ID number"
                    className="p-2 sm:p-4 bg-primary-100 text-primary-800 placeholder:text-primary-500"
                />
            </div>

            <SubmitButton pendingLabel="loading..." className="bg-accent-400 ml-auto text-primary-800 transition-colors hover:bg-accent-500 disabled:bg-gray-300  p-2 sm:p-4">
                Update Profile
            </SubmitButton>
        </form>
    );
}
