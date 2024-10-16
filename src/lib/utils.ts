import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTone = (value: string) => tones[value]

const tones: any = {
  '0': 'A',
  '1': 'A#',
  '2': 'B',
  '3': 'C',
  '4': 'C#',
  '5': 'D',
  '6': 'D#',
  '7': 'E',
  '8': 'F',
  '9': 'F#',
  '10': 'G',
  '11': 'G#'
}
