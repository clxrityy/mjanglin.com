'use client';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
    return <Skeleton className='bg-inherit flex items-center justify-center h-auto' />
}

export default Loading;