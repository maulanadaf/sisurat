<script>
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
    import SuratBidangIntiForm from "$lib/components/kelola-surat/SuratBidangIntiForm.svelte";
    import SuratKepanitiaanForm from "$lib/components/kelola-surat/SuratKepanitiaanForm.svelte";

    let { data } = $props();

    let isSaving = $state(false);

    // Pre-fill dari database — dibuat sekali saat mount (mode edit)
    const initialData = {
        // -- Identitas Surat --
        noUrut: data.surat.nomor_urut ?? "001",
        jenisSurat: data.surat.jenis_surat ?? "SU",
        singkatanKegiatan:
            data.surat.kategori === "Kepanitiaan" && data.surat.atribut_surat
                ? data.surat.atribut_surat.split("/")[0]
                : "",
        atributSurat:
            data.surat.kategori === "Kepanitiaan" &&
            data.surat.atribut_surat &&
            data.surat.atribut_surat.includes("/")
                ? data.surat.atribut_surat.split("/").slice(1).join("/")
                : (data.surat.atribut_surat ?? ""),
        lampiran: data.surat.lampiran ?? "-",
        perihal: data.surat.perihal ?? "",
        tglSurat: data.surat.tgl_surat ?? "",
        kepada: data.surat.kepada ?? "",
        tempatSurat: data.surat.tempat_surat ?? "",
        lokasiTujuan: data.surat.lokasi_tujuan ?? "",

        // -- Rincian Kegiatan (dari surat_konten) --
        paragrafPembuka:
            data.konten?.paragraf_pembuka ??
            "Sehubungan dengan akan dilaksanakannya kegiatan...",
        namaKegiatan: data.konten?.nama_kegiatan ?? "",
        hariTglKegiatan: data.konten?.waktu_pelaksanaan?.split(" / ")[0] ?? "",
        waktuKegiatan: data.konten?.waktu_pelaksanaan?.split(" / ")[1] ?? "",
        tempatKegiatan: data.konten?.tempat_kegiatan ?? "",
        isPeminjaman: data.konten?.is_peminjaman_alat ?? false,
        paragrafPenutup:
            data.konten?.paragraf_penutup ??
            "Demikian surat ini kami sampaikan, atas perhatian dan kerjasamanya kami ucapkan terima kasih.",

        // -- Alat pinjaman (dari surat_alat) --
        daftarAlat:
            data.alat.length > 0
                ? data.alat.map((a, i) => ({
                      id: i + 1,
                      nama: a.nama_alat,
                      jumlah: a.jumlah,
                  }))
                : [{ id: 1, nama: "", jumlah: "" }],

        // -- Penandatangan (dari surat_penandatangan) --
        ttdKiriTeks:
            data.penandatangan.find((p) => p.posisi_label === "Kiri")
                ?.jabatan_teks ?? "Ketua UKM Kewirausahaan",
        ttdKiriNama:
            data.penandatangan.find((p) => p.posisi_label === "Kiri")
                ?.nama_lengkap ?? "",
        ttdKiriUrl:
            data.penandatangan.find((p) => p.posisi_label === "Kiri")
                ?.ttd_url ?? "",
        ttdKananTeks:
            data.penandatangan.find((p) => p.posisi_label === "Kanan")
                ?.jabatan_teks ?? "Sekretaris UKM Kewirausahaan",
        ttdKananNama:
            data.penandatangan.find((p) => p.posisi_label === "Kanan")
                ?.nama_lengkap ?? "",
        ttdKananUrl:
            data.penandatangan.find((p) => p.posisi_label === "Kanan")
                ?.ttd_url ?? "",
        // Kepanitiaan: 4 penandatangan
        // Kepanitiaan/Bidang Inti: 3/4 penandatangan
        mengetahuiKiriTeks:
            data.penandatangan.find(
                (p) =>
                    p.posisi_label === "Mengetahui-Kiri" ||
                    p.posisi_label === "Mengetahui",
            )?.jabatan_teks ??
            (data.surat.kategori === "Bidang Inti"
                ? "Pembina UKM Kewirausahaan"
                : "Ketua UKM Kewirausahaan"),
        mengetahuiKiriNama:
            data.penandatangan.find(
                (p) =>
                    p.posisi_label === "Mengetahui-Kiri" ||
                    p.posisi_label === "Mengetahui",
            )?.nama_lengkap ?? "",
        mengetahuiKiriUrl:
            data.penandatangan.find(
                (p) =>
                    p.posisi_label === "Mengetahui-Kiri" ||
                    p.posisi_label === "Mengetahui",
            )?.ttd_url ?? "",
        mengetahuiKananTeks:
            data.penandatangan.find(
                (p) => p.posisi_label === "Mengetahui-Kanan",
            )?.jabatan_teks ?? "Pembina UKM Kewirausahaan",
        mengetahuiKananNama:
            data.penandatangan.find(
                (p) => p.posisi_label === "Mengetahui-Kanan",
            )?.nama_lengkap ?? "",
        mengetahuiKananUrl:
            data.penandatangan.find(
                (p) => p.posisi_label === "Mengetahui-Kanan",
            )?.ttd_url ?? "",
    };

    async function onSave(formData) {
        isSaving = true;
        try {
            // 1. Update tabel surat
            const { error: suratError } = await supabase
                .from("surat")
                .update({
                    nomor_urut: formData.noUrut,
                    jenis_surat: formData.jenisSurat,
                    atribut_surat: formData.atributSurat,
                    nomor_surat_full: formData.noSuratFull,
                    lampiran: formData.lampiran,
                    perihal: formData.perihal,
                    tgl_surat: formData.tglSurat,
                    kepada: formData.kepada,
                    tempat_surat: formData.tempatSurat,
                    lokasi_tujuan: formData.lokasiTujuan,
                })
                .eq("id", data.surat.id);

            if (suratError) throw suratError;

            // 2. Upsert surat_konten
            const { error: kontenError } = await supabase
                .from("surat_konten")
                .upsert(
                    {
                        surat_id: data.surat.id,
                        paragraf_pembuka: formData.paragrafPembuka,
                        paragraf_penutup: formData.paragrafPenutup,
                        nama_kegiatan: formData.namaKegiatan,
                        waktu_pelaksanaan: `${formData.waktuPelaksanaan}`,
                        tempat_kegiatan: formData.tempatKegiatan,
                        is_peminjaman_alat: formData.isPeminjaman,
                    },
                    { onConflict: "surat_id" },
                );

            if (kontenError) throw kontenError;

            // 3. Hapus & re-insert surat_alat
            await supabase
                .from("surat_alat")
                .delete()
                .eq("surat_id", data.surat.id);
            if (formData.isPeminjaman && formData.daftarAlat.length > 0) {
                const alatPayload = formData.daftarAlat.map((a, i) => ({
                    surat_id: data.surat.id,
                    nama_alat: a.nama || "-",
                    jumlah: a.jumlah || "-",
                    urutan: i + 1,
                }));
                const { error: alatError } = await supabase
                    .from("surat_alat")
                    .insert(alatPayload);
                if (alatError) throw alatError;
            }

            // 4. Hapus & re-insert surat_penandatangan
            await supabase
                .from("surat_penandatangan")
                .delete()
                .eq("surat_id", data.surat.id);
            const ttdPayload = formData.penandatangan.map((ttd) => ({
                surat_id: data.surat.id,
                posisi_label: ttd.posisi_label,
                jabatan_teks: ttd.jabatan_teks || "-",
                nama_lengkap: ttd.nama_lengkap || "-",
                ttd_url: ttd.ttd_url || null,
            }));
            const { error: ttdError } = await supabase
                .from("surat_penandatangan")
                .insert(ttdPayload);
            if (ttdError) throw ttdError;

            alert("Surat berhasil diperbarui!");
            goto("/kelola-surat");
        } catch (err) {
            alert(`Gagal memperbarui surat: ${err.message}`);
            console.error(err);
        } finally {
            isSaving = false;
        }
    }

    function onCancel() {
        goto("/kelola-surat");
    }
</script>

<svelte:head>
    <title>Edit Surat - SiSurat</title>
</svelte:head>

<div class="space-y-6 max-w-5xl mx-auto">
    <div class="flex items-center gap-4">
        <button
            onclick={onCancel}
            class="p-2 h-10 w-10 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm flex items-center justify-center"
            title="Kembali ke Riwayat Surat"
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
        </button>
        <div>
            <h1 class="text-3xl font-bold text-[var(--dark)] tracking-tight">
                Edit Surat
            </h1>
            <p class="text-slate-500 mt-1">
                Perbarui data surat <span class="font-semibold text-slate-700"
                    >{data.surat.nomor_surat_full}</span
                >
            </p>
        </div>
    </div>

    {#if data.surat.kategori === "Bidang Inti"}
        <SuratBidangIntiForm {onSave} {onCancel} {isSaving} {initialData} />
    {:else}
        <SuratKepanitiaanForm {onSave} {onCancel} {isSaving} {initialData} />
    {/if}
</div>
