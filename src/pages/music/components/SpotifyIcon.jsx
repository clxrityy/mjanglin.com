import React from 'react'
import { BsSpotify } from 'react-icons/bs';

const SoundCloudIcon = () => {
  return (
    <div>
      <a>
        <BsSpotify className='text-xl lg:text-[50px] hover:cursor-pointer hover:scale-125 animate-pulse hover:animate-none rounded-full' style={{ color: '#1DB954' }} />
      </a>
    </div>
  )
}

export default SoundCloudIcon