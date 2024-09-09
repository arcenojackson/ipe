import { submitSignup } from '@/actions/login'
import Logo from '@/app/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  setLoginType: Dispatch<SetStateAction<'signin' | 'signup'>>
}

export function SignUp({ setLoginType }: Props) {
  const { toast } = useToast()
  const [isPending, setIsPending] = useState(false)

  const onSubmit = async (formData: FormData) => {
    try {
      setIsPending(true)
      const result = await submitSignup(formData)
      if (!result) return
      toast({
        title: 'Cadastro',
        description: result,
        variant: 'destructive'
      })
    } catch (error) {
      console.log(error)
      toast({
        title: 'Cadastro',
        description: 'Falhar ao criar conta',
        variant: 'destructive'
      })
    }
    setIsPending(false)
  }

  return (
    <>
      <form
        action={onSubmit}
        className="flex flex-col max-w-[400px] w-full items-center justify-center gap-8 p-8 border rounded-xl bg-slate-500"
      >
        <Image alt="Logo da igreja presbiteriana do estreito" src={Logo} height={150} />
        <Input
          type="text"
          name="name"
          placeholder="Informe seu nome"
          className="p-8 text-slate-100 placeholder:text-slate-100"
        />
        <Input
          type="email"
          name="email"
          placeholder="Informe seu e-mail"
          className="p-8 text-slate-100 placeholder:text-slate-100"
        />
        <Input
          type="password"
          name="password"
          placeholder="Crie uma senha"
          className="p-8 text-slate-100 placeholder:text-slate-100"
        />
        <Input
          type="password"
          name="confirmPass"
          placeholder="Confirme sua senha"
          className="p-8 text-slate-100 placeholder:text-slate-100"
        />
        <Button
          title="Signup"
          disabled={isPending}
          isLoading={isPending}
          className="w-full p-6 hover:bg-slate-700 touch-manipulation"
        >
          Criar conta
        </Button>
        <Button
          title="Signin"
          variant="link"
          disabled={isPending}
          className="mt-2 text-slate-300"
          onClick={() => setLoginType('signin')}
        >
          Entrar
        </Button>
      </form>
    </>
  )
}
