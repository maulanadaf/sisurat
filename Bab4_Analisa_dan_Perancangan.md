# BAB IV
# ANALISIS, PERANCANGAN, DAN IMPLEMENTASI SISTEM

Bab ini membahas keseluruhan tahap analisis kebutuhan, perancangan antarmuka, implementasi, hingga pembahasan hasil pada Sistem Informasi Surat (SiSurat). Analisis sistem bertujuan untuk memahami permasalahan dan kebutuhan yang ada. Perancangan antarmuka bertujuan memberikan gambaran kerangka dasar visual sistem. Implementasi sistem menjelaskan langkah-langkah penerapan hasil perancangan ke dalam kode. Pembahasan hasil digunakan untuk mengevaluasi kesesuaian sistem dengan fungsionalitas yang dirancang.

---

## 4.1. Analisis Sistem

Analisis sistem merupakan tahapan untuk memahami bagaimana sistem yang sedang berjalan saat ini dan bagaimana sistem yang baru (SiSurat) akan menyelesaikan permasalahan yang ada. Pada tahap ini diuraikan identifikasi masalah utama, aliran proses, struktur data, serta spesifikasi kebutuhan sistem baik fungsional maupun non-fungsional.

### 4.1.1. Analisis Proses

Analisis proses membedah aliran pekerjaan (*workflow*) dari mulai pengguna berinteraksi dengan aplikasi hingga tujuan akhirnya (contoh: surat tercetak) tercapai. Proses-proses ini dapat digambarkan ke dalam bentuk *Flowchart* atau *Use Case Diagram*.

#### 4.1.1.1. Proses Pembuatan Surat Baru
1. Pengguna (Staf Tata Usaha) melakukan autentikasi ke dalam sistem.
2. Pengguna memilih menu **Buat Surat Baru**.
3. Sistem menampilkan borang (*form*) masukan untuk mengisi nomor surat, tanggal surat, hal/perihal, hingga lampiran.
4. Pengguna menyelesaikan isian dan mengonfigurasi penandatangan surat yang berwenang.
5. Sistem menyatukannya dalam satu tata letak otomatis sesuai *template* dan menampilkan Pratinjau (*Preview*).

#### 4.1.1.2. Proses Persetujuan dan Cetak
1. Draf surat yang sudah diisi secara lengkap memasuki status draf final.
2. (*Opsional*) Pejabat pembuat komitmen memeriksa dan menekan tombol setuju.
3. Pengguna menuju ke rute cetak (*print page*). Sistem meregistrasikan instruksi *viewport* dan merender tampilan cetak eksklusif murni.
4. Sistem memanggil modul cetak bawaan peramban (`window.print()`).

---

### 4.1.2. Analisis Data

Analisis data menjabarkan relasi entitas dan basis data apa saja yang dibutuhkan sistem untuk dapat memelihara rekaman surat dan entitas lain (seperti *User* dan *Fakultas/Prodi*).

Struktur data aplikasi SiSurat mencakup tabel-tabel konseptual (yang dapat dimodelkan dalam ERD / *Entity Relationship Diagram*) sebagai berikut:

- **Tabel `users` (Pengguna)**  
  Menyimpan nomor identitas/NIP, kata sandi (terenkripsi), pendelegasian otorisasi/peran, serta identitas surel.
- **Tabel `surat` (Data Surat)**  
  Menyimpan elemen statis pencatatan seperti `nomor_surat_full`, `tgl_surat`, `tempat_surat`, `lampiran`, dan `perihal`.
- **Tabel `konten` (Konten Isi)**  
  Merekam paragraf fleksibel seperti `paragraf_pembuka`, rincian waktu kegiatan, `paragraf_penutup`, beserta identitas penerima.
- **Tabel `penandatangan` (Konfigurasi TTD)**  
  Menyimpan posisi label (*Kiri*, *Kanan*, *Mengetahui*), nama lengkap pejabat, jabatan struktural teks, serta repositori *URL* pemanggilan gambar pindaian tanda tangan.

---

### 4.1.3. Kebutuhan Sistem

