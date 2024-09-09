import { MusicEdit } from '@/components/music/edit'
import { MusicView } from '@/components/music/view'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
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
import { Music as MusicIcon, PlusCircle, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Loading } from '@/components/ui/loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { Music } from '@/types/music'

export function Musics() {
  const [isLoading, setIsLoading] = useState(true)
  const [musics, setMusics] = useState<Music[]>([])
  const { toast } = useToast()

  useEffect(() => {
    ;(async () => await loadData())()
  }, [])

  async function loadData() {
    try {
      const response = await fetch('/api/musics')
      const result = await response.json()
      setMusics(result.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast({
        title: 'Músicas',
        description: 'Erro ao listar músicas',
        variant: 'destructive'
      })
    }
  }

  async function onDeleteMusic(id: string) {
    await fetch(`/api/musics/${id}`, { method: 'DELETE' })
    setIsLoading(true)
    await loadData()
  }

  return (
    <section className="w-full flex flex-col gap-4 p-4">
      <div className="w-full h-[500px] p-4 flex flex-col items-center gap-4 rounded-lg bg-slate-700 overflow-y-scroll">
        {isLoading && <Loading />}
        {musics.map((music) => (
          <Card height="h-24">
            <Dialog key={music.id}>
              <DialogTrigger className="w-full flex">
                <Card.Icon bgColor="bg-purple-800">
                  <MusicIcon size={28} color="white" />
                </Card.Icon>
                <Card.Content>
                  <span>{music.title}</span>
                  <span></span>
                  <span className="text-xs text-slate-300">{music.artist}</span>
                </Card.Content>
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
            <Card.Actions>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Trash2 size={30} color="red" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deseja mesmo excluir a múica?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não poderá ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDeleteMusic(music.id!)}>
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Card.Actions>
          </Card>
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
          <MusicEdit loadData={loadData} />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
