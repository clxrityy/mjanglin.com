import React from 'react';
import Image from 'next/image';
import preview from '../assets/images/gamepreview.gif';

const GamePreview = () => {
  return (
    <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-500 rounded-xl p-4 group hover:bg-gradient-to-r from-[#4c726b] to-[#3a4d4a]'>
      <a href='https://mjanglin.com/games/tictactoe'>
        <Image src={preview} alt='tictactoe preview' className='rounded-lg hover:opacity-20 w-full' />
      </a>
      <div className='hidden group-hover:flex justify-center items-center absolute'>
        <p className='text-3xl font-semibold'>
          Click anywhere to play!
        </p>
      </div>
    </div>
  );
};

export default GamePreview;