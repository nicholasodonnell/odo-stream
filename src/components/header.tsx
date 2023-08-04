import cx from 'classnames'

export type MainProps = {
  children?: React.ReactNode
  className?: string
}

export function Header({ children, className }: MainProps): React.ReactNode {
  return <header className={cx('flex', className)}>{children}</header>
}
