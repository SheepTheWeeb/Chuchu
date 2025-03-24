import { BotCommand } from './bot-command.type'

export interface CommandService {
  commands: BotCommand[]
  get(commandName: string): BotCommand | undefined
}
