"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SleepUser } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
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
import toast from "react-hot-toast";
import axios from "axios";


export const formSchema = z.object({
    duration: z.number().positive(),
    date: z.date(),
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
            date: date,
            userId: userData.userId
        }
    });

    const isLoading = form.formState.isLoading;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (form.getValues()) {
            await axios.post(`/api/new-record`, {
                ...values
            }).then((res) => {
                if (res.status !== 200) { 
                    if (res.status === 400) {
                        toast.error("A record already exists for this day!");
                    } else {
                        toast.error("Failed to add record");
                    }
                } else {
                    toast.success("Record added successfully!");
                }
            }).catch((e: any) => {
                toast.error("Failed to add record!");
                console.error(e);
            })

        } else {
            toast.error("Form is invalid");
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
                                <Input
                                    {...field}
                                    type="number"
                                    className="text-zinc-200"
                                    disabled={isLoading}
                                    onChange={(e) => {
                                        field.onChange(e.target.valueAsNumber);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
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
                                            disabled={isLoading}
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            {...field}
                                            onDayClick={(day) => {
                                                field.onChange(day)
                                            }}
                                            onMonthChange={(month) => {
                                                field.onChange(month)
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormMessage />
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