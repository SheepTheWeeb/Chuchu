import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { BotCommand } from '../models/bot-command.type'

export class PingCommand implements BotCommand {
  name: string
  description: string

  constructor() {
    this.name = 'ping'
    this.description = 'Replies with Pong!'
  }

  async execute(message: ChatInputCommandInteraction): Promise<void> {
    await message.reply('Pong!')
  }

  getSlashCommandBuilder(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
  }
}
