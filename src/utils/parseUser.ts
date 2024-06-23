import { CONFIG } from "@/config";
import { db } from "@/lib/db";
import { CreateUserParams, OAuth2UserResponse } from "@/types/auth";
import { User } from "@prisma/client";
import axios from "axios";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export function parseUser(): OAuth2UserResponse | null {

    const cookie = cookies().get(CONFIG.VALUES.COOKIE_NAME);

    if (!cookie?.value) {
        return null;
    }

    const token = parse(cookie.value)[CONFIG.VALUES.COOKIE_NAME];

    if (!token) {
        return null;
    }

    try {
        const { iat, exp, ...user } = verify(token, process.env.JWT_SECRET! || "esofejsgoesgoJEosegosegtoSEITET*98") as OAuth2UserResponse & { iat: number, exp: number };

        return user;
    } catch (e) {
        console.log(`Error parsing user: ${e}`);
        return null;
    }
}

export async function getUserDetails(accessToken: string) {
    return await axios.get<OAuth2UserResponse>(CONFIG.URLS.OAUTH2_USER, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
};

export async function createUser({ userId, accessToken, refreshToken }: CreateUserParams): Promise<User> {
    const existingUser = await db.user.findFirst({
        where: {
            userId: userId
        }
    });

    if (existingUser) {
        await db.user.update({
            where: {
                userId: userId
            },
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken
            },
        })
    }

    return await db.user.create({
        data: {
            userId: userId,
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    });
}