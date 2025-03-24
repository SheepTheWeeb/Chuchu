import { MongoClient } from 'mongodb'
import { DatabaseGateway } from '../models/database-gateway.type'
import { Tamagotchi } from '../models/tamagotchi.type'

export class MongoDBGatewayImpl implements DatabaseGateway {
  dbName: string
  tamagotchiCollectionName: string
  client: MongoClient

  init(
    dbName: string,
    tamagotchiCollectionName: string,
    connectionString: string,
  ) {
    this.dbName = dbName
    this.tamagotchiCollectionName = tamagotchiCollectionName
    this.client = new MongoClient(connectionString)
  }

  async getTamagotchiByOwner(owner: string): Promise<Tamagotchi> {
    let tamagotchi: Tamagotchi
    try {
      const database = this.client.db(this.dbName)
      const tamagotchis = database.collection<Tamagotchi>(
        this.tamagotchiCollectionName,
      )
      tamagotchi = await tamagotchis.findOne<Tamagotchi>({ owner })
    } finally {
      await this.client.close()
    }
    return tamagotchi
  }
}
