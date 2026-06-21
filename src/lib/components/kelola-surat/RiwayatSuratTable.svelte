<script>
    import {
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
    } from "$lib/components/UI/card";
    import { goto, invalidateAll } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
    import { getNextNomorUrut } from "$lib/utils/surat";

    let { data = [] } = $props();

    let deletingId = $state(null);

    let showAll = $state(false);
    const MAX_RIWAYAT = 5;
    const displayed = $derived(showAll ? data : data.slice(0, MAX_RIWAYAT));
    const sisaCount = $derived(showAll ? 0 : data.length - MAX_RIWAYAT);

    function handleEdit(surat) {
        goto(`/kelola-surat/edit/${surat.id}`);
    }

    async function handleHapus(surat) {
        const konfirmasi = confirm(
            `Yakin ingin menghapus surat berikut?\n\nNo. Surat: ${surat.noSurat}\nPerihal: ${surat.perihal}\n\nTindakan ini tidak dapat dibatalkan.`,
        );
        if (!konfirmasi) return;

        deletingId = surat.id;
        try {
            const { error } = await supabase
                .from("surat")
                .delete()
                .eq("id", surat.id);

            if (error) throw error;

            // Refresh data dari server (load function dijalankan ulang)
            await invalidateAll();
        } catch (err) {
            alert(`Gagal menghapus surat: ${err.message}`);
            console.error(err);
        } finally {
            deletingId = null;
        }
    }

    let updatingId = $state(null);
    async function handleArsipkan(surat) {
        const konfirmasi = confirm(
            `Tandai surat "${surat.perihal}" sebagai Selesai / Arsip?`,
        );
        if (!konfirmasi) return;

        updatingId = surat.id;
        try {
            // Update status ke 'Selesai'. Sesuaikan jika field statusnya beda.
            const { error } = await supabase
                .from("surat")
                .update({ status: "Selesai" })
                .eq("id", surat.id);

            if (error) throw error;
            await invalidateAll();
        } catch (err) {
            alert(`Gagal mengarsipkan surat: ${err.message}`);
        } finally {
            updatingId = null;
        }
    }

    let duplicatingId = $state(null);
    async function handleDuplikat(suratSummary) {
        const konfirmasi = confirm(
            `Duplikat surat "${suratSummary.perihal}"?\nSurat baru akan otomatis mendapatkan nomor urut terbaru.`,
        );
        if (!konfirmasi) return;

        duplicatingId = suratSummary.id;
        try {
            // 1. Fetch data original
            const { data: originalSurat, error: errSurat } = await supabase.from('surat').select('*').eq('id', suratSummary.id).single();
            if (errSurat) throw errSurat;

            const { data: originalKonten } = await supabase.from('surat_konten').select('*').eq('surat_id', suratSummary.id).single();
            const { data: originalAlat } = await supabase.from('surat_alat').select('*').eq('surat_id', suratSummary.id);
            const { data: originalTtd } = await supabase.from('surat_penandatangan').select('*').eq('surat_id', suratSummary.id);

            // 2. Generate nomor baru
            const nextNoUrut = await getNextNomorUrut(originalSurat.kategori);
            const newNoSuratFull = `${nextNoUrut}/${originalSurat.jenis_surat}/${originalSurat.atribut_surat}`;

            // 3. Insert surat baru
            const { id: _, created_at: __, ...suratTanpaId } = originalSurat;
            const { data: newSurat, error: errNewSurat } = await supabase
                .from('surat')
                .insert([{ 
                    ...suratTanpaId, 
                    nomor_urut: nextNoUrut, 
                    nomor_surat_full: newNoSuratFull,
                    status: 'Draft', // Set kembali ke Draft
                    tgl_surat: new Date().toISOString().split("T")[0] // Set tanggal ke hari ini
                }])
                .select()
                .single();
            if (errNewSurat) throw errNewSurat;
            
            const newSuratId = newSurat.id;

            // 4. Insert konten
            if (originalKonten) {
                const { id: _kId, surat_id: _kSId, ...kontenTanpaId } = originalKonten;
                await supabase.from('surat_konten').insert([{ ...kontenTanpaId, surat_id: newSuratId }]);
            }

            // 5. Insert alat
            if (originalAlat && originalAlat.length > 0) {
                const alatPayload = originalAlat.map(({id, surat_id, ...rest}) => ({ ...rest, surat_id: newSuratId }));
                await supabase.from('surat_alat').insert(alatPayload);
            }

            // 6. Insert penandatangan
            if (originalTtd && originalTtd.length > 0) {
                const ttdPayload = originalTtd.map(({id, surat_id, ...rest}) => ({ ...rest, surat_id: newSuratId }));
                await supabase.from('surat_penandatangan').insert(ttdPayload);
            }

            alert("Surat berhasil diduplikasi!");
            await invalidateAll();
        } catch (err) {
            alert(`Gagal menduplikat surat: ${err.message}`);
            console.error(err);
        } finally {
            duplicatingId = null;
        }
    }
