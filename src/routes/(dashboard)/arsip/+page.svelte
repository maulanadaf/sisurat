<script>
    import { supabase } from "$lib/supabaseClient";
    import { goto, invalidateAll } from "$app/navigation";

    let { data } = $props();
    let arsipSurat = $derived(data.arsipSurat);

    // Filter & search state
    let searchQuery = $state("");
    let filterKategori = $state("Semua");
    let deletingId = $state(null);

    const kategoriList = ["Semua", "Bidang Inti", "Kepanitiaan"];

    const filtered = $derived(
        arsipSurat.filter((s) => {
            const cocokKategori =
                filterKategori === "Semua" || s.kategori === filterKategori;
            const q = searchQuery.toLowerCase();
            const cocokSearch =
                !q ||
                s.noSurat.toLowerCase().includes(q) ||
                s.perihal.toLowerCase().includes(q) ||
                s.pihak.toLowerCase().includes(q);
            return cocokKategori && cocokSearch;
        }),
    );

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
            await invalidateAll();
        } catch (err) {
            alert(`Gagal menghapus surat: ${err.message}`);
            console.error(err);
        } finally {
            deletingId = null;
        }
    }

    function formatTanggal(tgl) {
        if (!tgl) return "-";
        const d = new Date(tgl);
        return d.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }
</script>

<svelte:head>
    <title>Arsip Surat - SiSurat</title>
</svelte:head>

<div class="space-y-6">
    <!-- Header -->
    <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
        <div>
            <h1 class="text-3xl font-bold text-[var(--dark)] tracking-tight">
                Arsip Surat
            </h1>
            <p class="text-slate-500 mt-1">
                Seluruh riwayat surat keluar yang telah dicatat dalam sistem.
            </p>
        </div>
        <div
            class="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-xl font-medium"
        >
            Total: <strong class="text-slate-700">{arsipSurat.length}</strong> surat
        </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="flex flex-col sm:flex-row gap-3">
        <!-- Search -->
        <div
            class="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-[var(--primary)] focus-within:border-[var(--primary)] transition-all"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-slate-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
            <input
                type="text"
                bind:value={searchQuery}
                placeholder="Cari nomor surat, perihal, atau pihak tujuan..."
                class="flex-1 text-sm bg-transparent focus:outline-none text-slate-700 placeholder:text-slate-400"
            />
        </div>

        <!-- Filter Kategori -->
        <div class="flex flex-wrap gap-2 shrink-0 pb-1 sm:pb-0">
            {#each kategoriList as kat}
                <button
                    onclick={() => (filterKategori = kat)}
                    class="px-4 py-2.5 rounded-xl text-sm font-medium border transition-all
                    {filterKategori === kat
                        ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}"
                >
                    {kat}
                </button>
            {/each}
        </div>
    </div>

    <!-- Tabel Arsip -->
    <div
        class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden w-full"
    >
        <div class="overflow-x-auto w-full custom-scrollbar">
            <table class="w-full text-sm text-left min-w-[800px]">
                <thead
                    class="bg-slate-100/80 text-slate-600 uppercase text-[11px] font-bold"
                >
                    <tr>
                        <th class="px-6 py-4">No. Surat</th>
                        <th class="px-6 py-4">Tanggal</th>
                        <th class="px-6 py-4">Pihak Tujuan</th>
                        <th class="px-6 py-4">Perihal</th>
                        <th class="px-6 py-4">Kategori</th>
                        <th class="px-6 py-4 text-center">Aksi</th>
                        <th class="w-6 shrink-0"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    {#each filtered as surat (surat.id)}
                        <tr class="hover:bg-slate-50 transition-colors group">
                            <td
                                class="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap"
                            >
                                {surat.noSurat}
                            </td>
                            <td
                                class="px-6 py-4 text-slate-500 whitespace-nowrap"
                            >
                                {formatTanggal(surat.tanggal)}
                            </td>
                            <td
                                class="px-6 py-4 text-slate-700 max-w-[180px] truncate"
                                title={surat.pihak}
                            >
                                {surat.pihak}
                            </td>
                            <td
                                class="px-6 py-4 text-slate-600 max-w-[200px] truncate"
                                title={surat.perihal}
                            >
                                {surat.perihal}
                            </td>
                            <td class="px-6 py-4">
                                <span
                                    class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                    {surat.kategori === 'Bidang Inti'
                                        ? 'bg-blue-50 text-blue-600'
                                        : surat.kategori === 'Kepanitiaan'
                                          ? 'bg-emerald-50 text-emerald-600'
                                          : 'bg-slate-100 text-slate-500'}"
                                >
                                    {surat.kategori}
                                </span>
                            </td>
                            <td class="px-0 py-4">
                                <div
                                    class="flex items-center justify-center gap-2"
                                >
                                    <!-- Tombol Lihat / Cetak -->
                                    <button
                                        class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="Lihat Detail / Cetak PDF"
                                        onclick={() =>
                                            window.open(
                                                "/cetak/" + surat.id,
                                                "_blank",
                                            )}
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

                                    <!-- Tombol Edit -->
                                    <button
                                        class="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit Surat"
                                        onclick={() => handleEdit(surat)}
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
                                        class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                        title="Hapus Surat"
                                        disabled={deletingId === surat.id}
                                        onclick={() => handleHapus(surat)}
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

                    {#if filtered.length === 0}
                        <tr>
                            <td colspan="6" class="px-6 py-16 text-center">
                                <div
                                    class="flex flex-col items-center gap-3 text-slate-400"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-12 h-12 text-slate-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                    <p class="font-medium text-slate-500">
                                        {searchQuery ||
                                        filterKategori !== "Semua"
                                            ? "Tidak ada surat yang cocok dengan filter."
                                            : "Belum ada surat yang diarsipkan."}
                                    </p>
                                    {#if searchQuery || filterKategori !== "Semua"}
                                        <button
                                            onclick={() => {
                                                searchQuery = "";
                                                filterKategori = "Semua";
                                            }}
                                            class="text-sm text-[var(--primary)] hover:underline"
                                        >
                                            Reset filter
                                        </button>
                                    {/if}
                                </div>
                            </td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>

        <!-- Footer -->
        {#if filtered.length > 0}
            <div
                class="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 text-right"
            >
                Menampilkan {filtered.length} dari {arsipSurat.length} surat
            </div>
        {/if}
    </div>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar {
        height: 6px;
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
