import { TamagotchiService } from '../models/tamagotchi-service.type'
import { Stats } from '../models/tamagotchi.type'

export class TamagotchiServiceImpl implements TamagotchiService {
  restart(): boolean {
    throw new Error('Method not implemented.')
  }
  feed(): boolean {
    throw new Error('Method not implemented.')
  }
  toggleLights(): boolean {
    throw new Error('Method not implemented.')
  }
  play(): boolean {
    throw new Error('Method not implemented.')
  }
  cure(): boolean {
    throw new Error('Method not implemented.')
  }
  shower(): boolean {
    throw new Error('Method not implemented.')
  }
  stats(): Stats {
    throw new Error('Method not implemented.')
  }
  talk(): boolean {
    throw new Error('Method not implemented.')
  }
}
