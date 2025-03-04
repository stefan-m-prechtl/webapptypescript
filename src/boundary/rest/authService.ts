export default class AuthService {

    private static ENDPOINT_LOGIN: string = '/auth/login';
    private static token: string = '';
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async login(jsonData: string): Promise<void> {
        const url = `${this.baseUrl}${AuthService.ENDPOINT_LOGIN}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: jsonData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        AuthService.token = await response.text();
    }


    public static getToken(): string {
        return AuthService.token;
    }

}