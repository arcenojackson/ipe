import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const formSchema = z.object({
  title: z.string().min(2),
  artist: z.string().min(2),
  obs: z.string().nullable().optional(),
  youtube: z.string().nullable(),
  cipher: z.string(),
  lyrics: z.string().nullable().optional(),
  bpm: z.string().nullable().optional(),
  tempo: z.string().nullable().optional(),
  tone: z.string()
})

type Fields =
  | 'title'
  | 'artist'
  | 'obs'
  | 'youtube'
  | 'cipher'
  | 'lyrics'
  | 'bpm'
  | 'tone'
  | 'tempo'

type MusicProps = {
  id?: string
  loadData: () => Promise<void>
}

export function Music({ id, loadData }: MusicProps) {
  const [isLoading, setIsLoading] = useState(false)
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
      tone: ''
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
      await loadData()
      return postSubmit('✓ Música editada com sucesso!')
    }
    await fetch('/api/musics', {
      method: 'POST',
      body: JSON.stringify(values)
    })
    await loadData()
    postSubmit('✓ Música adicionada com sucesso!')
  }

  function postSubmit(description: string) {
    toast({
      title: 'Música',
      description,
      variant: 'success',
      duration: 5000
    })
    form.reset()
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 h-[500px] border-t border-b overflow-x-scroll p-4"
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
        <FormField
          control={form.control}
          name="youtube"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Versão da músca</FormLabel>
              <FormControl>
                <Input placeholder="Link do vídeo" {...field} value={field.value!} />
              </FormControl>
              <FormDescription>Copie o link de um vídeo do Youtube e cole aqui</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tom</FormLabel>
              <FormControl>
                <Input placeholder="Tom principal" {...field} value={field.value!} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading} isLoading={isLoading}>
          Salvar música
        </Button>
      </form>
    </Form>
  )
}
