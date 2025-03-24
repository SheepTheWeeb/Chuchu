import 'dotenv/config'
import { DiscordGateway } from './models/discord-gateway.type'
import { DiscordGatewayImpl } from './gateways/discord-gateway'
import { initApp } from './use-cases/init-app'
import { CommandService } from './models/command-service.type'
import { CommandServiceImpl } from './services/command-service'

const discordGateway: DiscordGateway = new DiscordGatewayImpl()
const commandService: CommandService = new CommandServiceImpl()

async function start() {
  await initApp(discordGateway, commandService)
}

start()
