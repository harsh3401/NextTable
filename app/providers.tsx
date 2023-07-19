// app/providers.tsx
'use client'

import { newTheme } from '@/theme'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={newTheme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}