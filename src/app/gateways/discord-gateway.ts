import {
  Client,
  EmbedBuilder,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js'
import { DiscordGateway } from '../models/discord-gateway.type'
import { handleMessage } from '../handlers/message-handler'
import { CommandService } from '../models/command-service.type'
import { Tamagotchi } from '../models/tamagotchi.type'
import {
  convertNumberToHearts,
  convertNumberToPoo,
} from '../utils/tamagotchi-utils'

export class DiscordGatewayImpl implements DiscordGateway {
  client: Client<boolean>
  commandService: CommandService

  async init(
    clientId: string,
    guildId: string,
    token: string,
    commandService: CommandService,
  ): Promise<void> {
    this.commandService = commandService
    await this.initSlashCommands(clientId, guildId, token)
    this.initClient(token)
  }

  private async initSlashCommands(
    clientId: string,
    guildId: string,
    token: string,
  ): Promise<void> {
    const restCommands = []
    for (const command of this.commandService.commands) {
      restCommands.push(command.getSlashCommandBuilder())
    }

    const rest = new REST({ version: '10' }).setToken(token)

    try {
      console.log('Started refreshing application (/) commands.')
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
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

  static getTamagotchiEmbed(tamagotchi: Tamagotchi): EmbedBuilder {
    return new EmbedBuilder()
      .setColor(0x008000)
      .setTitle(tamagotchi.name)
      .setDescription(tamagotchi.activity)
      .addFields(
        {
          name: 'Happiness',
          value: convertNumberToHearts(tamagotchi.stats.happiness),
          inline: true,
        },
        {
          name: 'Hunger',
          value: convertNumberToHearts(tamagotchi.stats.hunger),
          inline: true,
        },
        {
          name: 'Discipline',
          value: convertNumberToHearts(tamagotchi.stats.discipline),
          inline: true,
        },
        {
          name: 'Dirty',
          value: convertNumberToPoo(tamagotchi.stats.dirty),
          inline: true,
        },
        {
          name: 'Weight',
          value: `${tamagotchi.stats.weight} KG`,
          inline: true,
        },
        { name: 'Age', value: `${tamagotchi.stats.age} days`, inline: true },
      )
      .setTimestamp()
      .setFooter({ text: 'Tamagotchi stats command' })
  }
}
