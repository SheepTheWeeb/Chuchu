import 'dotenv/config'
import { DiscordGateway } from './models/discord-gateway.type'
import { DiscordGatewayImpl } from './gateways/discord-gateway'
import { initApp } from './use-cases/init-app'
import { CommandService } from './models/command-service.type'
import { CommandServiceImpl } from './services/command-service'
import { DatabaseGateway } from './models/database-gateway.type'
import { MongoDBGatewayImpl } from './gateways/mongodb-gateway'

const databaseGateway: DatabaseGateway = new MongoDBGatewayImpl()
const commandService: CommandService = new CommandServiceImpl(databaseGateway)
const discordGateway: DiscordGateway = new DiscordGatewayImpl()

async function start() {
  await initApp(discordGateway, commandService, databaseGateway)
}

start()
