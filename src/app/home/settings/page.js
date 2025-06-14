import ThemeToggle from "@/app/components/toggleDark";

export default function Setting() {
  return (
    <div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
      {/* 📦 Item 1 - Kolom kiri, rowspan 2, konten tengah, icon di bawah */}
      <div className="row-span-2 bg-blue-100 p-6 rounded-xl flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold">Gudang Utama</h2>
        <p className="text-sm text-gray-600">Stok barang tersimpan di sini</p>
        <div className="mt-6 text-5xl">📦</div>
      </div>

      {/* 🧠 Item 2 */}
      <div className="bg-green-100 p-6 rounded-xl flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold">Analitik</h2>
        <p className="text-sm text-gray-600">Pantau performa harian</p>
        <div className="mt-6 text-5xl">🧠<ThemeToggle/>
      </div>

      {/* 🛠️ Item 3 */}
      <div className="bg-yellow-100 p-6 rounded-xl flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold">Pengaturan</h2>
        <p className="text-sm text-gray-600">Kustomisasi sistem kamu</p>
        <div className="mt-6 text-5xl">🛠️</div>
      </div>
      </div>

      </div>
    </div>
  )
}