<script>
    import logoItb from "$lib/assets/logo-itb.png";
    import logoUkm from "$lib/assets/logo.png";
</script>

<!-- Letterhead / Kop Surat -->
<div class="kop-surat w-full font-serif">
    <!-- Baris Atas: Logo + Teks + Logo -->
    <!-- Baris Atas: Grid 3 Kolom untuk keseimbangan sejati (Logo - Teks - Logo) -->
    <div class="grid grid-cols-[100px_1fr_100px] items-center gap-4 pb-2">
        <!-- Logo Kiri: ITB Yadika -->
        <img
            src={logoItb}
            alt="Logo ITB Yadika Pasuruan"
            class="w-full h-auto object-contain"
        />

        <!-- Teks Tengah -->
        <div class="text-center flex flex-col justify-center w-full">
            <p
                class="font-bold tracking-wide uppercase text-black"
                style="font-family: Cambria, Georgia, serif; font-size: 18pt; line-height: 1;"
            >
                UKM Kewirausahaan
            </p>
            <p
                class="font-extrabold tracking-wide uppercase text-black"
                style="font-family: Cambria, Georgia, serif; font-size: 22pt; line-height: 1; margin-top: 1px;"
            >
                ITB Yadika Pasuruan
            </p>
            <p
                class="font-bold uppercase whitespace-nowrap text-black"
                style="font-family: Calibri, 'Gill Sans', sans-serif; font-size: 12pt; line-height: 1.1; margin-top: 1px;"
            >
                Fakultas Teknologi Informasi &ndash; Fakultas Hukum dan Bisnis
            </p>
            <p
                class="text-black"
                style="font-family: 'Times New Roman', Times, serif; font-size: 10pt; line-height: 1; margin-top: 2px;"
            >
                Jl. Salem No. 3 Kersikan Telp. (0343) 746000 &ndash; 748914
                Bangil 67153
            </p>
        </div>

        <!-- Logo Kanan: UKM Kewirausahaan -->
        <img
            src={logoUkm}
            alt="Logo UKM Kewirausahaan ITB Yadika Pasuruan"
            style="width: 200px; height: auto;"
            class="object-contain"
        />
    </div>

    <!-- Garis Pemisah -->
    <div class="border-black" style="border-top-width: 3px;"></div>
    <div class="border-black mt-0.5" style="border-top-width: 1px;"></div>
</div>
