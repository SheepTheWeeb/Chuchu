import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { BotCommand } from '../models/bot-command.type'
import { DatabaseGateway } from '../models/database-gateway.type'
import { DefaultError } from '../utils/tamagotchi.const'
import { stats } from '../use-cases/tamagotchi/stats'
import { TamagotchiError } from '../models/errors/tamagotchi-error'

export class StatsCommand implements BotCommand {
  name: string
  description: string
  databaseGateway: DatabaseGateway

  constructor(databaseGateway: DatabaseGateway) {
    this.name = 'stats'
    this.description = 'See Tamagotchi stats.'
    this.databaseGateway = databaseGateway
  }

  async execute(message: ChatInputCommandInteraction): Promise<void> {
    console.debug('stats command executing...')
    try {
      const tamagotchi = await stats(
        message.user.username,
        this.databaseGateway,
      )
      // TODO: create embed with all stats
      // Handle toggled lights with black image and zzz
    } catch (error) {
      if (error instanceof TamagotchiError && error.name === 'GET_NOT_FOUND') {
        message.reply(error.message)
      } else {
        console.error(error)
        message.reply(DefaultError)
      }
    }
  }
  getSlashCommandBuilder(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
  }
}
