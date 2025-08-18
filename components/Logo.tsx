import React from 'react'
import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  }

  const sizePixels = {
    sm: 32,
    md: 48,
    lg: 96,
    xl: 128
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <Image
        src="/logo.png"
        alt="Indian Coffee House Logo"
        width={sizePixels[size]}
        height={sizePixels[size]}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}

export default Logo