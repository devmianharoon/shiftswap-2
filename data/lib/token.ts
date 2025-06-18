// utils/decodeToken.ts
import  { jwtDecode } from 'jwt-decode';

// export interface JWTPayload {
//     userId: string;
//     email: string;
//     exp: number;
//     iat?: number;
//     role?: string;
// }
export interface JWTPayload {
  iss: string;   // Issuer (e.g., auth server URL)
  iat: number;   // Issued At (Unix timestamp)
  exp: number;   // Expiration Time (Unix timestamp)
  sub: string;   // Subject (e.g., user ID)
}

export function decodeJWT(token: string): JWTPayload | null {
    try {
        const decoded = jwtDecode<JWTPayload>(token);
        if (decoded && decoded.sub ) {
            return decoded;
        }
        console.error('Decoded JWT is missing required properties: userId or email');
        return null;
    } catch (error) {
        console.error('Invalid JWT:', error);
        return null;
    }
}
export function isTokenExpired(token: string): boolean {
    const decoded = decodeJWT(token);
    if (!decoded) return true;

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
}
