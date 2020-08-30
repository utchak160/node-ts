import MailService from "@sendgrid/mail";
import {MailDataRequired} from "@sendgrid/mail/src/mail";
import {config} from "../config";

// @ts-ignore
MailService.setApiKey(config.sendGridApi);

export const sendWelcomeMail = (name: string, email: string) => {

    const msg: MailDataRequired = {
        to: email,
        from: 'chakravartyutkarsh@gmail.com',
        subject: 'Thanks for Joining us',
        text: `Hi, ${name}!`,
        html: `<p>Hi, ${name}!</p>` +
            '<strong>Great to have you onboard.</strong>',
        replyTo: 'chakravartyutkarsh@gmail.com'
    };

    MailService.send(msg).then((res) => {
        console.log('Email sent');
    }).catch((err) => {
        console.log('Email not sent');
    })
}
