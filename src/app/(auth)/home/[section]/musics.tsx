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
import { useCallback, useEffect, useState } from 'react'

import { Loading } from '@/components/ui/loading'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { Music } from '@/types/music'
import { Checkbox } from '@radix-ui/react-checkbox'

export function Musics() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [musics, setMusics] = useState<Music[]>([])
  const { toast } = useToast()

  useEffect(() => {
    ;(async () => await loadData())()
  }, [])

  const loadData = useCallback(async () => {
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
  }, [musics])

  async function onDeleteMusic(id: string) {
    await fetch(`/api/musics/${id}`, { method: 'DELETE' })
    setIsLoading(true)
    await loadData()
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-center gap-4 p-4 overflow-y-scroll">
        {isLoading && <Loading />}
        {musics.map((music) => (
          <Card height="h-24" bgColor="bg-slate-800">
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
                  <TabsList className="grid grid-cols-2">
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
      <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
        <SheetTrigger className="w-full flex gap-4 p-4">
          <div className="w-full h-12 flex items-center justify-center bg-slate-950 rounded-lg text-slate-200">
            <PlusCircle className="mr-4" />
            Adicionar música
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="flex flex-col gap-4 mx-4 py-10 rounded-t-lg">
          <SheetHeader>
            <SheetTitle>Nova música</SheetTitle>
          </SheetHeader>
          <MusicEdit loadData={loadData} closeModal={() => setIsAddOpen(false)} />
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
