import { CommandService } from '../models/command-service.type'
import { DiscordGateway } from '../models/discord-gateway.type'

export async function initApp(
  discordGateway: DiscordGateway,
  commandService: CommandService,
) {
  const { DISCORD_CLIENT_ID, DISCORD_TOKEN } = process.env
  await discordGateway.init(DISCORD_CLIENT_ID, DISCORD_TOKEN, commandService)
}
