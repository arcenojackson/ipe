'use client'

import Logo from '@/app/assets/logo.png'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCookies } from 'next-client-cookies'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const signInFormSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(8, { message: 'Senha deve ter 8 dígitos ou mais' })
})

const signUpFormSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(8, { message: 'Senha deve ter 8 dígitos ou mais' }),
  confirmPass: z.string().min(8, { message: 'Senha deve ter 8 dígitos ou mais' })
})

export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const cookies = useCookies()
  const { replace } = useRouter()
  const { toast } = useToast()
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPass: ''
    }
  })

  async function onSubmitSignIn(values: z.infer<typeof signInFormSchema>) {
    setIsLoading(true)
    try {
      const user = {
        id: '',
        name: '',
        email: values.email,
        is_admin: false
      }
      const password = values.password
      const response = await fetch(`/api/signin`, {
        method: 'POST',
        body: JSON.stringify({ email: user.email, password })
      })
      const result = await response.json()
      if (response.status !== 200) throw new Error(result.message)
      user.id = result.user.id
      user.name = result.user.name
      user.is_admin = result.user.is_admin
      cookies.set('user', JSON.stringify(user))
      replace('/home/agenda')
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Login',
        description: 'Falha na tentiva de login',
        variant: 'destructive'
      })
    }
  }

  async function onSubmitSignUp(values: z.infer<typeof signUpFormSchema>) {
    try {
      setIsLoading(true)
      const user = {
        id: '',
        name: values.name,
        email: values.email
      }
      const password = values.password
      const confirmPass = values.confirmPass
      if (password !== confirmPass) {
        toast({
          title: 'Login',
          description: 'As senhas informadas são diferentes',
          variant: 'destructive'
        })
        setIsLoading(false)
        return
      }
      const response = await fetch(`/api/signup`, {
        method: 'POST',
        body: JSON.stringify({ name: user.name, email: user.email, password })
      })
      const result = await response.json()
      if (response.status !== 200) throw new Error(result.message)
      user.id = result.user.id
      cookies.set('user', JSON.stringify(user))
      replace('/home/agenda')
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Login',
        description: 'Falha na tentiva da criação de conta',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="w-full flex flex-col h-[550px] items-center py-4 rounded-xl bg-slate-600">
      <Image alt="Logo da igreja presbiteriana do estreito" src={Logo} height={150} />
      <Tabs defaultValue="signin">
        <TabsList className="grid grid-cols-2 my-4 bg-slate-800 text-slate-100">
          <TabsTrigger value="signin">Entrar</TabsTrigger>
          <TabsTrigger value="signup">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Form {...signInForm}>
            <form
              onSubmit={signInForm.handleSubmit(onSubmitSignIn)}
              className="flex flex-col items-center justify-center gap-4 py-4 border-t border-b overflow-scroll"
            >
              <FormField
                control={signInForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Digite seu e-mail"
                        {...field}
                        value={field.value!}
                        className="placeholder:text-slate-100 text-slate-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                        value={field.value!}
                        className="placeholder:text-slate-100 text-slate-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-4"
                variant="primary"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Entrar
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="signup">
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSubmitSignUp)}
              className="flex flex-col items-center justify-center gap-4 py-4 border-t border-b overflow-scroll"
            >
              <FormField
                control={signUpForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome"
                        {...field}
                        value={field.value!}
                        className="placeholder:text-slate-100 text-slate-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite seu e-mail"
                        {...field}
                        value={field.value!}
                        className="placeholder:text-slate-100 text-slate-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Crie uma senha"
                        {...field}
                        value={field.value!}
                        className="placeholder:text-slate-100 text-slate-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="confirmPass"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme sua senha"
                        {...field}
                        value={field.value!}
                        className="placeholder:text-slate-100 text-slate-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-4"
                variant="primary"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Criar conta
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
