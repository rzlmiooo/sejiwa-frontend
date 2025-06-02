export default function Ass() {
    const data = [
        { id: 1, nama: "Budi", jawaban: "Ya", skor: 8 },
        { id: 2, nama: "Sari", jawaban: "Tidak", skor: 5 },
        { id: 3, nama: "Agus", jawaban: "Ya", skor: 9 },
    ];

    return (    
        <div className="text-zinc-950">
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Hasil Survei</h1>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100 text-left">
                      <tr>
                        <th className="p-2 border-b">#</th>
                        <th className="p-2 border-b">Nama</th>
                        <th className="p-2 border-b">Jawaban</th>
                        <th className="p-2 border-b">Skor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                          <td className="p-2 border-b">{row.id}</td>
                          <td className="p-2 border-b">{row.nama}</td>
                          <td className="p-2 border-b">{row.jawaban}</td>
                          <td className="p-2 border-b">{row.skor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
    )
}