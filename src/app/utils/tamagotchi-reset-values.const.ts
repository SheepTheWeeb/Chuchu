import { Tamagotchi } from '../models/tamagotchi.type'
import { LifeStage, TamagotchiType, HealthState } from './tamagotchi.const'

export const resetValues: Tamagotchi = {
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
  createdAt: '',
}
