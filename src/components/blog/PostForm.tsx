"use client";
import { addBlog } from '@/app/(actions)/_actions/blogs';
import { blogSchema, projectSchema } from '@/util/schemas';
import { Button } from '@nextui-org/react';
import { ComponentProps, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';

type Props = {
    project: z.infer<typeof projectSchema>;
} & ComponentProps<"form">;


export default function PostForm({ project, ...props }: Props) {

    const [title, setTitle] = useState<string>(project.title);
    const [description, setDescription] = useState<string>(project.description);
    const [image, setImage] = useState<string>(project.image);
    const [projectUrl, setProjectUrl] = useState<string>("");

    const blog: z.infer<typeof blogSchema> = {
        title: title,
        content: description,
        image: image,
        date: new Date().toISOString(),
        uuid: project.uuid
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (blog.title === '' || blog.content === '' || blog.image === '' || projectUrl === '') {
            toast.error('Please fill out all fields');
            return;
        }
        try {
            await addBlog(blog);
            toast.success('Linked to blog post');
        } catch (e) {
            console.error(e);
            toast.error('Failed to link to blog post');
        }
    }

    return (
        <form onSubmit={handleSubmit} {...props} className="w-full max-w-2xl flex items-center justify-center flex-col gap-5 mx-auto px-4">
            <div className="w-full flex flex-col items-center justify-center gap-5">
                <input type="text" placeholder="Title" value={project.title}
                    onChange={(e) => { 
                        e.preventDefault();
                        setTitle(e.target.value);
                    }}
                />
                <textarea placeholder="Content preview" value={project.description}
                    onChange={(e) => { 
                        e.preventDefault();
                        setDescription(e.target.value);
                    }}
                />
                <input type="text" placeholder='Image/gif preview' value={project.image}
                    onChange={(e) => { 
                        e.preventDefault();
                        setImage(e.target.value);
                    }}
                />
                <input type="text" placeholder='Existing blog post URL' value={projectUrl}
                    onChange={(e) => { 
                        e.preventDefault();
                        setProjectUrl(e.target.value);
                    }}
                />
            </div>
            <div className='w-full flex items-center justify-center'>
                <Button variant='ghost' type='submit' className='w-1/2 flex items-center text-white hover:text-black'>Connect to blog post</Button>
            </div>
        </form>
    )
};