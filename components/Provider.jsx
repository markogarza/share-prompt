'use client'
import { SessionProvider } from 'next-auth/react'


function Provider({session, children}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider