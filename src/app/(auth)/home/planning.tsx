import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Edit, Trash2 } from 'lucide-react'

export function Planning() {
  return (
    <section className="w-full p-4">
      <h3 className="text-xl font-bold">PLANEJAR</h3>
      <div className="w-full h-[500px] p-4 flex flex-col gap-4 mt-4 rounded-lg bg-slate-700 overflow-y-scroll">
        <Card>
          <Card.Icon>
            <Calendar size={28} color="white" fill="white" />
          </Card.Icon>
          <Card.Content>
            <span>Culto 08/09</span>
            <span></span>
            <span className="text-xs text-slate-300">19:25h 08/09/2024</span>
          </Card.Content>
          <Card.Actions>
            <Button variant="ghost">
              <Edit size={30} color="white" />
            </Button>
            <Button variant="ghost">
              <Trash2 size={30} color="red" />
            </Button>
          </Card.Actions>
        </Card>
      </div>
    </section>
  )
}
