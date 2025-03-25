import { DatabaseGateway } from '../../models/database-gateway.type'
import { TamagotchiError } from '../../models/errors/tamagotchi-error'
import { resetValues } from '../../utils/tamagotchi-reset-values.const'
import { HealthState } from '../../utils/tamagotchi.const'

export async function restart(
  owner: string,
  name: string,
  databaseGateway: DatabaseGateway,
) {
  const tamagotchi = await databaseGateway.getTamagotchiByOwner(owner)
  if (!tamagotchi || tamagotchi.health === HealthState.Dead) {
    return await createNew(owner, name, databaseGateway)
  }
  throw new TamagotchiError({
    name: 'CREATE_EXISTS_ERROR',
    message: 'You already have a tamagotchi.',
  })
}

async function createNew(
  owner: string,
  name: string,
  databaseGateway: DatabaseGateway,
) {
  // clone reset values
  const newTamagotchi = structuredClone(resetValues)
  newTamagotchi.owner = owner
  newTamagotchi.name = name
  newTamagotchi.createdAt = `${Date.now()}`
  const objectId = await databaseGateway.createTamagotchi(newTamagotchi)
  console.info(`Tamagotchi created with id [${objectId}]!`)
  return await databaseGateway.getTamagotchiById(objectId)
}
