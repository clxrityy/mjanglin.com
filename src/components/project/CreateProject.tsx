"use client";
import { addProject } from "@/app/_actions/projects";
import { projectSchema } from "@/util/objects";
import { Button } from "@nextui-org/react";
import { ComponentProps, FormEvent } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { v4 as uuid } from 'uuid';


type Props = ComponentProps<"form">;

export default function CreateProject({ ...props }: Props) {

    const { pending } = useFormStatus();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = projectSchema.parse({
            uuid: uuid(),
            url: formData.get("url") as string,
            title: formData.get("title") as string,
            image: formData.get("image") as string,
            description: formData.get("description") as string,
            color: formData.get("color") as string,
            footer: formData.get("footer") as string,
        });

        try {
            const project = await addProject(data).then(() => {
                toast.success("Project added!");
            });

            console.log(project);
        } catch (e) {
            toast.error("Error adding project");
            console.error(e);
        }
    }

    return (
        <form {...props} onSubmit={onSubmit} className="mx-auto px-5 py-4 border w-full flex flex-wrap justify-stretch items-stretch gap-5 rounded-md border-spacing-2 border-blue-400">
            <div className="grid justify-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 items-center w-full">

                <div className="project-form-item-container">
                    <label htmlFor="url">URL</label>
                    <input type="text" id="url" name="url" />
                </div>
                <div className="project-form-item-container">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" />
                </div>
                <div className="project-form-item-container">
                    <label htmlFor="image">Image</label>
                    <input type="text" id="image" name="image" />
                </div>
                <div className="project-form-item-container">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" />
                </div>
                <div className="project-form-item-container">
                    <label htmlFor="color">Color</label>
                    <input type="text" id="color" name="color" required={false} />
                </div>
                <div className="project-form-item-container">
                    <label htmlFor="footer">Footer</label>
                    <input type="text" id="footer" name="footer" required={false} />
                </div>

            </div>
            <div className="w-full flex items-center justify-center">
                <div className="w-2/3">
                    <Button variant="flat" aria-disabled={pending} type="submit" className="w-full border-blue-500/75 hover:border-2 text-white">Add</Button>
                </div>
            </div>
        </form>
    )
}