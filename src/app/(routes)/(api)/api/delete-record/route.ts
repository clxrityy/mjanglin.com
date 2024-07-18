import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const { userId, date, duration } = body;

    try {
        const existingRecord = await db.sleepData.findFirst({
            where: {
                userId,
                date,
                duration
            }
        });

        if (!existingRecord) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        await db.sleepData.delete({
            where: {
                id: existingRecord.id
            }
        });

        return NextResponse.json({ message: "Record deleted", status: 200 });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}