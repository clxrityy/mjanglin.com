import { CONFIG } from "@/config";
import OpenAI from "openai";

type AIType = "horoscope"

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
            content = "Generate a daily horoscope for the user based on their zodiac sign and the current date. The horoscope should be no more than 250 characters. The user's zodiac sign and birthday should be provided in the prompt. Tell them happy birthday if their birthday matches the current date."
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
}