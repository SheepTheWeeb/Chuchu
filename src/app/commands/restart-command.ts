import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import { BotCommand } from '../models/bot-command.type'
import { restart } from '../use-cases/tamagotchi/restart'
import { DatabaseGateway } from '../models/database-gateway.type'
import { DefaultError, DefaultNames } from '../utils/tamagotchi.const'
import { TamagotchiError } from '../models/errors/tamagotchi-error'

export class RestartCommand implements BotCommand {
  name: string
  description: string
  databaseGateway: DatabaseGateway

  constructor(databaseGateway: DatabaseGateway) {
    this.name = 'restart'
    this.description = 'Get Tamagotchi egg.'
    this.databaseGateway = databaseGateway
  }

  async execute(message: ChatInputCommandInteraction): Promise<void> {
    console.debug('restart command executing...')
    let name = message.options.getString('name')
    if (!name) {
      name = DefaultNames[Math.floor(Math.random() * DefaultNames.length)]
    }

    try {
      const tamagotchi = await restart(
        message.user.username,
        name,
        this.databaseGateway,
      )
      message.reply(`${tamagotchi.name} was created!`)
    } catch (error) {
      if (
        error instanceof TamagotchiError &&
        error.name === 'CREATE_EXISTS_ERROR'
      ) {
        message.reply(error.message)
      } else {
        console.error(error)
        message.reply(DefaultError)
      }
    }
  }

  getSlashCommandBuilder(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption(option =>
        option
          .setName('name')
          .setDescription('What is the name of your Tamagotchi?'),
      )
  }
}
