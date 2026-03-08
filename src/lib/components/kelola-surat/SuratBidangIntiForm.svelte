<script>
    import {
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
    } from "$lib/components/UI/card";
    import Button from "$lib/components/UI/Button.svelte";
    import SectionIdentitasTujuan from "./bidang-inti/SectionIdentitasTujuan.svelte";
    import SectionRincianKegiatan from "./bidang-inti/SectionRincianKegiatan.svelte";
    import SectionPenandatangan from "./bidang-inti/SectionPenandatangan.svelte";

    let { onSave, onCancel, isSaving = false, initialData = null } = $props();

    // Helper: Mengubah angka bulan (1-12) menjadi Romawi
    function getRomawiBulan(bulanIndex) {
        const romawi = [
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
            "X",
            "XI",
            "XII",
        ];
        return romawi[bulanIndex];
    }

    // Mendapatkan bulan & tahun saat ini
    const currentDate = new Date();
    const currentRomawi = getRomawiBulan(currentDate.getMonth());
    const currentYear = currentDate.getFullYear();

    // === START: State Formulir Bidang Inti ===
    // Jika initialData ada (mode edit), pakai nilainya; jika tidak, pakai default
    let noUrut = $state(initialData?.noUrut ?? "001");
    let jenisSurat = $state(initialData?.jenisSurat ?? "SU");
    let atributSurat = $state(
        initialData?.atributSurat ?? `UKMK-YDK/${currentRomawi}/${currentYear}`,
    );
    let noSurat = $derived(`${noUrut}/${jenisSurat}/${atributSurat}`);

    let lampiran = $state(initialData?.lampiran ?? "-");
    let perihal = $state(initialData?.perihal ?? "");
    let tglSurat = $state(
        initialData?.tglSurat ?? new Date().toISOString().split("T")[0],
    );

    let kepada = $state(initialData?.kepada ?? "");

    let namaKegiatan = $state(initialData?.namaKegiatan ?? "");
    let hariTglKegiatan = $state(initialData?.hariTglKegiatan ?? "");
    let waktuKegiatan = $state(initialData?.waktuKegiatan ?? "");
    let tempatKegiatan = $state(initialData?.tempatKegiatan ?? "");
    let paragrafPembuka = $state(
        initialData?.paragrafPembuka ??
            "Dalam rangka pelaksanaan kegiatan ..., maka dari itu kami selaku panitia acara ... untuk kegiatan yang akan diselenggarakan pada:",
    );

    let previousNamaKegiatan = $state(initialData?.namaKegiatan ?? "");
    // Auto-sync nama kegiatan ke paragraf pembuka (hanya ketika namaKegiatan berubah)
    $effect(() => {
        if (namaKegiatan !== previousNamaKegiatan) {
            if (
                paragrafPembuka.startsWith("Dalam rangka pelaksanaan kegiatan")
            ) {
                let oldText = previousNamaKegiatan || "...";
                paragrafPembuka = paragrafPembuka.replace(
                    `Dalam rangka pelaksanaan kegiatan ${oldText}`,
                    `Dalam rangka pelaksanaan kegiatan ${namaKegiatan || "..."}`,
                );
            }
            previousNamaKegiatan = namaKegiatan;
        }
    });
    let paragrafPenutup = $state(
        initialData?.paragrafPenutup ??
            "Sehubungan dengan itu, demi kelancaran dan terlaksananya kegiatan ini kami mohon kesediaannya untuk dapat memberikan izin ... tersebut.",
    );

    let daftarAlat = $state(
        initialData?.daftarAlat ?? [{ id: 1, nama: "", jumlah: "" }],
    );
    let isPeminjaman = $state(initialData?.isPeminjaman ?? false);
    let ttdKiriTeks = $state(
        initialData?.ttdKiriTeks ?? "Ketua UKM Kewirausahaan",
    );
    let ttdKiriNama = $state(initialData?.ttdKiriNama ?? "");
    let ttdKiriUrl = $state(initialData?.ttdKiriUrl ?? "");

    let ttdKananTeks = $state(
        initialData?.ttdKananTeks ?? "Sekretaris UKM Kewirausahaan",
    );
    let ttdKananNama = $state(initialData?.ttdKananNama ?? "");
    let ttdKananUrl = $state(initialData?.ttdKananUrl ?? "");

    let mengetahuiTeks = $state(
        initialData?.mengetahuiTeks ?? "Pembina UKM Kewirausahaan",
    );
    let mengetahuiNama = $state(initialData?.mengetahuiNama ?? "");
    let mengetahuiUrl = $state(initialData?.mengetahuiUrl ?? "");
    // === END: State Formulir ===

    function handleSubmit(e) {
        e.preventDefault();
        onSave({
            kategori: "Bidang Inti",
            noUrut: noUrut,
            jenisSurat: jenisSurat,
            atributSurat: atributSurat,
            noSuratFull: noSurat,
            lampiran: lampiran,
            perihal: perihal,
            tglSurat: tglSurat,
            kepada: kepada,
            paragrafPembuka: paragrafPembuka,
            namaKegiatan: namaKegiatan,
            waktuPelaksanaan: `${hariTglKegiatan} / ${waktuKegiatan}`,
            tempatKegiatan: tempatKegiatan,
            isPeminjaman: isPeminjaman,
            daftarAlat: isPeminjaman ? daftarAlat : [],
            paragrafPenutup: paragrafPenutup,
            penandatangan: [
                {
                    posisi_label: "Kiri",
                    jabatan_teks: ttdKiriTeks,
                    nama_lengkap: ttdKiriNama,
                    ttd_url: ttdKiriUrl,
                },
                {
                    posisi_label: "Kanan",
                    jabatan_teks: ttdKananTeks,
                    nama_lengkap: ttdKananNama,
                    ttd_url: ttdKananUrl,
                },
                {
                    posisi_label: "Mengetahui",
                    jabatan_teks: mengetahuiTeks,
                    nama_lengkap: mengetahuiNama,
                    ttd_url: mengetahuiUrl,
                },
            ],
        });
    }
