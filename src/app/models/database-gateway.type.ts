import { Tamagotchi } from './tamagotchi.type'

export interface DatabaseGateway {
  dbName: string
  init(
    dbName: string,
    tamagotchiCollectionName: string,
    connectionString: string,
  ): void
  getTamagotchiByOwner(owner: string): Promise<Tamagotchi>
}