#### 4.1.3.1. Kebutuhan Fungsional
Kebutuhan fungsional mendefinisikan apa saja yang harus dapat dilakukan oleh sistem. Berikut adalah beberapa rincian fungsionalitas utama aplikasi SiSurat:
- **Manajemen Akun:** Sistem harus memungkinkan *login* dan *logout* untuk berbagai peran keamanan (seperti admin, kepala bagian, staf).
- **Pembuatan Kop Surat & Draf:** Sistem harus menyediakan format cetak (seperti kop surat, badan surat, kolom tanda tangan) yang responsif dan standar.
- **Kelola Tanda Tangan:** Sistem dapat menyimpan dan menyematkan stempel/tanda tangan secara spesifik untuk pihak *Kiri*, *Kanan*, *Mengetahui*, dsb.
- **Pencetakan Surat (Cetak/PDF):** Sistem harus mampu mencetak dan menyesuaikan resolusi ekspor halaman ke ukuran kertas F4 secara presisi.

#### 4.1.3.2. Kebutuhan Non-Fungsional
- **Performa:** Waktu pemuatan halaman pembuatan surat tidak boleh lebih dari 3 detik.
- **Antarmuka (Usability):** Antarmuka pengguna harus responsif, bersih (menggunakan pustaka UI modern seperti SvelteKit dan TailwindCSS), dan mudah dipelajari oleh tenaga administrasi.

---

## 4.2. Perancangan Sistem

Perancangan sistem bertujuan memberikan gambaran visual awal dari setiap halaman yang ada dalam sistem SiSurat sebelum diimplementasikan. Pendekatan perancangan menggunakan desain *Clean* dan *Responsive* dengan SvelteKit dan TailwindCSS, serta mengacu pada prinsip kemudahan penggunaan (*usability*) bagi tenaga administrasi.

Sistem SiSurat terdiri dari beberapa halaman utama yang dikelompokkan berdasarkan fungsinya masing-masing, yaitu: autentikasi, dasbor, kelola surat, penandatangan, arsip, dan cetak dokumen.

---

### 4.2.1. Halaman Login

Halaman ini merupakan gerbang utama sistem. Pengguna diharuskan memasukkan kredensial (nama pengguna dan kata sandi) yang valid sebelum dapat mengakses fitur di dalam dasbor.

**Elemen Antarmuka:**
- Kolom input *Username* / NIP
- Kolom input *Password* dengan opsi tampil/sembunyikan
- Tombol "Masuk"
- Pesan galat apabila kredensial tidak sesuai

**Gambar 4.1 – Tampilan Perancangan Halaman Login**

> *(Sisipkan screenshot halaman login di sini)*

![Halaman Login](gambar/4.1_halaman_login.png)

---

### 4.2.2. Halaman Dasbor (Beranda)

Halaman dasbor merupakan tampilan pertama yang dilihat pengguna setelah berhasil *login*. Halaman ini menampilkan ringkasan informasi dan navigasi cepat menuju fitur utama.

**Elemen Antarmuka:**
- Sidebar navigasi berisi menu: Beranda, Kelola Surat, Penandatangan, Arsip
- Kartu ringkasan statistik (jumlah surat, surat aktif, dsb.)
- Tombol pintasan untuk membuat surat baru

**Gambar 4.2 – Tampilan Perancangan Halaman Dasbor**

> *(Sisipkan screenshot halaman dasbor di sini)*

![Halaman Dasbor](gambar/4.2_halaman_dasbor.png)

---

### 4.2.3. Halaman Daftar Surat (Kelola Surat)

Halaman ini menampilkan seluruh surat yang pernah dibuat dalam bentuk tabel, dilengkapi dengan fungsi pencarian dan navigasi halaman (*pagination*).

**Elemen Antarmuka:**
- Tabel daftar surat berisi kolom: Nomor Surat, Perihal, Tanggal, Status, dan Aksi
- Tombol "Buat Surat Baru"
- Fitur pencarian surat berdasarkan nomor atau perihal
- Tombol aksi per baris: Lihat Detail, Edit, Cetak

**Gambar 4.3 – Tampilan Perancangan Halaman Daftar Surat**

> *(Sisipkan screenshot halaman daftar surat di sini)*

![Halaman Daftar Surat](gambar/4.3_halaman_daftar_surat.png)

---

### 4.2.4. Halaman Buat Surat Baru

