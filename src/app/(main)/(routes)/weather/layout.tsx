import { fetchIp, getLocationByIp } from "@/utils/ip";
import "@/styles/css/weather.css";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { connection } from "next/server";

async function getStaticProps() {
    const ip = await fetchIp() as string;

    return {
        props: {
            ip
        }
    }
}

export async function generateMetadata() {
    const { props: { ip }} = await getStaticProps();
    const { city } = await getLocationByIp(ip) as { city: string };
    

    return {
        title: `Weather in ${city}`,
    }
}


export default async function Layout({children}: {children: React.ReactNode}) {

    await connection();

    return (
        <div className="w-screen h-screen relative">
            <Link href="/" className="absolute top-0 px-3 py-4 link" aria-label="back">
                 <MdArrowBack size={30} className="relative z-50" />
            </Link>
            {children}
        </div>
    )
}