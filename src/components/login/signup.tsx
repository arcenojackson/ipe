import { Dispatch, SetStateAction, useState } from 'react'
import { submitSignup } from '@/actions/login'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  setLoginType: Dispatch<SetStateAction<'signin' | 'signup'>>
}

export function SignUp({ setLoginType }: Props) {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (formData: FormData) => {
    setIsPending(true);
    const result = await submitSignup(formData);
    setError(result)
    setIsPending(false);
  }


  return (
    <>
      <form
        action={onSubmit}
        className="flex flex-col max-w-96 items-center justify-center gap-8 p-8 border rounded-xl bg-slate-500"
      >
        <h1 className="text-2xl text-slate-100 font-extrabold">IPE</h1>
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
      {error && <span className='text-red-500 text-lg font-bold'>{error}</span>}
    </>
  )
}
