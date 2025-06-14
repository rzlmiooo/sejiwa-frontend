import Bento from "../components/bento"
import UserGreeting from "../components/greetings"

export default function Home(){
    return (
        <div className="flex-1 flex-col justify-start items-start p-5 m-4 w-fit sm:max-w-4xl overflow-y-scroll lg:overflow-y-hidden">
            <div className="text-gray-900 dark:text-sky-100 text-xl font-bold">
                Halo <UserGreeting/>! Selamat datang di Sejiwa.
            </div>
            <div className="text-gray-900 dark:text-sky-100 text-lg font-medium">
                Temukan ketenangan jiwamu.
            </div>
            <Bento />
        </div>
    )
}