Halaman ini merupakan halaman utama pembuatan surat baru. Pengguna mengisi seluruh informasi yang diperlukan untuk menghasilkan dokumen surat resmi.

**Elemen Antarmuka:**
- Borang (*form*) pengisian: Nomor Surat, Tanggal, Perihal, Lampiran, Kepada, Lokasi Tujuan
- Bagian **Paragraf**: Pembuka, Nama Kegiatan, Waktu Kegiatan, Tempat Kegiatan, Penutup
- Bagian **Penandatangan**: pilih pihak Kiri, Kanan, Mengetahui
- Bagian **Daftar Alat/Perlengkapan** (opsional)
- Tombol "Simpan Draf" dan "Lihat Pratinjau"

**Gambar 4.4 – Tampilan Perancangan Halaman Buat Surat Baru**

> *(Sisipkan screenshot halaman buat surat di sini)*

![Halaman Buat Surat](gambar/4.4_halaman_buat_surat.png)

---

### 4.2.5. Halaman Edit Surat

Halaman ini memiliki tampilan serupa dengan halaman Buat Surat, namun data pada tiap kolom sudah terisi sesuai data surat yang sedang diedit. Pengguna dapat mengubah informasi dan menyimpan pembaruan.

**Elemen Antarmuka:**
- Sama seperti halaman Buat Surat, namun dengan data yang sudah terpopulasi (*pre-filled*)
- Tombol "Simpan Perubahan"
- Indikator status surat saat ini

**Gambar 4.5 – Tampilan Perancangan Halaman Edit Surat**

> *(Sisipkan screenshot halaman edit surat di sini)*

![Halaman Edit Surat](gambar/4.5_halaman_edit_surat.png)

---

### 4.2.6. Halaman Detail Surat

Halaman ini menampilkan pratinjau lengkap isi surat dalam format hanya-baca (*read-only*), memungkinkan pengguna memeriksa kebenaran data sebelum mencetak.

**Elemen Antarmuka:**
- Tampilan pratinjau surat lengkap (Kop Surat, Badan, Tanda Tangan)
- Tombol "Edit" untuk kembali mengedit
- Tombol "Cetak" untuk menuju halaman cetak

**Gambar 4.6 – Tampilan Perancangan Halaman Detail Surat**

> *(Sisipkan screenshot halaman detail surat di sini)*

![Halaman Detail Surat](gambar/4.6_halaman_detail_surat.png)

---

### 4.2.7. Halaman Penandatangan

Halaman ini digunakan untuk mengelola data pejabat yang berhak menandatangani surat, termasuk unggahan gambar tanda tangan digital mereka.

**Elemen Antarmuka:**
- Tabel daftar penandatangan: Nama, Jabatan, Posisi Label (Kiri/Kanan/Mengetahui), Pratinjau TTD
- Tombol tambah penandatangan baru
- Form edit/hapus data penandatangan
- Unggah (*upload*) gambar tanda tangan

**Gambar 4.7 – Tampilan Perancangan Halaman Penandatangan**

> *(Sisipkan screenshot halaman penandatangan di sini)*

![Halaman Penandatangan](gambar/4.7_halaman_penandatangan.png)

---

### 4.2.8. Halaman Arsip

Halaman ini menampilkan daftar surat yang telah diarsipkan, berfungsi sebagai penyimpanan dokumen surat yang sudah selesai diproses.

**Elemen Antarmuka:**
- Tabel daftar surat terarsip
- Fitur pencarian atau filter berdasarkan tanggal/perihal
- Tombol aksi: Lihat Detail, Unduh/Cetak ulang

**Gambar 4.8 – Tampilan Perancangan Halaman Arsip**

> *(Sisipkan screenshot halaman arsip di sini)*

![Halaman Arsip](gambar/4.8_halaman_arsip.png)

---

### 4.2.9. Halaman Cetak Surat (Format F4)

Halaman ini merupakan tampilan khusus cetak yang dirender dalam format kertas F4 (215mm × 330mm). Semua elemen navigasi situs disembunyikan saat mencetak.

