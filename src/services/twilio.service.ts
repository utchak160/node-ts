import twilio from "twilio";

class TwilioService {
    private _twilioClient;

    constructor() {
        this._twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, {
            lazyLoading: true
        });
    }

    async sendMessage(message: string, phoneNumber: string) {
        return this._twilioClient.messages.create({
            body: message,
            from: '+19472073121',
            to: phoneNumber
        });
    }
}

export const twilioService = new TwilioService();
