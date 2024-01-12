import {
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthCheck } from './modules/healthCheck/healthCheck.module';
import { setPath } from './infrastructure/envs/set.envs';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: setPath(),
      isGlobal: true,
    }),
    HealthCheck,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
