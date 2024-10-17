import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { FontBoldIcon, FontItalicIcon } from '@radix-ui/react-icons'
import { Eraser, UnderlineIcon } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ScrollArea } from '../ui/scroll-area'
import { Switch } from '../ui/switch'
import { Textarea } from '../ui/textarea'
import { Tones } from './tones'

const formSchema = z.object({
  title: z.string().min(2),
  artist: z.string().min(2),
  obs: z.string().nullable().optional(),
  youtube: z.string().nullable(),
  cipher: z.string(),
  lyrics: z.string().nullable().optional(),
  bpm: z.string().nullable().optional(),
  tempo: z.string().nullable().optional(),
  tone: z.string(),
  minorTone: z.boolean()
})

type Fields =
  | 'title'
  | 'artist'
  | 'obs'
  | 'youtube'
  | 'cipher'
  | 'lyrics'
  | 'bpm'
  | 'tempo'
  | 'tone'
  | 'minor_tone'

type MusicProps = {
  id?: string
  loadData: () => Promise<void>
  closeModal?: () => void
}

export function MusicEdit({ id, loadData, closeModal }: MusicProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [tone, setTone] = useState<string | null>(null)
  const [minorTone, setMinorTone] = useState(false)
  const [youtubeSearch, setYoutubeSearch] = useState('')
  const [youtubeSearchModal, setYoutubeSearchModal] = useState(false)
  const [youtubeResults, setYoutubeResults] = useState<
    { id: string; image: string; title: string }[]
  >([])
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      artist: '',
      obs: '',
      youtube: '',
      cipher: '',
      lyrics: '',
      bpm: '0',
      tempo: '4/4',
      tone: '',
      minorTone: false
    }
  })

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
        const music = result.data
        for (const key in music) {
          const field: Fields = key as Fields
          setYoutubeSearch(`${music.title} - ${music.artist}`)
          if (field === 'tone') {
            setTone(music[field])
            form.setValue(field, String(music[field]))
            continue
          }
          if (field === 'minor_tone') {
            setMinorTone(music[field])
            form.setValue('minorTone', music[field])
            continue
          }
          if (field === 'bpm') {
            form.setValue(field, String(music[field]))
            continue
          }
          form.setValue(field, music[field])
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    if (id) {
      await fetch(`/api/musics/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values)
      })
      return postSubmit('✓ Música editada com sucesso!')
    }
    await fetch('/api/musics', {
      method: 'POST',
      body: JSON.stringify(values)
    })
    form.reset()
    if (closeModal) closeModal()
    return postSubmit('✓ Música adicionada com sucesso!')
  }

  async function postSubmit(description: string) {
    toast({
      title: 'Música',
      description,
      variant: 'success',
      duration: 5000
    })
    await loadData()
    setIsLoading(false)
  }

  async function loadYTVideos() {
    try {
      const response = await fetch(`/api/musics/search/youtube?q=${youtubeSearch}`)
      const result = await response.json()
      setYoutubeResults(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 h-[calc(100vh-300px)] border-t border-b overflow-x-scroll p-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Nome da música" {...field} value={field.value!} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artista</FormLabel>
              <FormControl>
                <Input placeholder="Nome do artista ou banda" {...field} value={field.value!} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="obs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Input placeholder="Adicione notas a música" {...field} value={field.value!} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Versão da música</FormLabel>
        <div className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-within:ring-1 focus-within:ring-ring">
          <input
            placeholder="Busque músicas ou banda/cantor..."
            value={youtubeSearch}
            onChange={(e) => setYoutubeSearch(e.target.value)}
            className="flex-1 focus-visible:outline-none"
          />
          <Eraser className="cursor-pointer" onClick={() => setYoutubeSearch('')} />
        </div>
        <Popover open={youtubeSearchModal} onOpenChange={setYoutubeSearchModal} modal={true}>
          <PopoverTrigger asChild>
            <Button className="-mt-2" variant="outline" onClick={loadYTVideos}>
              Buscar no Youtube
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[350px] h-[420px] flex flex-col gap-4 bg-slate-600 rounded-lg overflow-scroll">
            {youtubeResults.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg cursor-pointer"
                onClick={() => {
                  form.setValue('youtube', `https://www.youtube.com/embed/${item.id}`)
                  setYoutubeSearch(item.title)
                  setYoutubeSearchModal(false)
                  setYoutubeResults([])
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={150}
                  height={50}
                  className="rounded-lg"
                />
                <span className="w-60 text-center text-slate-50">{item.title}</span>
              </div>
            ))}
          </PopoverContent>
        </Popover>
        <FormField
          control={form.control}
          name="cipher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cifra</FormLabel>
              <FormControl>
                <Input placeholder="Link da cifra" {...field} value={field.value!} />
              </FormControl>
              <FormDescription>Copie o link da cifra da música e cole aqui</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lyrics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Letra</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione a letra da música"
                  {...field}
                  value={field.value!}
                  rows={10}
                />
              </FormControl>
              <FormDescription>Copie o link da cifra da música e cole aqui</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bpm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BPM</FormLabel>
              <FormControl>
                <Input placeholder="Batidas por minuto" {...field} value={field.value!} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tempo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempo</FormLabel>
              <FormControl>
                <Input placeholder="Assinatura da música" {...field} value={field.value!} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Tom</FormLabel>
        <Tones
          tone={tone}
          setTone={(value) => {
            setTone(value)
            form.setValue('tone', value)
          }}
          minorTone={minorTone}
        />
        <div className="flex gap-2 items-center">
          <Switch
            id="tone-minor"
            checked={minorTone}
            onCheckedChange={(checked) => {
              setMinorTone(checked)
              form.setValue('minorTone', checked)
            }}
          />
          <Label htmlFor="tone-minor">Tom menor?</Label>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading} isLoading={isLoading}>
          Salvar música
        </Button>
      </form>
    </Form>
  )
}
