<script>
    import { goto } from "$app/navigation";
    import SuratKepanitiaanForm from "$lib/components/kelola-surat/SuratKepanitiaanForm.svelte";
    import { supabase } from "$lib/supabaseClient";

    let isSaving = $state(false);

    async function onSave(data) {
        try {
            isSaving = true;

            // 1. Insert into surat
            const { data: suratData, error: suratError } = await supabase
                .from("surat")
                .insert([
                    {
                        kategori: data.kategori,
                        nomor_urut: data.noUrut,
                        jenis_surat: data.jenisSurat,
                        atribut_surat: data.atributSurat,
                        nomor_surat_full: data.noSuratFull,
                        lampiran: data.lampiran,
                        perihal: data.perihal,
                        tgl_surat: data.tglSurat,
                        kepada: data.kepada,
                    },
                ])
                .select()
                .single();

            if (suratError) throw suratError;

            const suratId = suratData.id;

            // 2. Insert into surat_konten
            const { error: kontenError } = await supabase
                .from("surat_konten")
                .insert([
                    {
                        surat_id: suratId,
                        paragraf_pembuka: data.paragrafPembuka,
                        paragraf_penutup: data.paragrafPenutup,
                        nama_kegiatan: data.namaKegiatan,
                        waktu_pelaksanaan: data.waktuPelaksanaan,
                        tempat_kegiatan: data.tempatKegiatan,
                        is_peminjaman_alat: data.isPeminjaman,
                    },
                ]);

            if (kontenError) throw kontenError;

            // 3. Insert into surat_alat
            if (data.isPeminjaman && data.daftarAlat.length > 0) {
                const alatPayload = data.daftarAlat.map((alat, index) => ({
                    surat_id: suratId,
                    nama_alat: alat.nama || "-",
                    jumlah: alat.jumlah || "-",
                    urutan: index + 1,
                }));
                const { error: alatError } = await supabase
                    .from("surat_alat")
                    .insert(alatPayload);
                if (alatError) throw alatError;
            }

            // 4. Insert into surat_penandatangan
            if (data.penandatangan && data.penandatangan.length > 0) {
                const ttdPayload = data.penandatangan.map((ttd) => ({
                    surat_id: suratId,
                    posisi_label: ttd.posisi_label,
                    jabatan_teks: ttd.jabatan_teks || "-",
                    nama_lengkap: ttd.nama_lengkap || "-",
                    ttd_url: ttd.ttd_url || null,
                }));
                const { error: ttdError } = await supabase
                    .from("surat_penandatangan")
                    .insert(ttdPayload);
                if (ttdError) throw ttdError;
            }

            alert(
                `Surat Kepanitiaan Tujuan: ${data.kepada}\nPerihal: ${data.perihal}\nBerhasil Disimpan!`,
            );
            goto("/kelola-surat");
        } catch (error) {
            alert(`Gagal menyimpan data ke database: ${error.message}`);
            console.error(error);
        } finally {
            isSaving = false;
        }
    }

    function onCancel() {
        goto("/kelola-surat/buat");
    }
</script>

<svelte:head>
    <title>Surat Kepanitiaan - SiSurat</title>
</svelte:head>

<div class="space-y-6 max-w-5xl mx-auto">
    <div class="flex items-center gap-4">
        <button
            onclick={onCancel}
            class="p-2 h-10 w-10 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm flex items-center justify-center cursor-pointer"
            title="Kembali ke Pilihan Surat"
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
                Buat Surat Keluar (Kepanitiaan)
            </h1>
            <p class="text-slate-500 mt-1">
                Lengkapi rancangan data surat operasional spesifik yang dibuat
                oleh pelaksana kegiatan.
            </p>
        </div>
    </div>

    <!-- Form -->
    <SuratKepanitiaanForm {onSave} {onCancel} {isSaving} />
</div>
