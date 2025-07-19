// src/components/CloudinaryImage.tsx
'use client'

import { CldImage } from 'next-cloudinary'

interface CloudinaryImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  onLoad?: () => void
  fill?: boolean
  sizes?: string
  loading?: 'eager' | 'lazy'
}

export default function CloudinaryImage({
  src,
  alt,
  width = 800,
  height = 800,
  className,
  priority = false,
  onLoad,
  fill = false,
  sizes,
  loading = priority ? undefined : 'lazy',
  ...props
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      priority={priority}
      onLoad={onLoad} // Changed from onLoadingComplete to onLoad
      sizes={sizes}
      loading={loading}
      format="webp"
      quality="auto"
      crop="fill"
      gravity="auto"
      dpr="auto"
      {...props}
    />
  )
}