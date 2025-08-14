import React from 'react'

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

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle - cream background */}
        <circle 
          cx="100" 
          cy="100" 
          r="95" 
          fill="#f5f5dc" 
          stroke="#654321" 
          strokeWidth="8"
        />
        
        {/* Inner red circle */}
        <circle 
          cx="100" 
          cy="100" 
          r="75" 
          fill="none" 
          stroke="#b22222" 
          strokeWidth="6"
        />
        
        {/* Chef hat */}
        <ellipse 
          cx="100" 
          cy="65" 
          rx="15" 
          ry="20" 
          fill="white" 
          stroke="#654321" 
          strokeWidth="2"
        />
        <ellipse 
          cx="100" 
          cy="55" 
          rx="18" 
          ry="12" 
          fill="white" 
          stroke="#654321" 
          strokeWidth="2"
        />
        
        {/* Coffee cup */}
        <ellipse 
          cx="100" 
          cy="120" 
          rx="20" 
          ry="15" 
          fill="white" 
          stroke="#654321" 
          strokeWidth="2"
        />
        <rect 
          x="80" 
          y="105" 
          width="40" 
          height="25" 
          fill="white" 
          stroke="#654321" 
          strokeWidth="2"
          rx="2"
        />
        
        {/* Coffee liquid */}
        <ellipse 
          cx="100" 
          cy="110" 
          rx="15" 
          ry="8" 
          fill="#8B4513"
        />
        
        {/* Coffee bean on cup */}
        <ellipse 
          cx="100" 
          cy="115" 
          rx="3" 
          ry="5" 
          fill="#b22222"
        />
        
        {/* Steam lines */}
        <path 
          d="M 90 95 Q 92 85 90 80" 
          stroke="#654321" 
          strokeWidth="2" 
          fill="none"
        />
        <path 
          d="M 100 95 Q 102 85 100 80" 
          stroke="#654321" 
          strokeWidth="2" 
          fill="none"
        />
        <path 
          d="M 110 95 Q 112 85 110 80" 
          stroke="#654321" 
          strokeWidth="2" 
          fill="none"
        />
        
        {/* Fork on left */}
        <line 
          x1="35" 
          y1="90" 
          x2="35" 
          y2="110" 
          stroke="#654321" 
          strokeWidth="3"
        />
        <line 
          x1="32" 
          y1="90" 
          x2="32" 
          y2="100" 
          stroke="#654321" 
          strokeWidth="2"
        />
        <line 
          x1="35" 
          y1="90" 
          x2="35" 
          y2="100" 
          stroke="#654321" 
          strokeWidth="2"
        />
        <line 
          x1="38" 
          y1="90" 
          x2="38" 
          y2="100" 
          stroke="#654321" 
          strokeWidth="2"
        />
        
        {/* Knife on right */}
        <line 
          x1="165" 
          y1="90" 
          x2="165" 
          y2="110" 
          stroke="#654321" 
          strokeWidth="3"
        />
        <rect 
          x="163" 
          y="85" 
          width="4" 
          height="10" 
          fill="#654321"
        />
        
        {/* Text - INDIAN COFFEE HOUSE */}
        <text 
          x="100" 
          y="35" 
          textAnchor="middle" 
          fontFamily="serif" 
          fontSize="16" 
          fontWeight="bold" 
          fill="#654321"
        >
          INDIAN
        </text>
        <text 
          x="100" 
          y="50" 
          textAnchor="middle" 
          fontFamily="serif" 
          fontSize="14" 
          fontWeight="bold" 
          fill="#654321"
        >
          COFFEE HOUSE
        </text>
        
        {/* Text - RESTAURANT */}
        <text 
          x="100" 
          y="175" 
          textAnchor="middle" 
          fontFamily="serif" 
          fontSize="16" 
          fontWeight="bold" 
          fill="#654321"
        >
          RESTAURANT
        </text>
      </svg>
    </div>
  )
}

export default Logo