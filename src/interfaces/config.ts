export interface IConfig {
    port: number | string;
    jwtSecretKey: string | undefined;
    mongoURI: string | undefined;
}
