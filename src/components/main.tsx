import cx from 'classnames'

export type MainProps = {
  children?: React.ReactNode
  className?: string
}

export function Main({ children, className }: MainProps): React.ReactNode {
  return <main className={cx('flex flex-1', className)}>{children}</main>
}
