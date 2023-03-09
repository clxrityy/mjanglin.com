import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import Login from '../../login';
import Head from 'next/head';
import styles from './ProfileCard.module.css';
import ProfileNav from './ProfileNav';

export default function UserProfile() {
    const [profile, setProfile] = useState(null);
    const supabase = useSupabaseClient();
    const session = useSession();
    useEffect(() => {
        // alert(session.user.id)
        supabase.from('profiles')
            .select()
            .eq('id', session.user.id)
            .then(result => {
                if (result.data.length) {
                    setProfile(result.data[0]);
                }
            })
    }, [supabase, session.user.id])

    if (!profile) {
        return (
            <Login />
        );
    }

    async function logout() {
        await supabase.auth.signOut();
    }


    console.log(profile);



    return (
        <div className='w-full'>
            <Head>
                <title>
                    {profile.name}&#39;s Profile
                </title>
            </Head>
            <div className='absolute'>
                <ProfileNav />
            </div>
            <div className='w-full grid justify-items-stretch'>
                <div className='w-fit h-fit bg-[#4b9084] p-9 flex flex-col justify-self-end rounded-md justify-center'>
                    <div className='space-y-2 flex flex-col justify-center items-center'>
                        <Avatar url={profile.avatar} />
                        <h4 className='text-center text-black font-bold'>
                            {profile.name}
                        </h4>
                        <button onClick={logout} className={styles.logoutBtn}>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
