import Image from 'next/image'
import { Inter } from 'next/font/google'

import Jumbotron from '@/components/jumbotron'
import PlayerStats from '@/components/playerStats'

export default function Home() {
  return (
    <main>
    <Jumbotron backgroundImage={"/nyrangersBanner.png"} />
    <PlayerStats />
    </main>
  )
}
