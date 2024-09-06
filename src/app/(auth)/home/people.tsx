import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trash2, User2 } from 'lucide-react'

export function People() {
  return (
    <section className="w-full p-4">
      <h3 className="text-xl font-bold">PESSOAS</h3>
      <div className="w-full h-[500px] p-4 flex flex-col gap-4 mt-4 rounded-lg bg-slate-700 overflow-y-scroll">
        <Card height="h-24">
          <Card.Icon bgColor="bg-purple-800">
            <User2 size={28} color="white" />
          </Card.Icon>
          <Card.Content>
            <span>Jackson Arceno</span>
          </Card.Content>
          <Card.Actions>
            <Button variant="ghost">
              <Trash2 size={30} color="red" />
            </Button>
          </Card.Actions>
        </Card>
      </div>
    </section>
  )
}
