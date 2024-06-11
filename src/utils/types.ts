export type OAuth2CrendialsResponse = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export type CreateUserParams = {
    userId: string;
    accessToken: string;
    refreshToken: string;
}

export type OAuth2UserResponse = {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    email?: string;
    verified?: boolean;
    public_flags: number;
    flags: number;
    banner: string | null;
    banner_color: string | null;
    accent_color: number | null;
    locale: string;
    mfa_enabled: boolean;
}

export type OAuthTokenExchangeRequestParams = {
    client_id: string;
    client_secret: string;
    grant_type: string;
    code: string;
    redirect_uri: string;
    scope: string;
}