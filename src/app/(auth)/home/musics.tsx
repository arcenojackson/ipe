import { Music as MusicComponent } from '@/components/music'
import { MusicEdit } from '@/components/music/edit'
import { MusicView } from '@/components/music/view'
import { Playing } from '@/components/playing'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Music } from '@/types/music'
import { Edit, Music as MusicIcon, PlusCircle, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Musics() {
  const [musics, setMusics] = useState<Music[]>([])

  useEffect(() => {
    ;(async () => await loadData())()
  }, [])

  async function loadData() {
    try {
      const response = await fetch('/api/musics')
      const result = await response.json()
      setMusics(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteMusic(id: string) {
    await fetch(`/api/musics/${id}`, { method: 'DELETE' })
    await loadData()
  }

  return (
    <section className="w-full flex flex-col gap-4 p-4">
      <h3 className="text-xl font-bold">MÚSICAS</h3>
      <div className="w-full h-[500px] p-4 flex flex-col gap-4 rounded-lg bg-slate-700 overflow-y-scroll">
        {musics.map((music) => (
          <Dialog key={music.id}>
            <DialogTrigger className="flex items-center justify-center">
              <Card height="h-24">
                <Card.Icon bgColor="bg-purple-800">
                  <MusicIcon size={28} color="white" />
                </Card.Icon>
                <Card.Content>
                  <span>{music.title}</span>
                  <span></span>
                  <span className="text-xs text-slate-300">{music.artist}</span>
                </Card.Content>
                <Card.Actions>
                  <Button variant="ghost" onClick={() => deleteMusic(music.id!)}>
                    <Trash2 size={30} color="red" />
                  </Button>
                </Card.Actions>
              </Card>
            </DialogTrigger>
            <DialogContent className="rounded-xl">
              <DialogHeader>
                <DialogTitle>{music.title}</DialogTitle>
                <DialogDescription>{music.artist}</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="view">
                <TabsList className="w-full">
                  <TabsTrigger value="view">Visualizar</TabsTrigger>
                  <TabsTrigger value="edit">Editar</TabsTrigger>
                </TabsList>
                <TabsContent value="view">
                  <MusicView id={music.id} />
                </TabsContent>
                <TabsContent value="edit">
                  <MusicEdit id={music.id} loadData={loadData} />
                </TabsContent>
              </Tabs>
              <DialogFooter></DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <Dialog>
        <DialogTrigger>
          <div className="w-full h-12 flex items-center justify-center bg-slate-950 rounded-lg text-slate-200">
            <PlusCircle className="mr-4" />
            Adicionar música
          </div>
        </DialogTrigger>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Nova música</DialogTitle>
          </DialogHeader>
          <MusicComponent loadData={loadData} />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
