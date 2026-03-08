<script>
    let {
        filtered = [],
        totalLength = 0,
        searchQuery = "",
        filterKategori = "Semua",
        onResetFilter,
    } = $props();

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
                        <td class="px-6 py-4 text-slate-500 whitespace-nowrap">
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
                            <div class="flex items-center justify-center gap-2">
                                <!-- Tombol Lihat / Cetak -->
                                <button
                                    class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
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
                                    {searchQuery || filterKategori !== "Semua"
                                        ? "Tidak ada surat yang cocok dengan filter."
                                        : "Belum ada surat yang diarsipkan."}
                                </p>
                                {#if searchQuery || filterKategori !== "Semua"}
                                    <button
                                        onclick={onResetFilter}
                                        class="text-sm text-[var(--primary)] hover:underline cursor-pointer"
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
            Menampilkan {filtered.length} dari {totalLength} surat
        </div>
    {/if}
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
