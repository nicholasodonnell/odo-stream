import cx from 'classnames'

export type OfflineProps = {
  className?: string
}

export function Offline({ className }: OfflineProps): React.ReactNode {
  return (
    <div className={cx('p-4 text-center', className)}>
      <h1 className="font-brand text-3xl">Offline</h1>
    </div>
  )
}
