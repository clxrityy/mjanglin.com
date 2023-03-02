import React from 'react';
import Head from 'next/head';
import Board from './components/Board';

const snake = () => {
    return (
        <div className='flex justify-center items-center w-full h-screen'>
            <Head>
                <title>
                    MJ Anglin | Snake
                </title>
            </Head>
            <div>
                <Board />
            </div>
        </div>
    );
};

export default snake;