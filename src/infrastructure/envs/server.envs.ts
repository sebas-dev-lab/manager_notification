import setEnviroments from './set.envs';
setEnviroments();

export const server_envs = {
  // Server
  mode_server: process.env.MODE_DEV,
  server_whitelist: process.env.SERVER_WITHE_LIST,
  base_path: process.env.SERVER_BASE_PATH,
  encrypt_key: process.env.SERVER_ENCRYPT_kEY,
  port_server: process.env.PORT_SERVER,
};

export const envs_server_config = {
  base_path: process.env.SERVER_BASE_PATH,
  encrypt_key: process.env.SERVER_ENCRYPT_kEY,

  // Assets
  assets_location: process.env.SERVER_ASSETS_LOCATION,
  assets_document: process.env.SERVER_ASSETS_DOCUMENTS_FILES,
};


export const rabbitmq_envs = {
  urls: process.env.RABBIT_URLS,
  queue: process.env.RABBIT_QUEUE,
  port: process.env.RABBIT_PORT,
  hostname: process.env.RABBIT_HOST,
  username: process.env.RABBITMQ_DEFAULT_USER,
  password: process.env.RABBITMQ_DEFAULT_PASS,

}

export const dingtech_eamil_config = {
  host: process.env.SERVICE_DING_MAIL_HOST,
  port: process.env.SERVICE_DING_MAIL_PORT,
  user: process.env.SERVICE_DING_MAIL_USER,
  pass: process.env.SERVICE_DING_MAIL_PASS,
}