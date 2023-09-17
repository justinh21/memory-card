import Image from 'next/image'
import Card from '@/components/Card'

import { topArtists } from '@/utils/spotify'

export type Artist = {
  external_urls: {spotify: string},
  followers: {href: string,
  total: number},
  genres: string[],
  href: string,
  id: string,
  images: object[],
  name: string,
  popularity: number,
  type: string,
  uri: string
}

async function getTopArtists(numArtists: number) {
  const result = await topArtists();
  const {items} = await result.json();

  const artists = items.slice(0, numArtists).map((artist: Artist) => ({
    name: artist.name,
    image: artist.images[0],
    spotify_url: artist.external_urls.spotify
  }))

  if (!result.ok) {
    throw new Error("Failed to fetch top artists")
  }

  return artists
}

export default async function Home() {
  const usersTopArtists = await getTopArtists(20) as Artist[]

  const listitems = usersTopArtists.map((artist, i) => <Card key={i} artist={artist}/>);

  console.log(listitems)

  // console.log(usersTopArtists)
  return (
    <div className='flex flex-wrap items-left m-6 gap-6 justify-items-stretch'>
    {listitems}
    </div>
  )
}