</script>

<Card
    class="border-slate-200 shadow-xl border-t-4 border-t-blue-500 overflow-hidden bg-white/95 backdrop-blur-sm"
>
    <form onsubmit={handleSubmit}>
        <CardHeader class="pb-6 border-b border-slate-100 bg-blue-50/30">
            <CardTitle class="text-2xl text-blue-800 flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                Formulir Surat Bidang Inti
            </CardTitle>
            <CardDescription class="text-slate-600 text-sm">
                Lengkapi rancangan data untuk surat yang akan dikeluarkan oleh
                pengurus inti UKM/Organisasi.
            </CardDescription>
        </CardHeader>

        <div
            class="p-6 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar"
        >
            <!-- SECTION 1 -->
            <SectionIdentitasTujuan
                bind:noUrut
                bind:jenisSurat
                bind:atributSurat
                {noSurat}
                bind:lampiran
                bind:perihal
                bind:tglSurat
                bind:kepada
            />

            <!-- SECTION 2 -->
            <SectionRincianKegiatan
                bind:paragrafPembuka
                bind:namaKegiatan
                bind:hariTglKegiatan
                bind:waktuKegiatan
                bind:tempatKegiatan
                bind:isPeminjaman
                bind:daftarAlat
                bind:paragrafPenutup
            />

            <!-- SECTION 3 -->
            <SectionPenandatangan
                {ttdKiriTeks}
                bind:ttdKiriNama
                bind:ttdKiriUrl
                {ttdKananTeks}
                bind:ttdKananNama
                bind:ttdKananUrl
                {mengetahuiTeks}
                bind:mengetahuiNama
                bind:mengetahuiUrl
            />
        </div>

        <div
            class="px-6 py-5 bg-white border-t border-slate-100 flex justify-end gap-3 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] relative z-10"
        >
            {#if onCancel}
                <Button
                    type="button"
                    variant="outline"
                    class="text-slate-600 border-slate-200 hover:bg-slate-100"
                    onclick={onCancel}>Batal</Button
                >
            {/if}
            <Button
                type="submit"
                disabled={isSaving}
                class="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 px-6 font-semibold disabled:opacity-50"
            >
                {isSaving ? "Menyimpan..." : "Simpan & Preview Surat"}
            </Button>
        </div>
    </form>
</Card>

<style>
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
</style>
