import Image from 'next/image'

export default function Home(){
    return (
        <h1 className="flex flex-col max-w-full justify-center items-center m-3">
            <Image src="/icon.png" width="300" height="300" alt="sejiwa.png"></Image>
            Homepage
        </h1>
    )
}