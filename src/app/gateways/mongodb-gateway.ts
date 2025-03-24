import { Collection, MongoClient, ObjectId } from 'mongodb'
import { DatabaseGateway } from '../models/database-gateway.type'
import { Tamagotchi } from '../models/tamagotchi.type'

export class MongoDBGatewayImpl implements DatabaseGateway {
  dbName: string
  tamagotchiCollectionName: string
  client: MongoClient
  collections: { tamagotchis?: Collection<Tamagotchi> }

  init(
    dbName: string,
    tamagotchiCollectionName: string,
    connectionString: string,
  ) {
    this.dbName = dbName
    this.tamagotchiCollectionName = tamagotchiCollectionName
    this.client = new MongoClient(connectionString)
    this.collections = {}
  }

  private async connect(): Promise<void> {
    await this.client.connect()
    const database = this.client.db(this.dbName)
    const tamagotchiCollection = database.collection<Tamagotchi>(
      this.tamagotchiCollectionName,
    )
    this.collections.tamagotchis = tamagotchiCollection
    console.debug(
      `Successfully connected to database: ${database.databaseName} and collection: ${tamagotchiCollection.collectionName}`,
    )
  }

  async getTamagotchis(): Promise<Tamagotchi[]> {
    let tamagotchis: Tamagotchi[] = []
    try {
      await this.connect()
      tamagotchis = await this.collections.tamagotchis.find({}).toArray()
    } finally {
      await this.client.close()
    }
    return tamagotchis
  }

  async getTamagotchisByOwner(owner: string): Promise<Tamagotchi[]> {
    let tamagotchis: Tamagotchi[] = []
    try {
      await this.connect()
      tamagotchis = await this.collections.tamagotchis.find({ owner }).toArray()
    } finally {
      await this.client.close()
    }
    return tamagotchis
  }

  async getTamagotchiById(id: ObjectId): Promise<Tamagotchi> {
    let tamagotchi: Tamagotchi
    try {
      await this.connect()
      tamagotchi = await this.collections.tamagotchis.findOne<Tamagotchi>({
        _id: id,
      })
    } finally {
      await this.client.close()
    }
    return tamagotchi
  }

  // TODO: only get most recent one
  async getTamagotchiByOwner(owner: string): Promise<Tamagotchi> {
    let tamagotchi: Tamagotchi
    try {
      await this.connect()
      tamagotchi = await this.collections.tamagotchis.findOne<Tamagotchi>({
        owner,
      })
    } finally {
      await this.client.close()
    }
    return tamagotchi
  }

  async createTamagotchi(tamagotchi: Tamagotchi): Promise<ObjectId> {
    let createdId: ObjectId
    try {
      await this.connect()
      const result = await this.collections.tamagotchis.insertOne(tamagotchi)
      if (result) {
        createdId = result.insertedId
      }
    } finally {
      await this.client.close()
    }
    return createdId
  }

  async updateTamagotchi(
    id: ObjectId,
    tamagotchi: Tamagotchi,
  ): Promise<ObjectId> {
    let updatedId: ObjectId
    try {
      await this.connect()
      const result = await this.collections.tamagotchis.updateOne(
        { _id: id },
        { $set: tamagotchi },
      )
      if (result) {
        updatedId = result.upsertedId
      }
    } finally {
      await this.client.close()
    }
    return updatedId
  }

  async deleteTamagotchi(id: ObjectId): Promise<boolean> {
    let deleted = false
    try {
      await this.connect()
      const result = await this.collections.tamagotchis.deleteOne({ _id: id })
      deleted = !!result?.deletedCount
    } finally {
      await this.client.close()
    }
    return deleted
  }
}
