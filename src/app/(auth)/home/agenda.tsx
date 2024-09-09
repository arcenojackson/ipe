import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, ThumbsDown, ThumbsUp } from 'lucide-react'

export function Agenda() {
  return (
    <div className="flex flex-col flex-1 gap-4 p-4 overflow-y-scroll">
      <Card bgColor="bg-slate-800">
        <Card.Icon>
          <Calendar size={28} color="white" />
        </Card.Icon>
        <Card.Content>
          <span>Culto 08/09</span>
          <span className="text-sm">Guitarra - Louvor</span>
          <span className="text-xs text-slate-300">19:25h 08/09/2024</span>
        </Card.Content>
        <Card.Actions>
          <Button variant="ghost">
            <ThumbsUp size={30} color="#1ff702" />
          </Button>
          <Button variant="ghost">
            <ThumbsDown size={30} color="red" />
          </Button>
        </Card.Actions>
      </Card>
    </div>
  )
}
