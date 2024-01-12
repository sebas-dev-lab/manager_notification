import { Controller } from '@nestjs/common';
import {
    MessagePattern,
    Payload
} from '@nestjs/microservices';
import Logger from 'src/infrastructure/configurations/loggingConfiguration/winston.logs';
import { auth_email_code } from 'src/infrastructure/services/constants/services.constant';
import { EmailServerService } from '../services/send_email.service';
import { TwoFactorValidationEmailDTO } from '../dto/auth_validation.dto';
import { TwoFactroAuthValidationEmailDataBuilder } from '../helpers/auth_validation_data_builder';

@Controller()
export class GenericSendEmailController {

    constructor(
        private readonly emailServerService: EmailServerService
    ) { }

    /**
     *  ======== Authentication ======= 
     *  Sen code for two factor authentication
     */
    @MessagePattern(auth_email_code)
    public async two_factor_auth(
        @Payload('message') message: TwoFactorValidationEmailDTO,
    ) {
        try {
            const buildData = new TwoFactroAuthValidationEmailDataBuilder(message);
            return this.emailServerService.sendMailSandBox(buildData);
        } catch (e) {
            Logger.error(e.stack);
        }
    }
}