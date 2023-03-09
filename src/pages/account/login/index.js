import React from 'react';
import Head from 'next/head';
import Options from './components/Options';

const Login = () => {

    return (
        <div className='w-full'>
            <Head>
                <title>
                    Login
                </title>
            </Head>
            <div className='flex justify-center items-center h-screen flex-col space-y-3 -mt-12'>
                <h1 className='uppercase tracking-wide p-5'>
                    Login
                </h1>
                <Options />
            </div>
        </div>
    );
}

export default Login;