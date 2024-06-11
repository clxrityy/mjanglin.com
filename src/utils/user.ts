import { CONFIG } from "@/config";
import { db } from "@/lib/db";
import { CreateUserParams, OAuth2UserResponse } from "@/utils/types";
import { User } from "@prisma/client";
import axios from "axios";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export function parseUser(): OAuth2UserResponse | null {

    const cookie = cookies().get(CONFIG.COOKIE_NAME);

    if (!cookie?.value) {
        return null;
    }

    const token = parse(cookie.value)[CONFIG.COOKIE_NAME];

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
    return await axios.get<OAuth2UserResponse>(CONFIG.OAUTH2_USER, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
};

export async function createUser({ userId, accessToken, refreshToken }: CreateUserParams): Promise<User> {
    const existingUser = await db.user.findUnique({
        where: {
            userId
        }
    });

    if (existingUser) {
        return existingUser;
    }

    return await db.user.create({
        data: {
            userId: userId,
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    });
}