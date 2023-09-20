export default function Header({score, highscore}: {score: number, highscore: number}) {
    return (
        <div className="flex flex-col text-right mr-[48px] mt-[16px] select-none">
            <div className="">Score: {score}</div>
            <div className="">Highscore: {highscore}</div>
        </div>
    )
}