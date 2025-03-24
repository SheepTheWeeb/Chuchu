import { DatabaseGateway } from '../../models/database-gateway.type'
import { Tamagotchi } from '../../models/tamagotchi.type'
import {
  HealthState,
  LifeStage,
  TamagotchiType,
} from '../../utils/tamagotchi.const'

const resetValues: Tamagotchi = {
  owner: '',
  name: '',
  activity: 'Just hanging around...',
  stats: {
    hunger: 0,
    happiness: 0,
    dirty: 0,
    discipline: 0,
    age: 0,
    weight: 0,
  },
  lifeStage: LifeStage.Egg,
  type: TamagotchiType.Normal,
  health: HealthState.Healthy,
  sleep: {
    asleep: false,
    lights: false,
  },
  wantsAttention: false,
}

export async function restart(
  owner: string,
  name: string,
  databaseGateway: DatabaseGateway,
) {
  let tamagotchi = await databaseGateway.getTamagotchiByOwner(owner)
  if (!tamagotchi || tamagotchi.health === HealthState.Dead) {
    const newTamagotchi = structuredClone(resetValues)
    newTamagotchi.owner = owner
    newTamagotchi.name = name
    const objectId = await databaseGateway.createTamagotchi(newTamagotchi)
    tamagotchi = await databaseGateway.getTamagotchiById(objectId)
  }
  console.log(tamagotchi)
  return tamagotchi
}
