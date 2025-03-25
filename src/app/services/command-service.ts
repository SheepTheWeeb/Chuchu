import { CommandService } from '../models/command-service.type'
import { BotCommand } from '../models/bot-command.type'
import { PingCommand } from '../commands/ping-command'
import { RestartCommand } from '../commands/restart-command'
import { DatabaseGateway } from '../models/database-gateway.type'
import { StatsCommand } from '../commands/stats-command'

export class CommandServiceImpl implements CommandService {
  commands: BotCommand[]

  constructor(databaseGateway: DatabaseGateway) {
    const commands = [
      new PingCommand(),
      new RestartCommand(databaseGateway),
      new StatsCommand(databaseGateway),
    ]
    this.commands = commands
  }

  get(commandName: string): BotCommand | undefined {
    return this.commands.find(e => e.name === commandName)
  }
}
