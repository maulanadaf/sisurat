<script>
    import { onMount } from "svelte";
    import Letterhead from "$lib/components/surat/Letterhead.svelte";
    import LetterBody from "$lib/components/surat/LetterBody.svelte";

    let { data } = $props();
    const { surat, konten, penandatangan } = data;

    // Mapping Penandatangan
    const ttdKiri = penandatangan.find((p) => p.posisi_label === "Kiri") || {};
    const ttdKanan =
        penandatangan.find((p) => p.posisi_label === "Kanan") || {};
    const mengetahuiKiri =
        penandatangan.find(
            (p) =>
                p.posisi_label === "Mengetahui-Kiri" ||
                p.posisi_label === "Mengetahui",
        ) || {};
    const mengetahuiKanan =
        penandatangan.find((p) => p.posisi_label === "Mengetahui-Kanan") || {};

    onMount(() => {
        // Otomatis buka dialog print saat halaman dimuat
        setTimeout(() => {
            window.print();
        }, 800);
    });
</script>

<svelte:head>
    <title>Cetak Surat - {surat.nomor_surat_full || "Untitled"}</title>
    <!-- Kunci viewport ke lebar tetap agar ukuran kertas tidak berubah saat browser di-zoom -->
    <meta name="viewport" content="width=900, initial-scale=1.0" />
</svelte:head>

<!-- Tombol Cetak Manual (Hanya tampil di layar) -->
<div class="print-control fixed top-6 right-6 z-50">
    <button
        onclick={() => window.print()}
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 font-medium transition-all print:hidden"
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
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
        </svg>
        Cetak PDF (F4)
    </button>
</div>

<!-- Lembar F4 -->
<div
    class="page-container flex justify-center bg-slate-200 min-h-screen py-10 print:py-0 print:bg-white"
>
    <div class="paper shadow-2xl bg-white print:shadow-none">
        <div class="content-wrapper">
            <Letterhead />

            <div class="mt-8">
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
                    hariTglKegiatan={konten?.waktu_pelaksanaan?.split(" / ")[0]}
                    waktuKegiatan={konten?.waktu_pelaksanaan?.split(" / ")[1]}
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
                    daftarAlat={data.alat.map((a, i) => ({
                        id: i + 1,
                        nama: a.nama_alat,
                        jumlah: a.jumlah,
                    }))}
                />
            </div>
        </div>
    </div>
</div>

<style>
    /* Reset margin bawaan browser dan setel ukuran kertas ke F4 (215 x 330 mm) */
    @page {
        size: 215mm 330mm; /* Standar Ukuran F4 di Indonesia */
        margin: 0;
    }

    /* Tampilan di layar: kertas diunci ke px absolut agar tidak terpengaruh zoom browser */
    @media screen {
        .page-container {
            overflow-x: auto; /* Scroll horizontal jika viewport lebih kecil dari kertas */
        }

        .paper {
            /* 215mm = 813px, 330mm = 1247px pada 96dpi */
            width: 813px;
            min-height: 1247px;
            flex-shrink: 0;
            position: relative;
        }
    }

    /* Margin dalam kertas (px): 2cm=76px, 0.75cm=28px */
    .content-wrapper {
        padding: 28px 76px 76px 76px;
        width: 100%;
        box-sizing: border-box;
    }

    /* Aturan khusus saat diprint/ekspor PDF */
    @media print {
        :global(body) {
            background-color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        .print-control {
            display: none !important;
        }

        .page-container {
            overflow: visible !important;
            padding: 0 !important;
            background: white !important;
        }

        .paper {
            box-shadow: none !important;
            /* Saat cetak: gunakan mm agar akurasi printer terjaga */
            width: 215mm !important;
            min-height: 330mm !important;
            margin: 0 auto !important;
        }

        .content-wrapper {
            padding: 0.75cm 2cm 2cm 2cm !important;
        }
    }
</style>
