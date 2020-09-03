import twilio from "twilio";

class TwilioService {
    private _twilioClient;

    constructor() {
        this._twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, {
            lazyLoading: true
        });
    }

    async sendTextMessage(message: string, phoneNumber: string) {
        return this._twilioClient.messages.create({
            body: message,
            from: '+19472073121',
            to: phoneNumber
        });
    }

    async sendWhatsappMessage(message: string, phoneNumber: string) {
        return this._twilioClient.messages.create({
            body: message,
            from: 'whatsapp:+14155238886',
            to: phoneNumber
        });
    }
}

export const twilioService = new TwilioService();
