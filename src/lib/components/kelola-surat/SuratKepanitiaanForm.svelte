<script>
    import {
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
    } from "$lib/components/UI/card";
    import Button from "$lib/components/UI/Button.svelte";
    import SectionIdentitasTujuan from "./kepanitiaan/SectionIdentitasTujuan.svelte";
    import SectionRincianKegiatan from "./kepanitiaan/SectionRincianKegiatan.svelte";
    import SectionPenandatangan from "./kepanitiaan/SectionPenandatangan.svelte";

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

    const currentDate = new Date();
    const currentRomawi = getRomawiBulan(currentDate.getMonth());
    const currentYear = currentDate.getFullYear();

    // === START: State Formulir Kepanitiaan ===
    let noUrut = $state(initialData?.noUrut ?? "001");
    let jenisSurat = $state(initialData?.jenisSurat ?? "SU");
    let namaKegiatan = $state(initialData?.namaKegiatan ?? "");
    let singkatanKegiatan = $state(initialData?.singkatanKegiatan ?? "");
    let atributSurat = $state(
        initialData?.atributSurat ?? `UKMK-YDK/${currentRomawi}/${currentYear}`,
    );
    let noSurat = $derived(
        `${noUrut}/${jenisSurat}/${singkatanKegiatan || "<Kegiatan>"}/${atributSurat || "<Atribut>"}`,
    );

    let lampiran = $state(initialData?.lampiran ?? "-");
    let perihal = $state(initialData?.perihal ?? "");
    let tempatSurat = $state(initialData?.tempatSurat ?? "Bangil");
    let tglSurat = $state(
        initialData?.tglSurat ?? new Date().toISOString().split("T")[0],
    );

    let kepada = $state(initialData?.kepada ?? "");
    let lokasiTujuan = $state(initialData?.lokasiTujuan ?? "");

    let hariTglKegiatan = $state(initialData?.hariTglKegiatan ?? "");
    let waktuKegiatan = $state(initialData?.waktuKegiatan ?? "");
    let tempatKegiatan = $state(initialData?.tempatKegiatan ?? "");
    let paragrafPembuka = $state(
        initialData?.paragrafPembuka ??
            "Merujuk pada program kerja UKM Kewirausahaan Yadika Pasuruan, kami bermaksud untuk menyelenggarakan kegiatan:",
    );
    let paragrafPenutup = $state(
        initialData?.paragrafPenutup ??
            "Demikian surat ini kami sampaikan. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.",
    );

    let isPeminjaman = $state(initialData?.isPeminjaman ?? false);
    let daftarAlat = $state(
        initialData?.daftarAlat ?? [{ id: 1, nama: "", jumlah: "" }],
    );

    let ttdKiriTeks = $state(initialData?.ttdKiriTeks ?? "Ketua Pelaksana");
    let ttdKiriNama = $state(initialData?.ttdKiriNama ?? "");
    let ttdKananTeks = $state(
        initialData?.ttdKananTeks ?? "Sekretaris Pelaksana",
    );
    let ttdKananNama = $state(initialData?.ttdKananNama ?? "");

    let mengetahuiKiriTeks = $state(
        initialData?.mengetahuiKiriTeks ?? "Ketua UKM Kewirausahaan",
    );
    let mengetahuiKiriNama = $state(initialData?.mengetahuiKiriNama ?? "");
    let mengetahuiKananTeks = $state(
        initialData?.mengetahuiKananTeks ?? "Pembina UKM Kewirausahaan",
    );
    let mengetahuiKananNama = $state(initialData?.mengetahuiKananNama ?? "");
    // === END: State Formulir ===

    function handleSubmit(e) {
        e.preventDefault();
        onSave({
            kategori: "Kepanitiaan",
            noUrut,
            jenisSurat,
            atributSurat: `${singkatanKegiatan}/${atributSurat}`,
            noSuratFull: noSurat,
            lampiran,
            perihal,
            tglSurat,
            kepada,
            tempatSurat,
            lokasiTujuan,
            namaKegiatan,
            waktuPelaksanaan: `${hariTglKegiatan} / ${waktuKegiatan}`,
            tempatKegiatan,
            isPeminjaman,
            daftarAlat: isPeminjaman ? daftarAlat : [],
            paragrafPembuka,
            paragrafPenutup,
            penandatangan: [
                {
                    posisi_label: "Kiri",
                    jabatan_teks: ttdKiriTeks,
                    nama_lengkap: ttdKiriNama,
                },
                {
                    posisi_label: "Kanan",
                    jabatan_teks: ttdKananTeks,
                    nama_lengkap: ttdKananNama,
                },
                {
                    posisi_label: "Mengetahui-Kiri",
                    jabatan_teks: mengetahuiKiriTeks,
                    nama_lengkap: mengetahuiKiriNama,
                },
                {
                    posisi_label: "Mengetahui-Kanan",
                    jabatan_teks: mengetahuiKananTeks,
                    nama_lengkap: mengetahuiKananNama,
                },
            ],
        });
    }
</script>

<Card
    class="border-slate-200 shadow-xl border-t-4 border-t-emerald-500 overflow-hidden bg-white/95 backdrop-blur-sm"
>
    <form onsubmit={handleSubmit}>
        <CardHeader class="pb-6 border-b border-slate-100 bg-emerald-50/30">
            <CardTitle
                class="text-2xl text-emerald-800 flex items-center gap-2"
            >
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                Formulir Surat Kepanitiaan
            </CardTitle>
            <CardDescription class="text-slate-600 text-sm">
                Lengkapi rancangan data untuk surat operasional yang akan
                dikeluarkan oleh panitia pelaksanaan kegiatan.
            </CardDescription>
        </CardHeader>

        <div
            class="p-6 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar"
        >
            <!-- SECTION 1 -->
            <SectionIdentitasTujuan
                bind:noUrut
                bind:jenisSurat
                {noSurat}
                bind:singkatanKegiatan
                bind:atributSurat
                bind:lampiran
                bind:perihal
                bind:tempatSurat
                bind:tglSurat
                bind:kepada
                bind:lokasiTujuan
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
                {ttdKananTeks}
                bind:ttdKananNama
                {mengetahuiKiriTeks}
                bind:mengetahuiKiriNama
                {mengetahuiKananTeks}
                bind:mengetahuiKananNama
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
                class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30 px-6 font-semibold disabled:opacity-50"
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
