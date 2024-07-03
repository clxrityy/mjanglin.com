import { MdSpaceDashboard } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { CiSquarePlus } from "react-icons/ci";
import { FcClock } from "react-icons/fc";
import { BsClipboardDataFill } from "react-icons/bs";
import { FaChartLine , FaCalendar } from "react-icons/fa6";
import { VscCloseAll } from "react-icons/vsc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export const ICONS = {
    dashboard: MdSpaceDashboard,
    signIn: FaSignInAlt,
    clock: FcClock,
    close: VscCloseAll,
    calendar: FaCalendar,
    newRecord: CiSquarePlus,
    viewData: BsClipboardDataFill,
    viewPattern: FaChartLine,
    loading: AiOutlineLoading3Quarters
};

type DashbarItem = {
    icon: IconType;
    description: string;
    path: string;
    title: string;
}

export const DashbarItems: { [title: string]: DashbarItem } = {
    newRecord: {
        icon: CiSquarePlus,
        description: "Add a new sleep record",
        path: "/new",
        title: "Add Record"
    },
    viewData: {
        icon: BsClipboardDataFill,
        description: "View your sleep data",
        path: "/data",
        title: "Data"
    },
    viewPattern: {
        icon: FaChartLine,
        description: "View your overall sleep pattern",
        path: "/graph",
        title: "Graph"
    }
}