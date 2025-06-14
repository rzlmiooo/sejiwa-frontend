import Back from "@/app/components/back";

export default function Profile() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <Back />
        <h1 className="text-2xl font-bold">Welcome to your profile</h1>
      </main>
    </div>
  );
}