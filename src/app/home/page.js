import Bento from "../components/bento"
import UserGreeting from "../components/greetings"

export default function Home(){
    return (
        <div className="flex flex-1 flex-col justify-start items-start p-4 m-4 w-fit sm:max-w-4xl overflow-y-scroll lg:overflow-y-hidden">
            <div className="text-gray-900 dark:text-sky-100 px-4 text-lg sm:text-xl font-bold">
                Halo <UserGreeting/>! Selamat datang di Sejiwa.
            </div>
            <div className="text-gray-900 dark:text-sky-100 px-4 pb-4 text-sm sm:text-lg font-medium">
                Temukan ketenangan jiwamu.
            </div>
            <Bento />
        </div>
    )
}