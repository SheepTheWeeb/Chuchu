import { Tamagotchi } from '../models/tamagotchi.type'
import { LifeStage, TamagotchiType } from './tamagotchi.const'

export function convertNumberToHearts(value: number): string {
  const maxHearts = 4
  let hearts = ''
  for (let i = 0; i < maxHearts; i++) {
    if (i < value) {
      hearts += '❤️'
    } else {
      hearts += '🖤'
    }
  }
  return hearts
}

export function convertNumberToPoo(value: number): string {
  if (value === 0) {
    return '✨'
  }

  const maxPoo = 5
  let poo = ''
  for (let i = 0; i < maxPoo; i++) {
    if (i < value) {
      poo += '💩'
    }
  }
  return poo
}

export function getTamagotchiImage(tamagotchi: Tamagotchi): string {
  const path = './src/app/resources/tamagotchi/'
  if (!tamagotchi.sleep.lights) {
    return path + 'lights-off.png'
  }

  let tamagotchiImage = 'egg1.png'
  switch (tamagotchi.lifeStage) {
    case LifeStage.Egg:
      tamagotchiImage = getTamagotchiEggImage(tamagotchi)
      break
    case LifeStage.Baby:
      tamagotchiImage = ''
      break
    case LifeStage.Toddler:
      tamagotchiImage = ''
      break
    case LifeStage.Child:
      tamagotchiImage = tamagotchi.type === TamagotchiType.Normal ? '' : ''
      break
    case LifeStage.Adult:
      tamagotchiImage = getTamagotchiAdultImage(tamagotchi)
      break
  }
  return path + tamagotchiImage
}

export function getTamagotchiEggImage(tamagotchi: Tamagotchi): string {
  let tamagotchiImage = ''
  switch (tamagotchi.type) {
    case TamagotchiType.Fit:
      tamagotchiImage = 'egg1.png'
      break
    case TamagotchiType.Normal:
      tamagotchiImage = 'egg2.png'
      break
    case TamagotchiType.NightOwl:
      tamagotchiImage = 'egg3.png'
      break
    case TamagotchiType.Fat:
      tamagotchiImage = 'egg4.png'
      break
    default:
  }
  return tamagotchiImage
}

export function getTamagotchiAdultImage(tamagotchi: Tamagotchi): string {
  let tamagotchiImage = ''
  switch (tamagotchi.type) {
    case TamagotchiType.Fit:
      break
    case TamagotchiType.Normal:
      break
    case TamagotchiType.NightOwl:
      break
    case TamagotchiType.Fat:
      break
    case TamagotchiType.Ill:
      break
    case TamagotchiType.Lazy:
      break
  }
  return tamagotchiImage
}

export function getRandomType() {
  const types = [
    TamagotchiType.Fit,
    TamagotchiType.Normal,
    TamagotchiType.NightOwl,
    TamagotchiType.Fat,
  ]
  return types[Math.floor(Math.random() * types.length)]
}
