import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface LoadingProps {

}

const LoadingPage: FC<LoadingProps> = ({ }) => {
    return <div className="h-[100%] snap-center w-[100%] 2xl:w-[1400px] flex justify-center 2xl:justify-between flex-col lg:flex-row items-center p-2">

        {/* LEFT */}
        <div className="flex flex-1 xl:flex-[2] flex-col justify-center gap-[20px] p-4 hero-left">

            <div className='text-center 2xl:text-left text-7xl font-semibold'>
                <Skeleton
                    height={100}
                    width={500}
                />
            </div>

            <div className="flex items-center gap[10px]">
                <Skeleton width={50}
                    height={50}
                />
            </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 md:flex-[3] xl:flex-[2] relative w-[100%] lg:w-auto">
            <Skeleton
                height={50}
                width={200}
            />
        </div>
    </div>
}

export default LoadingPage;