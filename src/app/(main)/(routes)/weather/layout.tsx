import { fetchIp, getLocationByIp } from "@/utils/ip";
import "@/styles/css/weather.css"

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


    return (
        <div className="w-screen h-screen relative">
            {children}
        </div>
    )
}