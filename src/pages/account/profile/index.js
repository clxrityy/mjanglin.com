import React from "react";
import { useSession } from "@supabase/auth-helpers-react";
import Login from "../login";
import UserProfile from "./components/UserProfile";

export default function Profile() {

    const session = useSession();

    if (!session) {
        return <Login />
    }

    return (
        <div className="p-10">
            <UserProfile />
        </div>
    );
};
