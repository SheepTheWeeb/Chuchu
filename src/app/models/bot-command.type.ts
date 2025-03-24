import { Interaction, CacheType } from 'discord.js'

export interface BotCommand {
  name: string
  description: string
  execute(message: Interaction<CacheType>): Promise<void>
}
