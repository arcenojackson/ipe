import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, ThumbsDown, ThumbsUp } from 'lucide-react'

export function Agenda() {
  return (
    <section className="w-full p-4">
      <h3 className="text-xl font-bold">AGENDA</h3>
      <div className="w-full h-[500px] p-4 flex flex-col gap-4 mt-4 rounded-lg bg-slate-700 overflow-y-scroll">
        <Card>
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
    </section>
  )
}
