import React from 'react';
import Header from './components/Header';
import Main from './components/Main';

const home = () => {
    return (
        <div className='w-full'>
            <Header />
            <div className='max-w-[1240px] mx-auto p-2 gap-8 pt-8'>
                <div className=''>
                    <Main />
                </div>
            </div>
        </div>
    );
};

export default home;