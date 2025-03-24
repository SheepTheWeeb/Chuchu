import { CacheType, Interaction } from 'discord.js'
import { BotCommand } from '../models/bot-command.type'
import { CommandService } from '../models/command-service.type'

export async function handleMessage(
  message: Interaction<CacheType>,
  commandService: CommandService,
) {
  if (!message.isChatInputCommand()) return

  const command: BotCommand | undefined = commandService.get(
    message.commandName,
  )
  if (command) {
    await command.execute(message)
  }
}
