import { Interaction, CacheType } from 'discord.js'
import { BotCommand } from '../models/bot-command.type'
import { restart } from '../use-cases/tamagotchi/restart'
import { DatabaseGateway } from '../models/database-gateway.type'

export class RestartCommand implements BotCommand {
  name: string
  description: string
  databaseGateway: DatabaseGateway

  constructor(databaseGateway: DatabaseGateway) {
    this.name = 'restart'
    this.description = 'Get Tamagotchi egg.'
    this.databaseGateway = databaseGateway
  }

  async execute(message: Interaction<CacheType>): Promise<void> {
    console.log('restart command executing...')
    // TODO: Message handling

    try {
      await restart(message.user.username, 'Henk Bosman', this.databaseGateway)
    } catch (error) {
      console.error(error)
    }
  }
}
