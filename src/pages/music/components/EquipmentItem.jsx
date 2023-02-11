import React from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import Image from 'next/image';

const EquipmentItem = ({ title, item, image, rating }) => {


    return (
        <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-500 rounded-xl p-4 group'>
            <Image src={image} alt={item} className='rounded-xl group-hover:animate-pulse duration-[3s] ease-in' />
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black/60 rounded-xl p-2 hover:bg-black/80 hover:p-3'>
                <h3 className='text-sm text-center py-1'>
                    {title}
                </h3>
                <p className='font-bold text-center py-2'>
                    {item}
                </p>
                <div className='flex justify-center place-self-end'>
                    {Array.from({ length: rating }, () => <div key={rating} className=' items-center content-around inline-block mt-2'>
                        <BsFillStarFill key={rating} className='inline-block' />
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default EquipmentItem;