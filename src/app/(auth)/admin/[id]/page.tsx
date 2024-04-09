import { redirect } from "next/navigation";

type Props = {
    params: { id: string };
};

export default function AdminPage({ params }: Props) {
    

    if (params.id !== process.env.ADMIN_PASS!) {
        return redirect("/");
    } else {
        return <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-white font-semibold text-3xl">Welcome, Admin</h1>
        </div>;
    }
}