**Elemen Antarmuka:**
- **Kop Surat** (*Letterhead*): logo kiri (ITB Yadika), teks nama institusi dan UKM di tengah, logo kanan (UKM Kewirausahaan), daftar dua kolom fakultas dan prodi, serta baris alamat
- **Badan Surat** (*LetterBody*): nomor surat, tanggal, perihal, lampiran, destinasi, isi paragraf, dan tabel alat (jika ada)
- **Tanda Tangan**: kolom tanda tangan Kiri, Kanan, dan Mengetahui dengan gambar TTD dinamis
- Tombol "Cetak PDF" (hanya tampil di layar, tersembunyi saat cetak)

**Gambar 4.9 – Tampilan Perancangan Halaman Cetak Surat**

> *(Sisipkan screenshot halaman cetak surat di sini)*

![Halaman Cetak Surat](gambar/4.9_halaman_cetak_surat.png)

---

## 4.3. Implementasi Sistem

Implementasi sistem merupakan tahap penerapan hasil perancangan ke dalam kode program yang sesungguhnya. Sistem SiSurat dibangun menggunakan teknologi *full-stack* berbasis JavaScript modern dengan tumpukan (*tech stack*) utama sebagai berikut:

| Komponen | Teknologi |
|---|---|
| *Framework* Frontend | SvelteKit |
| Styling | TailwindCSS |
| *Database* | Supabase (PostgreSQL) |
| Autentikasi | Supabase Auth |
| Penyimpanan File TTD | Supabase Storage |
| Bahasa Pemrograman | TypeScript / JavaScript |

---

### 4.3.1. Implementasi Autentikasi

Autentikasi diimplementasikan menggunakan layanan **Supabase Auth**. Pengguna memasukkan *username*/NIP dan kata sandi melalui halaman login. Sistem memvalidasi kredensial melalui *API* Supabase, kemudian menyimpan sesi pengguna (*session*) di sisi klien. Akses ke halaman-halaman yang dilindungi dikontrol melalui mekanisme *guard* pada *layout* SvelteKit menggunakan fungsi `load` di sisi server.

```typescript
// Contoh: src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const session = await locals.getSession();
  if (!session) {
    throw redirect(303, '/login');
  }
  return { session };
};
```

---

### 4.3.2. Implementasi CRUD Surat

Operasi *Create*, *Read*, *Update*, dan *Delete* (CRUD) pada data surat diimplementasikan melalui *server actions* SvelteKit. Setiap aksi form pada halaman buat/edit surat memanggil fungsi `actions` yang berkomunikasi langsung dengan tabel `surat` dan `konten` pada basis data Supabase.

- **Buat Surat:** Data form dikirim ke *action* `create`, divalidasi, lalu disisipkan ke dalam tabel `surat` dan `konten`.
- **Ubah Surat:** Data form dikirim ke *action* `update`, lalu memperbarui baris yang sesuai berdasarkan `id` surat.
- **Hapus Surat:** *Action* `delete` menghapus baris dari tabel berdasarkan `id`.

---

### 4.3.3. Implementasi Komponen Cetak (Format F4)

Halaman cetak diimplementasikan sebagai rute terpisah (`/cetak/[id]`) yang memuat komponen `Letterhead` dan `LetterBody`. Sistem secara otomatis memanggil `window.print()` segera setelah halaman dimuat menggunakan *lifecycle hook* `onMount` pada Svelte.

```svelte
<!-- src/routes/cetak/[id]/+page.svelte (ringkasan) -->
<script>
  import { onMount } from 'svelte';
  import Letterhead from '$lib/components/Letterhead.svelte';
  import LetterBody from '$lib/components/LetterBody.svelte';

  export let data;

  onMount(() => {
    window.print();
  });
</script>

<div class="print-area">
  <Letterhead />
  <LetterBody surat={data.surat} />
</div>
```

Tata letak cetak dikonfigurasi menggunakan aturan CSS `@page` untuk memastikan keluaran PDF sesuai ukuran kertas F4 (215mm × 330mm).

```css
/* Konfigurasi ukuran kertas F4 */
@page {
  size: 215mm 330mm;
  margin: 20mm 25mm;
}
```

---

### 4.3.4. Implementasi Manajemen Penandatangan

