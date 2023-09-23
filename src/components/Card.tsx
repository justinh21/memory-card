import { Artist } from '@/utils/spotify'

export default function Card({id, artist, onPress}: {id: number, artist: Artist, onPress: Function}) {
    return ( // max-w-[256px] max-h-[384px]
        <div className={`relative text-center m-[1.75vw] hover:scale-[105%] max-w-[16vw] max-h-[22vw] bg-cover bg-center rounded-[3vw] shadow-[0px_10px_10px_0px_rgba(0,0,0,0.5)]`}
        style={{
            backgroundImage: `url('${artist.images[0].url}')`,
            width: artist.images[0].width,
            height: artist.images[0].height,
            }}
        onClick={() => onPress(id, artist.name)}>
            <div className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] text-[2vw] absolute bottom-[5px] left-2/4 -translate-x-2/4 select-none">{artist.name}</div>
        </div>
    )
}