# Plan: Rencana Pembaruan Black Box (Kolom Actual Result) & Penulisan Unit Test Jest (White Box)

Rencana ini merinci penyesuaian dokumen pengujian serta pembuatan file unit test menggunakan Jest + React Testing Library berdasarkan skenario pengujian White Box yang telah diidentifikasi.

---

## 1. Pembaruan Dokumen Black Box

Dokumen pengujian Black Box (`black_box_test.docx`) akan diperbarui dengan menambahkan kolom **"Hasil Aktual"** (Actual Result) sebelum kolom **"Hasil Pengujian"** (Status Pass/Fail).

### Struktur Kolom Baru:
1. **Test ID** (Contoh: `BB-001`)
2. **Deskripsi Pengujian**
3. **Langkah Pengujian**
4. **Data Input**
5. **Expected Output**
6. **Hasil Aktual** (Default: *Sesuai dengan Expected Output*)
7. **Hasil Pengujian** (Default: *PASS*)

*Catatan: File `generate_black_box.py` akan dimodifikasi untuk mendukung penambahan kolom ini, mengatur ulang lebar kolom (column width) agar tetap rapi saat dibuka di Microsoft Word.*

---

## 2. Pembuatan Unit Test dengan Jest (White Box)

Untuk menjalankan pengujian White Box secara otomatis, kita akan membuat test suite menggunakan **Jest** dan **React Testing Library** (untuk menguji React hooks, state, dan rendering logic).

### A. Konfigurasi Testing
Kita akan membuat konfigurasi berikut di direktori proyek:
- `jest.config.js`: Menggunakan konfigurasi Next.js Compiler bawaan (`next/jest`) untuk memproses React 19, ES Modules, dan path alias `@/*`.
- `jest.setup.js`: Menyediakan polyfill untuk API browser yang digunakan di kode (seperti `localStorage`, `window.location`, `atob`/`btoa`, dan `jest-dom` matchers).

### B. Daftar File Test yang Akan Dibuat
Sesuai dengan pemetaan White Box, kita akan membuat file test berikut di bawah `__tests__` atau berdampingan dengan komponen:

1. **`__tests__/utils/generateUsernameFromEmail.test.js`**
   - Menguji kebenaran algoritma pemisahan string email.
   - Menguji handling email kosong, format aneh, serta email yang berawalan angka/spesial karakter.

2. **`__tests__/service/AuthService.test.js`**
   - Menguji helper `isTokenExpired()` dengan mock JWT token (expired vs active).
   - Menguji `getAuthHeaders()` yang otomatis menyegarkan token via `refreshToken()`.
   - Menguji behavior `logout()` yang membersihkan `localStorage`.

3. **`__tests__/home/assessment.test.js`**
   - Menguji fungsi `handleChange()` untuk memperbarui state checkbox emosi dan intensitas.
   - Menguji `handleSubmit()` untuk memastikan filter hanya mengirim emosi yang bernilai `checked: true`.

4. **`__tests__/home/layout.test.js`**
   - Menguji guard routing di level layout dashboard.
   - Memvalidasi redirect otomatis ke `/unauthorized` bila token tidak ditemukan.

5. **`__tests__/konselor/kelola-jadwal.test.js`**
   - Menguji filter data jadwal agar hanya menampilkan jadwal milik `counselorId` yang sedang login.

---

## 3. Langkah-Langkah Eksekusi

### Step 1: Modifikasi Generator Script Python
- Perbarui `generate_black_box.py` untuk menyisipkan kolom **Hasil Aktual** dan sesuaikan layout tabel.
- Jalankan ulang script untuk meregenerasi file `.docx`.

### Step 2: Instalasi Dependency Testing
- Tambahkan `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, dan `@testing-library/user-event` ke `devDependencies` di `package.json`.

### Step 3: Konfigurasi Lingkungan Jest
- Tulis file `jest.config.js` and `jest.setup.js`.

### Step 4: Penulisan File Unit Test
- Implementasikan kode unit test untuk 5 file pengujian utama di atas.

### Step 5: Eksekusi Test
- Tambahkan script `"test": "jest"` di `package.json` dan jalankan `npm run test` atau `pnpm test` untuk memverifikasi seluruh test suite berjalan dengan sukses (100% pass).
