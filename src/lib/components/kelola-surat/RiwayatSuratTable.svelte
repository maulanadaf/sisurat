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

    let { data = [] } = $props();

    let deletingId = $state(null);

    const MAX_RIWAYAT = 5;
    const displayed = $derived(data.slice(0, MAX_RIWAYAT));
    const sisaCount = $derived(data.length - MAX_RIWAYAT);

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
                                {surat.status === 'Terkirim'
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-amber-50 text-amber-600'}"
                            >
                                {surat.status}
                            </span>
                        </td>
                        <td class="px-6 py-4 w-[140px]">
                            <div class="flex items-center justify-center gap-2">
                                <!-- Tombol Lihat / Cetak -->
                                <button
                                    class="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                                    class="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                    title="Edit Surat"
                                    disabled={deletingId === surat.id}
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
                {#if data.length === 0}
                    <tr>
                        <td
                            colspan="6"
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
                <a
                    href="/arsip"
                    class="text-[var(--primary)] hover:underline font-medium flex items-center gap-1"
                >
                    Lihat semua di Arsip Surat
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
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </a>
            </div>
        {/if}
    </CardContent>
</Card>
