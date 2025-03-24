import { CommandService } from '../models/command-service.type'
import { BotCommand } from '../models/bot-command.type'
import { PingCommand } from '../commands/ping-command'

export class CommandServiceImpl implements CommandService {
  commands: BotCommand[]

  constructor() {
    const commands = [new PingCommand()]
    this.commands = commands
  }

  get(commandName: string): BotCommand | undefined {
    return this.commands.find(e => e.name === commandName)
  }
}
