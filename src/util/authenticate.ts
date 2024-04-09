export default function authenticate(credentials: string) {
    const correctCredentials = process.env.ADMIN_PASS!;

    if (credentials === correctCredentials) {
        return true;
    } else {
        return false;
    }
}