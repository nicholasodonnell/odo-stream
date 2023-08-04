import Image from 'next/image'

import logo from '../../public/logo.svg'

export type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps): React.ReactNode {
  return <Image alt="Logo" src={logo} className={className} priority />
}