</script>

<Card class="border-slate-200 shadow-sm mt-8">
    <CardHeader class="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle class="text-[var(--primary)]">Riwayat Surat Keluar</CardTitle
        >
        <CardDescription
            >Daftar semua surat keluar yang telah diarsipkan ke dalam sistem.</CardDescription
        >
    </CardHeader>
    <CardContent class="p-0 overflow-x-auto">
        <table class="w-full text-sm text-left">
            <thead
                class="bg-slate-100/80 text-slate-600 uppercase text-[11px] font-bold"
            >
                <tr>
                    <th class="px-6 py-4">No. Surat</th>
                    <th class="px-6 py-4">Tanggal</th>
                    <th class="px-6 py-4">Kategori & Jenis</th>
                    <th class="px-6 py-4">Pihak Tujuan</th>
                    <th class="px-6 py-4">Perihal</th>
                    <th class="px-6 py-4">Status</th>
                    <th class="px-6 py-4 text-center">Aksi</th>
                    <th class="w-6 shrink-0"></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                {#each displayed as surat (surat.id)}
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td
                            class="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap"
                            >{surat.noSurat}</td
                        >
                        <td class="px-6 py-4 text-slate-500 whitespace-nowrap"
                            >{surat.tanggal}</td
                        >
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium {surat.kategori === 'Kepanitiaan' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}">
                                {surat.kategori}
                            </span>
                            <div class="text-[10px] text-slate-500 mt-0.5 pl-1">{surat.jenisSurat}</div>
                        </td>
                        <td class="px-6 py-4 text-slate-700">{surat.pihak}</td>
                        <td
                            class="px-6 py-4 text-slate-600 max-w-[200px] truncate"
                            title={surat.perihal}
                        >
                            {surat.perihal}
                        </td>
                        <td class="px-6 py-4">
                            <span
                                class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                {surat.status === 'Selesai'
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-amber-50 text-amber-600'}"
                            >
                                {surat.status === "Selesai"
                                    ? "Selesai"
                                    : "Draft"}
                            </span>
                        </td>
                        <td class="px-6 py-4 w-[140px]">
                            <div class="flex items-center justify-center gap-2">
                                <!-- Tombol Selesai / Arsipkan -->
                                <button
                                    class="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                    title="Tandai Selesai & Arsipkan"
                                    disabled={updatingId === surat.id ||
                                        surat.status === "Selesai"}
                                    onclick={() => handleArsipkan(surat)}
                                    aria-label="Tandai Selesai"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        ><path d="m9 12 2 2 4-4" /><path
                                            d="M5 18v-6a6 6 0 0 1 6-6h2"
                                        /><path d="M9 16.5 5 21l-4-4.5" /><path
                                            d="M14 6.5 18 2l4 4.5"
                                        /><path
                                            d="M19 18v-6a6 6 0 0 0-6-6h-2"
                                        /></svg
                                    >
                                </button>

                                <!-- Tombol Lihat Detail (dulu Cetak PDF) -->
                                <button
                                    class="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                    title="Lihat Detail Surat"
                                    onclick={() =>
                                        goto(
                                            `/kelola-surat/detail/${surat.id}`,
                                        )}
                                    aria-label="Lihat Detail"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </button>

                                <!-- Tombol Duplikat -->
                                <button
                                    class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                    title="Duplikat Surat"
                                    disabled={duplicatingId === surat.id}
                                    onclick={() => handleDuplikat(surat)}
                                    aria-label="Duplikat Surat"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                    </svg>
                                </button>

                                <!-- Tombol Edit -->
                                <button
                                    class="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                    title="Edit Surat"
                                    disabled={deletingId === surat.id}
                                    onclick={() => handleEdit(surat)}
                                    aria-label="Edit Surat"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4"
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
                                </button>

                                <!-- Tombol Hapus -->
                                <button
                                    class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                    title="Hapus Surat"
                                    disabled={deletingId === surat.id}
                                    onclick={() => handleHapus(surat)}
                                    aria-label="Hapus Surat"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </td>
                        <td class="w-6 shrink-0"></td>
                    </tr>
                {/each}
                {#if data.length === 0}
                    <tr>
                        <td
                            colspan="7"
                            class="px-6 py-12 text-center text-slate-400"
                        >
                            Belum ada riwayat pencatatan surat keluar.
                        </td>
                    </tr>
                {/if}
            </tbody>
        </table>
        {#if sisaCount > 0}
            <div
                class="flex items-center justify-between px-6 py-3 bg-slate-50 border-t border-slate-100 text-sm"
            >
                <span class="text-slate-500">
                    + {sisaCount} surat lainnya tidak ditampilkan
                </span>
                <button
                    onclick={() => showAll = true}
                    class="text-[var(--primary)] hover:underline font-medium flex items-center gap-1 cursor-pointer"
                >
                    Tampilkan Semua Surat
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </div>
        {/if}
    </CardContent>
</Card>
