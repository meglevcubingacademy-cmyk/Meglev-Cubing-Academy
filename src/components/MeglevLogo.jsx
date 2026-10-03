import logoFull from '../assets/logo-full.png'
import logoIcon from '../assets/logo-icon.jpg'

const logoAssets = {
  primary: logoFull,
  dark: logoFull,
  mono: logoFull,
  icon: logoIcon,
}

export default function MeglevLogo({
  size = 40,
  showText = true,
  className = '',
  variant = 'primary',
}) {
  const isIconOnly = variant === 'icon' || !showText
  const asset = isIconOnly ? logoIcon : (logoAssets[variant] || logoFull)

  return (
    <img
      src={asset}
      alt="MEGLEV Cubing Academy"
      className={`meglev-logo block shrink-0 object-contain ${isIconOnly ? 'rounded-lg' : ''} ${className}`}
      style={{ '--meglev-logo-size': `${size}px` }}
    />
  )
}

