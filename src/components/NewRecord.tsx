"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SleepUser } from "@prisma/client";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ICONS } from "@/config/data/constants";

const formSchema = z.object({
    duration: z.number().int().positive(),
    date: z.date(),
    username: z.string(),
    userId: z.string(),
});

type Props = {
    userData: {
        sleepData: {
            id: string;
            userId: string;
            duration: number;
            date: Date;
        }[]
    } & SleepUser;
}

export default function NewRecordForm({ userData }: Props) {

    const [date, setDate] = useState<Date>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            duration: 0,
            date: new Date(),
            username: userData.username,
            userId: userData.userId
        }
    });

    const isLoading = form.formState.isLoading;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (form.formState.isValid) {
            console.log(values)
            // try {
            //     await db.sleepData.create({
            //         data: {
            //             duration: values.duration,
            //             date: values.date,
            //             userId: values.userId,
            //         }
            //     })
            // } catch (e: any) {
            //     console.error(e);
            // }
        } else {
            console.error("Form is invalid");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Duration
                            </FormLabel>
                            <FormDescription>
                                How long did you sleep? (in hours)
                            </FormDescription>
                            <FormControl>
                                <Input {...field} type="number" className="text-zinc-200" />
                            </FormControl>
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Date
                            </FormLabel>
                            <FormDescription>
                                When did you sleep?
                            </FormDescription>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <ICONS.calendar className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            {...field}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} type="submit" className="w-full">
                    Add
                    </Button>
            </form>
        </Form>
    )
}