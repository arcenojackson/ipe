import { Music as MusicComponent } from '@/components/music'
import { toast } from '@/hooks/use-toast'
import { Edit } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'

type PlayingProps = {
  id?: string
  loadData: () => Promise<void>
}

export function Playing({ id, loadData }: PlayingProps) {
  const [music, setMusic] = useState()

  useEffect(() => {
    if (!id) return
    ;(async () => {
      try {
        const response = await fetch(`/api/musics/${id}`)
        const result = await response.json()
        if (response.status !== 200) {
          toast({
            title: 'Música',
            description: result.message,
            duration: 3000,
            variant: 'destructive'
          })
          return
        }
        setMusic(result.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  if (!music) return

  return (
    <section className="w-full">
      <Dialog>
        <DialogTrigger className="flex items-center justify-center gap-4 p-2 rounded-lg text-slate-100 bg-slate-800">
          <Edit size={26} color="white" />
          Editar
        </DialogTrigger>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Editar música</DialogTitle>
          </DialogHeader>
          <MusicComponent id={id} loadData={loadData} />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
