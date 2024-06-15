import { CONFIG } from "@/config";
import { OAuth2CrendialsResponse, OAuthTokenExchangeRequestParams } from '@/types/auth';
import { encryptTokens } from '@/utils/encrypt';
import {
    createUser,
    getUserDetails
} from "@/utils/user";
import axios, { AxiosRequestConfig } from 'axios';
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';


const axiosConfig: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
}
const buildOAuth2RequestPayload = (data: OAuthTokenExchangeRequestParams) => new URLSearchParams(data).toString();

const scope = ["identify"].join(" ");

const OAUTH_QS = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    redirect_uri: CONFIG.REDIRECT_URI,
    response_type: "code",
    scope
}).toString();

const OAUTH_URL = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`;


export async function GET(req: Request) {
    const urlParams = new URL(req.url).searchParams;

    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (error) {
        console.log(`Error authorizing user: ${error}`);
        return NextResponse.json(JSON.stringify(error), { status: 500 });
    }

    if (!code) {
        return NextResponse.redirect(OAUTH_URL);
    }

    const body = buildOAuth2RequestPayload({
        client_id: process.env.CLIENT_ID!,
        client_secret: process.env.CLIENT_SECRET!,
        grant_type: "authorization_code",
        code,
        redirect_uri: CONFIG.REDIRECT_URI,
        scope
    }).toString();

    try {
        const { data } = await axios.post<OAuth2CrendialsResponse>(CONFIG.OAUTH2_TOKEN, body, axiosConfig);

        const { access_token, refresh_token } = data;

        const user = await getUserDetails(access_token);

        const encryptedTokens = encryptTokens(access_token, refresh_token);

        await createUser({
            userId: user.data.id,
            accessToken: encryptedTokens.accessToken,
            refreshToken: encryptedTokens.refreshToken
        });

        if (!("id" in user.data)) return NextResponse.json(JSON.stringify("User not found"), { status: 404 });

        const token = sign(user.data, process.env.JWT_SECRET!, { expiresIn: "24h" });

        cookies().set(CONFIG.COOKIE_NAME, serialize(CONFIG.COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        }));

        return NextResponse.redirect(CONFIG.BASE_URL);

    } catch (e) {
        console.log(`Error exchanging code for token: ${e}`);
        return NextResponse.json(JSON.stringify(e), { status: 500 });
    }
}