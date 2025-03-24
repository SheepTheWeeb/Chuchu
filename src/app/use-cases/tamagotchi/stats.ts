import { Stats } from '../../models/tamagotchi.type'

export function stats(): Stats {
  return {
    hunger: 0,
    happiness: 0,
    dirty: 0,
    discipline: 0,
    age: 0,
    weight: 0,
  }
}
