import React, {useState} from 'react';
import { ImSoundcloud2 } from 'react-icons/im';

const SoundCloudIcon = () => {

    const [hover, setHover] = useState(false);


    return (
        <div>
            <a>
                <ImSoundcloud2 className='text-xl lg:text-[50px] hover:cursor-pointer hover:scale-125 animate-pulse hover:animate-none rounded-full' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{color: '#ff7700'}} />
            </a>
        </div>
    );
};

export default SoundCloudIcon;