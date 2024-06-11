import CryptoJS from 'crypto-js';

export const encryptToken = (token: string) => CryptoJS.AES.encrypt(token, process.env.ENCRYPTION_KEY! || "esogUSEGOSJEGSEGi");

export const decryptToken = (encrypted: string) => CryptoJS.AES.decrypt(encrypted, process.env.ENCRYPTION_KEY! || "esogUSEGOSJEGSEGi").toString(CryptoJS.enc.Utf8);

export function encryptTokens(accessToken: string, refreshToken: string): { accessToken: string, refreshToken: string } {
    return {
        accessToken: encryptToken(accessToken).toString(),
        refreshToken: encryptToken(refreshToken).toString()
    };
}