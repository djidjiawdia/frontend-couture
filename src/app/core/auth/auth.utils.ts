import jwtDecode from 'jwt-decode';
import { AuthType } from './auth.model';
export class AuthUtils {
    /**
     * Is token expired?
     *
     * @param token
     * @param offsetSeconds
     */
    static isTokenExpired(token: string): boolean {
        // Get the decoded token
        const decodedToken = this.decodeToken(token);

        // Return if the decodedToken doesn't have an 'exp' field
        if (!decodedToken.hasOwnProperty('exp')) {
            return false;
        }
        // Check if the token is expired
        return Date.now() > decodedToken.exp * 1000;
    }

    static decodeToken(token: string): AuthType {
        // Return if there is no token
        if (!token) {
            return null;
        }
        return jwtDecode(token);
    }
}
