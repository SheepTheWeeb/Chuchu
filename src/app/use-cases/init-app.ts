import { CommandService } from '../models/command-service.type'
import { DatabaseGateway } from '../models/database-gateway.type'
import { DiscordGateway } from '../models/discord-gateway.type'

export async function initApp(
  discordGateway: DiscordGateway,
  commandService: CommandService,
  databaseGateway: DatabaseGateway,
) {
  const {
    DISCORD_CLIENT_ID,
    DISCORD_GUILD_ID,
    DISCORD_TOKEN,
    DB_CONNECTION_STRING,
    DB_NAME,
    DB_TAMAGOTCHI_COLLECTION,
  } = process.env
  await discordGateway.init(
    DISCORD_CLIENT_ID,
    DISCORD_GUILD_ID,
    DISCORD_TOKEN,
    commandService,
  )
  databaseGateway.init(DB_NAME, DB_TAMAGOTCHI_COLLECTION, DB_CONNECTION_STRING)
}
