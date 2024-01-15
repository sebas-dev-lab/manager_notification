import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http.exceptions';
import { configCors } from './infrastructure/configurations/cors.configurations';
import morganMiddleware from './infrastructure/configurations/loggingConfiguration/morgan.logs';
import { rabbitmq_envs, server_envs } from './infrastructure/envs/server.envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import Logger from './infrastructure/configurations/loggingConfiguration/winston.logs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure CORS
  configCors(app);

  // Global pipes and filters
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  // Base API Path
  app.setGlobalPrefix(server_envs.base_path);

  // Logger Middleware
  app.use(morganMiddleware);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        {
          port: Number(rabbitmq_envs.port),
          hostname: rabbitmq_envs.hostname,
          password: rabbitmq_envs.password,
          username: rabbitmq_envs.username,
        },
      ],
      queue: rabbitmq_envs.queue,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  // Listen on the main server
  await app.listen(server_envs.port_server, async () => {
    Logger.info('Server listening on port ' + server_envs.port_server);
  });
}

bootstrap();
