import { DatabaseGateway } from '../../models/database-gateway.type'
import { TamagotchiError } from '../../models/errors/tamagotchi-error'
import { Tamagotchi } from '../../models/tamagotchi.type'

export async function stats(
  owner: string,
  databaseGateway: DatabaseGateway,
): Promise<Tamagotchi> {
  const tamagotchi = await databaseGateway.getTamagotchiByOwner(owner)
  if (!tamagotchi) {
    throw new TamagotchiError({
      name: 'GET_NOT_FOUND',
      message: 'Tamagotchi not found, please use /restart to create one',
    })
  }

  console.info(`Stats fetched for tamagotchi with id: [${tamagotchi._id}]`)
  return tamagotchi
}
