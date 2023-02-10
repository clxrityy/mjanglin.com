import React, { useState } from 'react';
import Image from 'next/image';
import { connectGif } from '/public/assets/images/connect.gif'


const GameColumn = ({ col }) => {
    console.log(col)
    return (
        <div className='column'>
            {col.map(cell => {
                return "cell"
            })}
        </div>
    )
}


const ConnectFourGame = () => {

    let initial = [];

    for (let c = 0; c < 7; c++) {
        initial.push([1, 2, 3, 4, 5, 6]);
    }


    const [gameState, setGameState] = useState(initial);


    return (
        <>
            {gameState.map(col => {
                return <GameColumn key={col} col={col} />;
            })}
        </>
    );
};

const connectFour = () => {
    return (
        <div className='w-full'>
            <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
            <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/60 z-10' />
                <Image src='/../public/assets/images/connect.gif' alt='connect' className='absolute z-1' style={{ objectFit: 'cover' }} fill />
                

                <div className=''>
                    <ConnectFourGame />
                </div>
            </div>
        </div>
    );
};

export default connectFour;