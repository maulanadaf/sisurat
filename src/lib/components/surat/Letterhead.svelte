<script>
  import logoItb from "$lib/assets/logo-itb.png";
  import logoUkm from "$lib/assets/logo.png";
</script>

<!-- Letterhead / Kop Surat -->
<div class="kop-surat font-serif text-black -mx-8">
  <div class="flex justify-between items-center gap-2 pb-2 w-full">
    <!-- Logo Kiri: ITB Yadika -->
    <div class="w-[100px] shrink-0 flex-none">
      <img
        src={logoItb}
        alt="Logo ITB Yadika Pasuruan"
        class="w-full h-auto object-contain"
      />
    </div>

    <!-- Teks Tengah -->
    <div
      class="grow flex flex-col items-center justify-center text-center px-1 min-w-0"
    >
      <h2
        class="font-bold tracking-wide uppercase text-black"
        style="font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.1; color: black;"
      >
        Institut Teknologi & Bisnis Yadika Pasuruan
      </h2>
      <h1
        class="font-bold tracking-wide uppercase text-black"
        style="font-family: 'Times New Roman', Times, serif; font-size: 14pt; line-height: 1.1; color: black;"
      >
        Unit Kegiatan Mahasiswa Kewirausahaan
      </h1>

      <div
        class="flex justify-center w-full mt-1.5 mb-1"
        style="font-family: 'Times New Roman', Times, serif;"
      >
        <!-- Kolom Kiri -->
        <div class="flex-1 flex flex-col items-center">
          <div class="inline-block">
            <p
              class="font-bold underline uppercase text-[9pt] text-center w-full"
            >
              Fakultas Teknologi Informasi
            </p>
            <div
              class="mt-0 text-[9pt] leading-none flex flex-col items-start pl-1"
            >
              <p>- SISTEM & TEKNOLOGI INFORMASI (S1)</p>
              <p class="-mt-[2px]">- SISTEM INFORMASI (S1)</p>
            </div>
          </div>
        </div>

        <!-- Kolom Kanan -->
        <div class="flex-1 flex flex-col items-center">
          <div class="inline-block">
            <p
              class="font-bold underline uppercase text-[9pt] text-center w-full"
            >
              Fakultas Hukum Dan Bisnis
            </p>
            <div
              class="mt-0 text-[9pt] leading-none flex flex-col items-start pl-1"
            >
              <p>- MANAJEMEN (S1)</p>
              <p class="-mt-[2px]">- AKUNTANSI (S1)</p>
              <p class="-mt-[2px]">- HUKUM BISNIS (S1)</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Logo Kanan: UKM Kewirausahaan -->
    <div class="w-[100px] shrink-0 flex-none">
      <img
        src={logoUkm}
        alt="Logo UKM Kewirausahaan ITB Yadika Pasuruan"
        class="w-full h-auto object-contain"
      />
    </div>
  </div>

  <p
    style="font-family: 'Times New Roman', Times, serif; font-size: 8pt; line-height: 1.3;"
    class="text-center w-full -mt-2 pb-1 text-black"
  >
    Jl. Salem no 03 Kersikan, Telp (0343) 749266 &ndash; 087715728111, Bangil
    &ndash; Pasuruan 67153, <i class="italic">email:</i>
    <a
      href="mailto:mail@itbyadika.ac.id"
      class="text-blue-700 underline decoration-blue-700"
      >mail@itbyadika.ac.id</a
    >, <i class="italic">site:</i><a
      href="http://www.itbyadika.ac.id"
      target="_blank"
      class="text-blue-700 underline decoration-blue-700">www.itbyadika.ac.id</a
    >
  </p>

  <!-- Garis Pemisah -->
  <div class="border-black w-full" style="border-top-width: 3px;"></div>
  <div class="border-black mt-px w-full" style="border-top-width: 1px;"></div>
</div>
