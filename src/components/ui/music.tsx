import { getMusic } from '@/actions/music'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './form'
import { Input } from './input'
import { Textarea } from './textarea'

const formSchema = z.object({
  title: z.string().min(2),
  artist: z.string().min(2),
  obs: z.string().nullable().optional(),
  ytUrl: z.string().nullable(),
  cipher: z.string(),
  lyrics: z.string().nullable().optional(),
  bpm: z.number().nullable().optional(),
  tempo: z.string().nullable().optional(),
  tone: z.string()
})

type MusicProps = {
  id?: string
}

export function Music({ id }: MusicProps) {
  const [currentMusic, setCurrentMusic] = useState(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tempo: '4/4'
    }
  })

  useEffect(() => {
    if (!id) return
    ;(async () => {
      await getMusic(id)
      form.setValue('artist', 'Teste')
    })()
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
          name="ytUrl"
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
        <Button type="submit" className="w-full">
          Salvar música
        </Button>
      </form>
    </Form>
  )
}
