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
            content = "Generate a daily horoscope for the user based on their zodiac sign and the current date. The horoscope should be a short paragraph that provides a general overview of the user's day and includes advice or predictions for the future. The horoscope should be positive and uplifting, and should be tailored to the user's zodiac sign to provide a personalized experience. The horoscope should be generated using a pre-trained language model that is capable of generating human-like text based on a prompt. The horoscope should be generated in real-time and should be unique to each user to provide a personalized experience. The horoscope should be generated quickly and accurately to provide a seamless user experience. The horoscope should be generated in a way that is easy to read and understand, and should be free of errors or inaccuracies. The horoscope should be generated in a way that is engaging and entertaining, and should encourage the user to come back for more horoscopes in the future. Ensure to wish them a happy birthday if it is their birthday."
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

        const prompt = `USER: ${data.username}\nZODIAC_SIGN: ${data.zodiacSign}\nDATE: ${data.date.toISOString()}\nBIRTHDAY: ${data.birthday.day}/${data.birthday.month}`;

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

            await this.sleep(200);

            return res;

        } catch (e: any) {
            return `**An error occured:**\n\`\`\`json\n${JSON.stringify(e, null, 2)}\`\`\``;
        }
    }
}