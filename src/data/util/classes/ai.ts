import { CONFIG } from "@/config";
import OpenAI from "openai";

type AIType = "horoscope" | "compatibility";

export class AI {
    openai: OpenAI;

    constructor(openai: OpenAI) {
        this.openai = openai;
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private generateSystemRoleContent(aiType: AIType): string {
        let content = "";

        if (aiType === "horoscope") {
            content = "Generate a daily horoscope for the user based on their zodiac sign and the current date. The horoscope should be no more than 250 characters. The user's zodiac sign and their birthday should be provided in the prompt, along with the current date"
        }

        if (aiType === "compatibility") { 
            content = "Generate a compatibility report between two users based on their zodiac signs. The report should include a percentage of compatibility, seperated by a newline, then a brief description of the relationship between the two signs, as well as any potential challenges or areas of conflict. The zodiac signs of both users should be provided in the prompt. Please bold the percentage of compatibility with ** before and after the percentage."
        }

        return content;
    }

    public async horoscopeQuery(data: {
        username: string,
        zodiacSign: string,
        date: Date,
        birthday: {
            day: number,
            month: number
        }
    }): Promise<string | null> {
        const systemRoleContent = this.generateSystemRoleContent("horoscope");

        const prompt = `USER: ${data.username}\nZODIAC_SIGN: ${data.zodiacSign}\nCURRENT DATE: ${data.date.toISOString()}\nBIRTHDAY: ${data.birthday.day}/${data.birthday.month}`;

        try {
            const res = await this.openai.chat.completions.create({
                model: CONFIG.AI.model,
                temperature: CONFIG.AI.temperature,
                presence_penalty: CONFIG.AI.presence_penalty,
                messages: [
                    {
                        role: "system",
                        content: systemRoleContent
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
            }).then((res) => res.choices[0].message.content).catch((e) => `**An error occured:**\n\`\`\`json\n${JSON.stringify(e, null, 2)}\`\`\``);

            await this.sleep(5);

            return res;

        } catch (e: any) {
            return `**An error occured:**\n\`\`\`json\n${JSON.stringify(e, null, 2)}\`\`\``;
        }
    }

    public async compatibilityQuery(data: {
        username1: string,
        username2: string,
        zodiacSign1: string,
        zodiacSign2: string
    }): Promise<string | null> {
        const systemRoleContent = this.generateSystemRoleContent("compatibility");

        const prompt = `USER1: ${data.username1}\nUSER2: ${data.username2}\nZODIAC_SIGN1: ${data.zodiacSign1}\nZODIAC_SIGN2: ${data.zodiacSign2}`;

        try {
            const res = await this.openai.chat.completions.create({
                model: CONFIG.AI.model,
                temperature: CONFIG.AI.temperature,
                presence_penalty: CONFIG.AI.presence_penalty,
                messages: [
                    {
                        role: "system",
                        content: systemRoleContent
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
            }).then((res) => res.choices[0].message.content).catch((e) => `**An error occured:**\n\`\`\`json\n${JSON.stringify(e, null, 2)}\`\`\``);

            await this.sleep(5);

            return res;
        } catch (e: any) {
            return `**An error occured:**\n\`\`\`json\n${JSON.stringify(e, null, 2)}\`\`\``;
        }
    }
}