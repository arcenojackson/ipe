import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-slate-800">
      <div className="flex flex-col max-w-96 items-center justify-center gap-8 p-8 border rounded-xl bg-slate-500">
        <h1 className="text-2xl text-slate-100 font-extrabold">IPE</h1>
        <Input type="email" placeholder="Digite seu e-mail" className="p-8 text-slate-100 placeholder:text-slate-100" />
        <Input type="password" placeholder="Digite sua senha" className="p-8 text-slate-100 placeholder:text-slate-100" />
        <Button title="Entrar" className="p-6 hover:bg-slate-700 touch-manipulation">
          Entrar
        </Button>
      </div>
    </main>
  )
}
