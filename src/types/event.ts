export type Event = {
  id?: string
  name: string
  date: Date
  start: string
}

export type EventSteps = {
  title: string
  description?: string
  duration?: number
  type: 'step' | 'music'
  musicId?: string
  musicTone?: string
}
