"use client";
import { MDXProvider } from '@mdx-js/react';
import Content from './page.mdx';
import Links from './(components)/_markdown/links.mdx';
import Header from './(components)/_markdown/header.mdx';
import Image from 'next/image';


export default function BlogsLayout() {

    return <div className="blog-container overflow-y-scroll h-fit">
        <MDXProvider components={{}}>
            <div className="blog-content">
                <div className='w-full flex items-start flex-col gap-4 h-full justify-center'>
                    <Content />
                </div>
                <div className='w-full grid grid-flow-col sm:grid-flow-col-dense gap-10 px-5 items-center justify-items-center'>
                    <div className='flex flex-col gap-3 items-end'>
                        <Links />
                    </div>
                    <div className='flex flex-col-reverse sm:flex-row md:flex-row gap-2 items-center'>
                        <div className='flex flex-col items-start gap-2 justify-center'>
                            <Header />
                        </div>
                        <Image src="./hbd_avatar.gif" alt='avatar' width={200} height={200} priority />
                    </div>

                </div>
            </div>
        </MDXProvider>
    </div>
}

