"use client";
import Card from '@/components/Card'
import Header from './Header';
import { Artist } from '@/utils/spotify';
import { useEffect, useState } from 'react';
import uniqid from "uniqid";


export default function Game({usersTopArtists}: any) {
  const [isClient, setIsClient] = useState<boolean>(false)

  const [session, setSession] = useState<any>(null)

  // Get initial deck
  const random = Array.from({length: 30}, () => Math.floor(Math.random() * usersTopArtists.length))
  const [cards, setCards] = useState<any[]>(random.map(index => usersTopArtists[index]))
  const [chosenCards, setChosenCards] = useState<string[]>([]);
  const [highscore, setHighscore] = useState<number>(0);

  // React freaks out because random values are generated on the server, and then different ones on the client, giving a missmatch
  // They recommend using useEffect as below to ensure the component renders the same content server-side as the initial client-side render
  useEffect(() => {
    setIsClient(true);
  }, [])
  if (!isClient) {
    return (
      null
    )
  }

  if (chosenCards.length > highscore) {
    setHighscore(chosenCards.length)
  }

  function selectedCard(id: number, name: string) {
    updateCards(id)
    if (chosenCards.includes(name)) {
      return setChosenCards(() => [])
    } else {
      return setChosenCards((chosenCards) => [...chosenCards, name])
    }
  }

  function updateCards(id: number) {
    const newCards = [...cards].slice(0,id).concat([...cards].slice(id+1))
    newCards.push(usersTopArtists[Math.floor(Math.random() * usersTopArtists.length)])
    setCards(newCards)
  }

  const listitems = cards.map((artist: Artist, i: number) => (
    <Card key={uniqid()} id={i} artist={artist} onPress={selectedCard}/>)
  );
  return (
    <div className='flex flex-col min-w-full'>
      <Header score={chosenCards.length} highscore={highscore}/>
      <div className='flex flex-wrap justify-around items-left justify-items-stretch'>
        {listitems}
      </div>
    </div>
  )
}
