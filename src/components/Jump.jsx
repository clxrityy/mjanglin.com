import React from 'react';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';
import Link from 'next/link';

const Jump = () => {
    return (
        <div id='contact' className='w-full'>
            <div className='max-w-[1240px] m-auto px-2 py-16 w-full'>
                <div className='flex justify-center py-12 mt-2 sm:mt-40'>
                    <Link href='/#home' scroll={false}>
                        <div className='rounded-full shadow-lg shadow-gray-600 p-6 cursor-pointer hover:scale-110 ease-in duration-300 bg-gray-300'>
                            <HiOutlineChevronDoubleUp

                                size={30}
                                className='m-auto'
                                color='#4b9084'
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Jump;