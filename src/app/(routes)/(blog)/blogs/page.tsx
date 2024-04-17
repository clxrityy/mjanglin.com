"use server";
import { getBlogs } from "@/app/(actions)/_actions/blogs";
import { Button, Image, Link } from "@nextui-org/react";


export default async function Page() {
    try {
        const blogs = await getBlogs();


        if (!blogs || blogs.length < 1) {
            return <div className="w-full h-[50vh] flex flex-col gap-5 items-center justify-center">
                <h1 className="text-3xl font-bold">No blogs found</h1>
                <Link href="/" aria-label="Home">
                    <Button>
                        Go back
                    </Button>
                </Link>
            </div>;
        }

        return <div className="w-full h-full flex flex-col items-center justify-center gap-5">
            {blogs.map((blog) => {
                return <Link href={`/blogs/${blog.title}`} key={blog.uuid} className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-5 border hover:scale-105 transition-all rounded-md shadow">
                    <div className="w-full flex items-center flex-col">
                        <h1 className="text-2xl font-bold">{blog.title}</h1>
                        <p>{blog.content}</p>
                    </div>
                    <div className="w-full flex items-center">
                        <Image isBlurred src={blog.image} alt={blog.title} width={200} height={200} className="rounded-md" />
                    </div>
                </Link>
            })}
        </div>;
    } catch (e: any) {

        console.error(e);

        return <div className="w-full h-full flex items-center justify-center">
            <p className="text-sm">{e}</p>
        </div>
    }
} 