import { submitSignin } from '@/actions/login'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  setLoginType: Dispatch<SetStateAction<'signin' | 'signup'>>
}

export function SignIn({ setLoginType }: Props) {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (formData: FormData) => {
    setIsPending(true)
    const result = await submitSignin(formData)
    setError(result)
    setIsPending(false)
  }

  return (
    <>
      <form
        action={onSubmit}
        className="flex flex-col max-w-96 items-center justify-center gap-8 p-8 border rounded-xl bg-slate-500"
      >
        <h1 className="text-2xl text-slate-100 font-extrabold">IPE!</h1>
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
      {error && <span className="text-red-500 text-lg font-bold">{error}</span>}
    </>
  )
}
