import { useState } from 'react'
import Image from 'next/image'

export default function Card({artist}: any) {
    return (
        <div className="relative text-center">
            <Image
                src={artist.image.url}
                width={artist.image.width}
                height={artist.image.height}
                alt={artist.name}
                className='card h-full object-cover'
            />
            <div className="absolute bottom-[5px] left-2/4 -translate-x-2/4">{artist.name}</div>
        </div>
    )
}