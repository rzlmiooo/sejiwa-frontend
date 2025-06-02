import Bento from "../components/bento"

let username = 'Rizal'

export default function Home(){
    return (
        <div className="flex flex-col justify-start items-start p-5 m-4 w-fit sm:max-w-4xl overflow-y-scroll lg:overflow-y-hidden">
            <div className="text-gray-900 text-xl font-bold">
                Halo { username }! Selamat datang di Sejiwa.
            </div>
            <div className="text-gray-900 text-lg font-medium">
                Temukan ketenangan jiwamu.
            </div>
            <Bento />
        </div>
    )
}