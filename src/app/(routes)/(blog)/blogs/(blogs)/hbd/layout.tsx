"use client";
import { MDXProvider } from '@mdx-js/react';
import Content from './page.mdx';
import Links from './(components)/_markdown/links.mdx';
import Gif from './(components)/_markdown/gif.mdx';



export default function BlogsLayout() {
    return <div className="blog-container overflow-y-scroll h-fit">
        <MDXProvider components={{}}>
            <div className="blog-content">
                <div className='w-full flex items-start flex-col gap-4 h-full justify-start'>
                    <Content />
                </div>
                <div className='w-full grid grid-flow-col md:grid-flow-col-dense gap-3 px-5 items-center'>
                    <Gif />
                    <div className='flex flex-col gap-3 items-end'>
                        <Links />
                    </div>
                </div>
            </div>
        </MDXProvider>
    </div>
}

