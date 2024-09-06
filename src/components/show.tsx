import {
  Children,
  isValidElement,
  ReactNode,
} from 'react'

type ShowProps = {
  children: ReactNode
}

function Show({
  children,
}: ShowProps): ReactNode {
  let when: ReactNode = null
  let otherwise: ReactNode = null

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    if (child.props.isTrue === undefined) {
      otherwise = child
    } else if (
      !when &&
      child.props.isTrue === true
    ) {
      when = child
    }
  })

  return when || otherwise
}

type WhenProps = {
  isTrue: boolean
  children: ReactNode
}

Show.When = function When({
  isTrue,
  children,
}: WhenProps) {
  return isTrue && <>{children}</>
}

type ElseProps = {
  render?: ReactNode
  children?: ReactNode
}

Show.Else = function Else({
  render,
  children,
}: ElseProps) {
  return <>{render || children}</>
}
export { Show }