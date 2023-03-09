import React from 'react';
import Image from 'next/image';

export default function Avatar({ size, url, name }) {
    
    let width = 'w-50';
    let sizing = {};
    if (size === 'lg') {
        width = 'w-100 md:w-250';
        sizing = {
            w: 250,
            h: 250
        }
    }
    else {
        sizing = {
            w: 100,
            h: 100
        }
    }


    return (
        <div className={`${width} rounded-full overflow-hidden`}>
            { url && <Image src={url} alt={name} width={sizing.w} height={sizing.h} />}
        </div>
    );
};

