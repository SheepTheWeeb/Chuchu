import { Stats } from './tamagotchi.type'

export interface TamagotchiService {
  restart(): boolean

  feed(): boolean
  toggleLights(): void
  play(): boolean
  cure(): boolean

  shower(): boolean
  stats(): Stats
  talk(): boolean
}
