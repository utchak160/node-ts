export interface IConfig {
    port: number | string;
    jwtSecretKey: string;
    mongoURI: string;
    sendGridApi: string;
}
