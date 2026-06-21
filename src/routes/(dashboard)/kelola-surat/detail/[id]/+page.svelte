<script>
    import { goto } from "$app/navigation";
    import Letterhead from "$lib/components/surat/Letterhead.svelte";
    import LetterBody from "$lib/components/surat/LetterBody.svelte";

    let { data } = $props();

    let { surat, konten, penandatangan, alat } = $derived(data);

    // Mapping Penandatangan
    const ttdKiri = $derived(
        penandatangan.find((p) => p.posisi_label === "Kiri") || {},
    );
    const ttdKanan = $derived(
        penandatangan.find((p) => p.posisi_label === "Kanan") || {},
    );
    const mengetahuiKiri = $derived(
        penandatangan.find(
            (p) =>
                p.posisi_label === "Mengetahui-Kiri" ||
                p.posisi_label === "Mengetahui",
        ) || {},
    );
    const mengetahuiKanan = $derived(
        penandatangan.find((p) => p.posisi_label === "Mengetahui-Kanan") || {},
    );

    const isKepanitiaan = $derived(surat.kategori === "Kepanitiaan");
</script>

<svelte:head>
    <title>Detail Surat - SiSurat</title>
</svelte:head>

<div class="space-y-6 max-w-5xl mx-auto pb-12">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold text-[var(--dark)] tracking-tight">
                Detail Surat
            </h1>
            <p class="text-slate-500 mt-1">
                Pratinjau detail informasi dan isi surat yang telah dibuat.
            </p>
        </div>
        <div class="flex gap-3">
            <button
                onclick={() => goto("/kelola-surat")}
                class="px-5 py-2.5 rounded-xl font-medium text-slate-600 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Kembali
            </button>
            <button
                onclick={() => goto(`/kelola-surat/edit/${surat.id}`)}
                class="px-5 py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                </svg>
                Edit Surat
            </button>
        </div>
    </div>

    <!-- Paper Preview Area -->
    <div
        class="bg-slate-200/50 p-6 md:p-10 rounded-2xl flex justify-center border border-slate-200 overflow-x-auto"
    >
        <div class="bg-white shadow-xl paper-preview shrink-0">
            <div class="content-wrapper">
                <Letterhead />

                <div class="mt-4">
                    <!-- Note: LetterBody is responsive by default, but paper-preview fixes width to roughly F4 -->
                    <LetterBody
                        noSurat={surat.nomor_surat_full}
                        tglSurat={surat.tgl_surat}
                        tempatSurat="Bangil"
                        lampiran={surat.lampiran}
                        perihal={surat.perihal}
                        kepada={surat.kepada}
                        lokasiTujuan="Tempat"
                        paragrafPembuka={konten?.paragraf_pembuka}
                        namaKegiatan={konten?.nama_kegiatan}
                        hariTglKegiatan={konten?.waktu_pelaksanaan?.split(
                            " / ",
                        )[0]}
                        waktuKegiatan={konten?.waktu_pelaksanaan?.split(
                            " / ",
                        )[1]}
                        tempatKegiatan={konten?.tempat_kegiatan}
                        paragrafPenutup={konten?.paragraf_penutup}
                        ttdKiriTeks={ttdKiri.jabatan_teks}
                        ttdKiriNama={ttdKiri.nama_lengkap}
                        ttdKiriUrl={ttdKiri.ttd_url}
                        ttdKananTeks={ttdKanan.jabatan_teks}
                        ttdKananNama={ttdKanan.nama_lengkap}
                        ttdKananUrl={ttdKanan.ttd_url}
                        mengetahuiKiriTeks={mengetahuiKiri.jabatan_teks}
                        mengetahuiKiriNama={mengetahuiKiri.nama_lengkap}
                        mengetahuiKiriUrl={mengetahuiKiri.ttd_url}
                        mengetahuiKananTeks={mengetahuiKanan.jabatan_teks}
                        mengetahuiKananNama={mengetahuiKanan.nama_lengkap}
                        mengetahuiKananUrl={mengetahuiKanan.ttd_url}
                        daftarAlat={alat.map((a, i) => ({
                            id: i + 1,
                            nama: a.nama_alat,
                            jumlah: a.jumlah,
                        }))}
                        {isKepanitiaan}
                        status={surat.status}
                    />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* 
       A layout simulation of F4 paper sizes (215 x 330 mm = approx 813 x 1247 px). 
       We use transform/scale trick or simple responsive sizing so it fits most screens 
       but maintains the correct aspect ratio for preview. 
    */
    .paper-preview {
        width: 813px;
        min-height: 1247px;
        position: relative;
    }
    .content-wrapper {
        padding: 28px 76px 76px 76px;
        width: 100%;
        box-sizing: border-box;
    }

    @media (max-width: 860px) {
        .paper-preview {
            transform-origin: top left;
            transform: scale(0.8);
            margin-bottom: -250px; /* offset the scaled height */
        }
    }
    @media (max-width: 640px) {
        .paper-preview {
            transform: scale(0.6);
            margin-bottom: -500px;
        }
    }
    @media (max-width: 480px) {
        .paper-preview {
            transform: scale(0.45);
            margin-bottom: -680px;
        }
    }
</style>