Data penandatangan (nama, jabatan, dan gambar tanda tangan) dikelola pada halaman tersendiri. Gambar tanda tangan diunggah ke **Supabase Storage** dan URL-nya disimpan pada tabel `penandatangan`. Saat komponen cetak dirender, URL gambar tanda tangan diambil secara dinamis dan disematkan sebagai elemen `<img>` di dalam kolom tanda tangan surat.

---

## 4.4. Pembahasan Hasil

Tahap pembahasan hasil merupakan tahap di mana seluruh rangkaian aplikasi yang telah diimplementasikan dievaluasi keandalannya (*Quality Assurance*) untuk memastikan bebas dari gangguan perangkat lunak (*bugs*) dan memenuhi fungsionalitas yang telah dirancang. Pengujian sistem ini utamanya menggunakan pendekatan *Black Box Testing*.

---

### 4.4.1. Skenario Pengujian Unit *Black Box*

| No | Modul / Fungsionalitas | Skenario Pengujian | Hasil yang Diharapkan | Status |
|----|------------------------|--------------------|-----------------------|--------|
| 1. | **Autentikasi (Login)** | Memasukkan kombinasi ID pengguna dan kata sandi tak valid. | Sistem menolak dengan peringatan galat "Kredensial tidak sesuai". | ✅ Sesuai |
| 2. | **CRUD Surat Baru** | Menyimpan isian surat tetapi beberapa atribut wajib (seperti Nomor Surat) dibiarkan kosong. | Sistem mencegah persetujuan (*prevent submission*) dan menyoroti bidang kosong. | ✅ Sesuai |
| 3. | **Muat Komponen Kop Surat** | Merender tampilan kop surat berlambang ganda dengan nama dan jurusan dua blok (*flex* horizontal). | Logo tidak tumpang tindih; teks tetap berada pada 1 baris di proporsi layar maupun cetak mutlak F4. | ✅ Sesuai |
| 4. | **Ekspor Cetak (Print View)** | Pemanggilan rute cetak dengan ID acak unik (*wildcard/id*). | Sistem langsung mengeksekusi otomatis `window.print()` tanpa penundaan. | ✅ Sesuai |
| 5. | **Cetak Tanda Tangan** | Render dinamis `ttdKiri` tanpa data dari `penandatangan`. | Komponen gagal dengan senyap (elemen kosong / *fallback* setuju) tanpa mematikan seluruh dokumen DOM Svelte. | ✅ Sesuai |

---

### 4.4.2. Pembahasan Hasil Pengujian

Berdasarkan hasil pengujian *Black Box* pada tabel di atas, seluruh skenario uji yang telah dirancang berhasil menunjukkan hasil yang sesuai dengan ekspektasi sistem. Berikut adalah poin-poin pembahasan:

1. **Autentikasi:** Sistem berhasil menangani kasus kredensial tidak valid dengan menampilkan pesan galat yang informatif tanpa memberikan celah keamanan.

2. **Validasi Formulir:** Mekanisme validasi pada formulir surat berjalan dengan baik, mencegah pengguna mengirimkan data yang tidak lengkap dan memandu mereka menuju kolom yang perlu dilengkapi.

3. **Komponen Kop Surat:** Komponen *Letterhead* berhasil merender dua logo pada posisi yang tepat tanpa tumpang tindih, baik pada tampilan layar maupun pada keluaran cetak F4.

4. **Fungsi Cetak Otomatis:** Mekanisme `window.print()` yang dipanggil melalui `onMount` berhasil dieksekusi secara otomatis dan tepat waktu, memberikan pengalaman cetak yang mulus bagi pengguna.

5. **Penanganan Data Kosong:** Komponen tanda tangan berhasil menangani kondisi data yang tidak tersedia secara *graceful* — menampilkan elemen kosong tanpa menyebabkan kesalahan yang mengganggu keseluruhan tampilan halaman.

Secara keseluruhan, aplikasi SiSurat dinilai telah **lulus kualifikasi awal** dalam merender tampilan antarmuka yang kompleks, memastikan validasi formulir persuratan, serta mampu menjalankan fungsi cetak format F4 dengan presisi yang baik.

---

*(Catatan: Lampirkan screenshot gambar hasil antarmuka atau diagram Use Case / Activity Diagram yang sesungguhnya untuk memperkaya bab ini di dalam dokumen aslinya).*
