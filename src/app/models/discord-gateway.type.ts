import { Client } from 'discord.js'
import { CommandService } from './command-service.type'

export interface DiscordGateway {
  client: Client<boolean>
  init(
    clientId: string,
    token: string,
    commandService: CommandService,
  ): Promise<void>
}
