import { ObjectId } from 'mongodb'
import { Tamagotchi } from './tamagotchi.type'

export interface DatabaseGateway {
  dbName: string
  init(
    dbName: string,
    tamagotchiCollectionName: string,
    connectionString: string,
  ): void
  getTamagotchis(): Promise<Tamagotchi[]>
  getTamagotchisByOwner(owner: string): Promise<Tamagotchi[]>
  getTamagotchiById(id: ObjectId): Promise<Tamagotchi>
  getTamagotchiByOwner(owner: string): Promise<Tamagotchi>
  createTamagotchi(tamagotchi: Tamagotchi): Promise<ObjectId>
  updateTamagotchi(id: ObjectId, tamagotchi: Tamagotchi): Promise<ObjectId>
  deleteTamagotchi(id: ObjectId): Promise<boolean>
}
