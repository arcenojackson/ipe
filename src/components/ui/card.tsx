import { ReactNode } from "react";

type CardProps = {
  children: ReactNode
  height?: string
}

type IconProps = {
  children: ReactNode
  bgColor?: string
}

function Card({ children, height = 'h-32' }: CardProps) {
  return (
    <div className={`w-full ${height} p-4 flex border rounded-lg cursor-pointer`}>
      {children}
    </div>
  );
}

Card.Icon = ({ children, bgColor = 'bg-emerald-600' }: IconProps) => {
  return (
    <div className={`flex items-center justify-center p-4 rounded ${bgColor}`}>
      { children }
    </div>
  );
}

Card.Content = function ({ children }: CardProps) {
  return (
    <div className="flex flex-1 flex-col px-2 justify-center gap-2 text-slate-50">
      {children}
    </div>
  );
}

Card.Actions = function ({ children }: CardProps) {
  return (
    <div className="flex flex-col justify-center gap-4">
      { children }
    </div>
  );
}

export { Card }
