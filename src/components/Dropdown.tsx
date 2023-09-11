'use client';
import { FC, ReactNode, useState } from "react";
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';



type Props = {
    prompt: string;
    children: ReactNode;
}

const Dropdown: FC<Props> = ({ prompt, children }) => {

    const [clicked, setClicked] = useState<boolean>(false);

    return (
        <div className="flex justify-center items-center flex-col">
            <div onClick={() => setClicked(!clicked)} className="flex flex-row items-center space-x-2 cursor-pointer">
                <span className="opacity-60 hover:opacity-100 hover:scale-105 transition-all cursor-pointer">
                    {
                        !clicked ? <HiOutlinePlusSm /> : <HiOutlineMinusSm />
                    }
                </span>
                <span className={`text-[rgb(72,145,116)] hover:text-[#eee]/80 transition-colors text-base md:text-lg`}>
                    {prompt}
                </span>
            </div>

            {
                clicked && (
                    <div
                        className={`rounded-lg border-[rgb(72,145,116)]/30 px-2 py-4 drop-shadow-md shadow-inner bg-gradient-to-br from-[rgb(72,145,116)]/10  mt-4 border-2 max-w-md min-w-fit`}>
                        
                        {children}
                    </div>
                )
            }
        </div>
    );
}

export default Dropdown;