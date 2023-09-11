import { colorSet } from "@/util/constants"


const Donut = () => {
    return (
        <div className="my-20 md:my-16 flex" >
            <div className={`relative mx-auto h-28 w-28 animate-spin-slow rounded-full border-2 border-[rgb(72,145,116)] p-4 opacity-90 hover:opacity-100 shadow-inner drop-shadow-xl hover:shadow-xl hover:drop-shadow-2xl hover:border-[#eee] transition-all duration-300 cursor-pointer`}>
                <span className="absolute right-5 top-2 flex h-3 w-3">
                    <span className="bg-white-500 relative inline-flex h-3 w-3 rounded-full bg-[#eee] cursor-pointer shadow-lg drop-shadow-lg" />
                </span>
            </div>
        </div>
    )
}

export default Donut