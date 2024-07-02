'use client'

import { useSession, signIn, signOut, SessionProvider } from "next-auth/react"

export default function Component() {
  
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
    <div className="flex flex-col items-center w-full min-h-screen justify-center">
      <button className="border-2 border-black text-black hover:bg-gray-200 px-5 py-[5px] rounded-lg m-0.5 font-semibold" onClick={() => signIn()}>Sign in</button>
      <h3 className="px-4 py-[8px] text-sm rounded-lg text-red-500 font-semibold">Not signed in</h3>
    </div>
    </>
  )
}