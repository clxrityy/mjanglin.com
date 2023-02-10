import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProjectItem = ({title, backgroundImg, projectUrl, tool, description}) => {
    return (
        <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-500 rounded-xl p-4 group hover:bg-gradient-to-r from-[#4c726b] to-[#3a4d4a]'>
            <Image src={backgroundImg} alt={title}

                className='rounded-xl group-hover:opacity-20'
            />
            <div className='hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <h3 className='text-2xl text-white tracking-wider text-center'>
                    {title}
                </h3>
                <p className='text-sm text-gray-200 tracking-tight text-center pt-3'>
                    {description}
                </p>
                <p className='pb-4 pt-2 text-gray-200 text-center font-bold -tracking-normal'>
                    {tool}
                </p>
                <Link href={projectUrl}>
                    <p className='text-center p-3 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer hover:bg-gray-400 ease-in duration-100 hover:text-white'>
                        Take a look
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default ProjectItem;