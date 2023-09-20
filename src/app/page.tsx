import Game from '@/components/Game'

import { Artist, topArtists } from '@/utils/spotify'

async function getTopArtists(numArtists: number) {
  const result = await topArtists();
  const {items} = await result.json();

  const artists = items.slice(0, numArtists)

  if (!result.ok) {
    throw new Error("Failed to fetch top artists")
  }

  return artists
}

export default async function Home() {
  const usersTopArtists = await getTopArtists(20) as Artist[]

  return (
    <Game usersTopArtists={usersTopArtists}/>
  )
}
