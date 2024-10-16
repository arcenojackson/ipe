import { Dispatch, SetStateAction } from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

type TonesProps = {
  tone: string | null
  setTone: (value: string) => void
  minorTone: boolean
}

export function Tones({ tone, setTone, minorTone }: TonesProps) {
  return (
    <ToggleGroup
      type="single"
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
      value={tone!}
      defaultValue="0"
      onValueChange={(value) => setTone(value)}
    >
      <ToggleGroupItem value="0" aria-label="Toggle 0">
        A{minorTone && 'm'}
      </ToggleGroupItem>
      <ToggleGroupItem value="1" aria-label="Toggle 1">
        A#{minorTone && 'm'}
      </ToggleGroupItem>
      <ToggleGroupItem value="2" aria-label="Toggle 2">
        B{minorTone && 'm'}
      </ToggleGroupItem>
      <ToggleGroupItem value="3" aria-label="Toggle 3">
        C{minorTone && 'm'}
      </ToggleGroupItem>
      <ToggleGroupItem value="4" aria-label="Toggle 4">
        C#{minorTone && 'm'}
      </ToggleGroupItem>
      <ToggleGroupItem value="5" aria-label="Toggle 5">
        D{minorTone && 'm'}
      </ToggleGroupItem>
      <ToggleGroupItem value="6" aria-label="Toggle 6">
        D#{minorTone && 'm'}
      </ToggleGroupItem>
      <ToggleGroupItem value="7" aria-label="Toggle 7">
        E{minorTone && 'm'}
      </ToggleGroupItem>
      <ToggleGroupItem value="8" aria-label="Toggle 8">
        F{minorTone && 'm'}
      </ToggleGroupItem>
      <ToggleGroupItem value="9" aria-label="Toggle 9">
        F#{minorTone && 'm'}
      </ToggleGroupItem>
      <ToggleGroupItem value="10" aria-label="Toggle 10">
        G{minorTone && 'm'}
      </ToggleGroupItem>
      <ToggleGroupItem value="11" aria-label="Toggle 11">
        G#{minorTone && 'm'}
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
