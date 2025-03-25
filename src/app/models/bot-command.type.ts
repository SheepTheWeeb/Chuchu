import {
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  ChatInputCommandInteraction,
} from 'discord.js'

export interface BotCommand {
  name: string
  description: string
  execute(message: ChatInputCommandInteraction): Promise<void>
  getSlashCommandBuilder(): SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
}
