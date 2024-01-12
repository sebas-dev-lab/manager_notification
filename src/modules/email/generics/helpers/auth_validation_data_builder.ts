import * as path from 'path';
import { readFileSync } from 'fs';
import { TwoFactorValidationEmailDTO } from "../dto/auth_validation.dto";
import BuildEmailDataHelper from "src/common/helpers/buildEmailData.helpers";
import { dingtech_eamil_config } from 'src/infrastructure/envs/server.envs';

export class TwoFactroAuthValidationEmailDataBuilder extends BuildEmailDataHelper {
    constructor(data: TwoFactorValidationEmailDTO) {
        const title = data.title ? data.title : 'Validación';
        const img = path.join(__dirname, '../../../../assets/imgs/ding_logo.png');
        const imageData = readFileSync(img).toString('base64');
        const templateFile = path.join(__dirname, `../templates/${data.template}.pug`); 
        const description = data.text ? data.text : '';
        const from = data.from ? data.from : dingtech_eamil_config.user
        super({
            ...data, title, img, imageData, from, templateFile, dataTemplate: {
                title,
                imageData,
                description,
                year: new Date().getFullYear(),
        } });
    }
}