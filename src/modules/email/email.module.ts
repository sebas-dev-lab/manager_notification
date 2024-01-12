import { Module } from '@nestjs/common';
import { GenericSendEmailController } from './generics/controllers/send_email.controllers';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EmailServerService } from './generics/services/send_email.service';
import { dingtech_eamil_config } from 'src/infrastructure/envs/server.envs';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: String(dingtech_eamil_config.host),
        port: Number(dingtech_eamil_config.port),
        secure: true,
        auth: {
          user: dingtech_eamil_config.user,
          pass: dingtech_eamil_config.pass,
        },
      },
      template: {
        dir: __dirname + './template/notification',
        adapter: new PugAdapter({ inlineCssEnabled: true, }),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [GenericSendEmailController],
  providers: [EmailServerService],
  exports: [],
})
export class EmailModule {}
