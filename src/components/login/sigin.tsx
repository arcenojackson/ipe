import { submitSignin } from '@/actions/login'
import Logo from '@/app/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  setLoginType: Dispatch<SetStateAction<'signin' | 'signup'>>
}

export function SignIn({ setLoginType }: Props) {
  const { toast } = useToast()
  const [isPending, setIsPending] = useState(false)

  const onSubmit = async (formData: FormData) => {
    try {
      const result = await submitSignin(formData)
      if (!result) return
      toast({
        title: 'Login',
        description: result,
        variant: 'destructive'
      })
    } catch (error) {
      console.log(error)
      toast({
        title: 'Login',
        description: 'Falhar ao realizar o login',
        variant: 'destructive'
      })
    }
    setIsPending(false)
  }

  return (
    <>
      <form
        action={onSubmit}
        onSubmit={() => setIsPending(true)}
        className="flex flex-col max-w-[400px] w-full items-center justify-center gap-8 p-8 border rounded-xl bg-slate-500"
      >
        <Image alt="Logo da igreja presbiteriana do estreito" src={Logo} height={150} />
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          className="p-8 text-slate-100 placeholder:text-slate-100"
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          className="p-8 text-slate-100 placeholder:text-slate-100"
        />
        <Button
          title="Signin"
          disabled={isPending}
          isLoading={isPending}
          className="w-full p-6 hover:bg-slate-700 touch-manipulation"
        >
          Entrar
        </Button>
        <Button
          title="Signup"
          variant="link"
          disabled={isPending}
          className="mt-2 text-slate-300"
          onClick={() => setLoginType('signup')}
        >
          Criar conta
        </Button>
      </form>
    </>
  )
}
