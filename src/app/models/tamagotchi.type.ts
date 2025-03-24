import { ObjectId } from 'mongodb'
import {
  HealthState,
  LifeStage,
  TamagotchiType,
} from '../utils/tamagotchi.const'

export type Tamagotchi = {
  _id?: ObjectId
  owner: string
  name: string
  activity: string

  stats: Stats
  lifeStage: LifeStage
  type: TamagotchiType
  health: HealthState
  sleep: Sleep
  wantsAttention: boolean
}

export type Stats = {
  hunger: number // 0 = hungry, 4 = full
  happiness: number // 0 = depressed, 4 = happy
  dirty: number // 0 = clean, 5 = filthy
  discipline: number
  age: number // age in days
  weight: number // weight in oz
}

export type Sleep = {
  asleep: boolean
  lights: boolean
}

// TODO: different type of tamagotchi
