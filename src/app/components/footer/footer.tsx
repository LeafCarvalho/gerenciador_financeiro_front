import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <footer>
      <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      padding='44px 0'
      color='#fff'
      sx={{ backgroundColor: '#1A237E', marginTop: '2.5rem' }}>
        <Typography variant='body1'>Feito por <Link href="https://leafcarvalho.github.io/">Rafael Carvalho</Link></Typography>
      </Box>
    </footer>
  )
}