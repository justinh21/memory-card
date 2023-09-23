"use client";

// const usersTopArtists = await getTopArtists(20) as Artist[]
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient("https://nmzvlsjuzbgabzjediue.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tenZsc2p1emJnYWJ6amVkaXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUxOTI3MzIsImV4cCI6MjAxMDc2ODczMn0.dt39RfmIBhI370f38vkcu9wNprhFTW8A_6vlR3yo4SU")

export default function SetupGame() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={["spotify"]} />)
  }
  else {
    console.log(session)
    return (<div>Logged in!</div>)
  }
}