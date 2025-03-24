import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js'
import { DiscordGateway } from '../models/discord-gateway.type'
import { handleMessage } from '../handlers/message-handler'
import { CommandService } from '../models/command-service.type'

export class DiscordGatewayImpl implements DiscordGateway {
  client: Client<boolean>
  commandService: CommandService

  async init(
    clientId: string,
    token: string,
    commandService: CommandService,
  ): Promise<void> {
    this.commandService = commandService
    await this.initSlashCommands(clientId, token)
    this.initClient(token)
  }

  private async initSlashCommands(
    clientId: string,
    token: string,
  ): Promise<void> {
    const restCommands = []
    for (const command of this.commandService.commands) {
      const { name, description } = command
      restCommands.push({ name, description })
    }

    const rest = new REST({ version: '10' }).setToken(token)

    try {
      console.log('Started refreshing application (/) commands.')
      await rest.put(Routes.applicationCommands(clientId), {
        body: restCommands,
      })
      console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
      console.error(JSON.stringify(error))
    }
  }

  private initClient(token: string) {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] })

    this.client.on(Events.ClientReady, readyClient => {
      console.log(`Logged in as ${readyClient.user.tag}!`)
    })

    this.client.on(Events.InteractionCreate, async message => {
      await handleMessage(message, this.commandService)
    })

    this.client.login(token)
  }
}
