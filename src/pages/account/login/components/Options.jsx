import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React from 'react';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { IoLogoGoogle } from 'react-icons/io';
import { useRouter } from 'next/router';

const Options = () => {

    const router = useRouter();

    const supabase = useSupabaseClient();

    async function loginGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    return (
        <div className='grid grid-rows-3 p-8 rounded-md shadow-lg bg-zinc-900 space-y-5'>
            <div
                onClick={loginGoogle}
                className='flex p-2 flex-row justify-center items-center space-x-3 rounded-md bg-neutral-800 hover:scale-110 duration-500 ease-out hover:bg-[#4b9084] cursor-pointer'>
                <IoLogoGoogle size={50} /> <p>
                    Login with Google
                </p>
            </div>
            <div className='flex p-2 flex-row justify-center items-center space-x-3 rounded-md bg-neutral-800 hover:scale-110 duration-500 ease-out hover:bg-[#4b9084] cursor-pointer'>
                <FaTwitter size={50} /> <p>
                    Login with Twitter
                </p>
            </div>
            <div className='flex p-2 flex-row justify-center items-center space-x-3 rounded-md bg-neutral-800 hover:scale-110 duration-500 ease-out hover:bg-[#4b9084] cursor-pointer'>
                <FaGithub size={50} /> <p>
                    Login with GitHub
                </p>
            </div>
        </div>
    );
}

export default Options;