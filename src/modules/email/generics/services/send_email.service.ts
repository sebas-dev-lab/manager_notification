import * as pug from 'pug';
import { Injectable } from '@nestjs/common';
import { MailerService as MailerMain } from '@nestjs-modules/mailer';
import { MailService } from '../configs/email_interfaces.configs';
import { dingtech_eamil_config } from 'src/infrastructure/envs/server.envs';
import BuildEmailDataHelper from 'src/common/helpers/buildEmailData.helpers';

@Injectable()
export class EmailServerService implements MailService {
    constructor(private readonly mailerMain: MailerMain) { }

    /**
    * Sends an email using the provided data.
    *
    * @param {object} datamailer - The data for the email.
    * @param {string} datamailer.templete - The template for the email body.
    * @param {object} datamailer.dataTemplete - The data to be used in the email template.
    * @param {string} datamailer.to - The recipient of the email.
    * @param {string} datamailer.subject - The subject of the email.
    * @param {string} datamailer.text - The plain text version of the email body.
    * @return {Promise<void>} A promise that resolves when the email is sent.
    */
    async sendMail(datamailer): Promise<void> {
        const render = this._bodytemplete(datamailer.templateFile, datamailer.dataTemplete);
        await this._processSendEmail(datamailer.from, datamailer.to, datamailer.subject, datamailer.text, render);
    }

    /**
     * Sends an email using the provided email server.
     *
     * @param {CreateEmailServerDto} email - The email object containing the recipient, subject, and text.
     * @return {Promise<void>} - A promise that resolves when the email is sent successfully.
     */
    async sendMailSandBox(email: Partial<BuildEmailDataHelper>): Promise<void> {
        const render = this._bodytemplete(email.templateFile, email.dataTemplate);
        await this._processSendEmail(email.from, email.to, email.subject, email.text, render);
    }

    /**
     * Generate the function comment for the given function body.
     *
     * @param {string} templete - The path to the template file.
     * @param {Object} data - The data object to be passed to the template.
     * @return {string} The rendered template.
     */
    _bodytemplete(templete, data) {
        return pug.renderFile(templete, { data });
    }

    /**
     * Sends an email with the specified details.
     *
     * @param {string} to - The recipient of the email.
     * @param {string} subject - The subject of the email.
     * @param {string} text - The plain text content of the email.
     * @param {string} body - The HTML content of the email.
     * @return {Promise<void>} A promise that resolves when the email is sent successfully.
     */
    async _processSendEmail(from: string, to: string, subject: string, text: string, body: any): Promise<void> {
        console.log('>>>>', text)
        await this.mailerMain.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: body,
        })
            .then(() => {
                console.log('Email sent');
            })
            .catch((e) => {
                console.log('Error sending email', e);
            });
    }

}
