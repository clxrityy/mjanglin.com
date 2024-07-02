import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { userId, duration, date } = body;
    try {

        const existingRecord = await db.sleepData.findFirst({
            where: {
                userId,
                date,
            }
        });

        if (existingRecord) {
            return NextResponse.json({ error: "Record already exists" }, { status: 400 });
        }

        const sleepData = await db.sleepData.create({
            data: {
                userId,
                duration,
                date
            }
        });
        return NextResponse.json({ sleepData, status: 200 })
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}