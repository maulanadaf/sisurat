<script>
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
        CardDescription,
    } from "$lib/components/UI/card";
    import Button from "$lib/components/UI/Button.svelte";

    let {
        data = [],
        isFetching = false,
        deletingId = null,
        onTambah,
        onEdit,
        onToggleAktif,
        onHapus,
    } = $props();

    // Mengelompokkan data berdasarkan periode
    let groupedData = $derived(
        data.reduce((acc, current) => {
            const periode = current.periode || "Tanpa Periode";
            if (!acc[periode]) {
                acc[periode] = [];
            }
            acc[periode].push(current);
            return acc;
        }, {}),
    );
</script>

<div class="space-y-6">
    {#if isFetching}
        <Card class="border-slate-200 shadow-sm overflow-hidden">
            <CardContent class="p-12 text-center text-slate-400">
                <div class="flex items-center justify-center gap-2">
                    <svg
                        class="animate-spin w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                    </svg>
                    Memuat data bidang inti...
                </div>
            </CardContent>
        </Card>
    {:else}
        <!-- Header dengan Tombol Tambah (Di luar loop) -->
        <div class="flex items-center justify-end mb-4">
            <Button
                onclick={onTambah}
                class="gap-2 font-semibold bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-white border-transparent shrink-0 cursor-pointer"
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
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                Tambah
            </Button>
        </div>

        {#if Object.keys(groupedData).length === 0}
            <Card class="border-slate-200 shadow-sm overflow-hidden">
                <CardContent class="p-12 text-center text-slate-400">
                    Belum ada data penandatangan bidang inti.
                </CardContent>
            </Card>
        {:else}
            <!-- Loop setiap periode -->
            {#each Object.entries(groupedData) as [periode, items]}
                <Card class="border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader
                        class="border-b border-slate-100 bg-slate-50/50 pb-4 flex flex-row items-center justify-between"
                    >
                        <div>
                            <CardTitle
                                class="text-[var(--primary)] flex items-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    ><rect
                                        x="3"
                                        y="4"
                                        width="18"
                                        height="18"
                                        rx="2"
                                        ry="2"
                                    ></rect><line x1="16" y1="2" x2="16" y2="6"
                                    ></line><line x1="8" y1="2" x2="8" y2="6"
                                    ></line><line x1="3" y1="10" x2="21" y2="10"
                                    ></line></svg
                                >
                                Periode: {periode || "Tidak ada periode"}
                            </CardTitle>
                            <CardDescription>
                                Pejabat Bidang Inti yang menjabat pada periode
                                ini.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent class="p-0 overflow-x-auto">
                        <table class="w-full text-sm text-left">
                            <thead
                                class="bg-slate-100/80 text-slate-600 uppercase text-[11px] font-bold"
                            >
                                <tr>
                                    <th class="px-6 py-4">Nama</th>
                                    <th class="px-6 py-4">Jabatan</th>
                                    <th class="px-6 py-4 text-center">Status</th
                                    >
                                    <th class="px-6 py-4 text-center">TTD</th>
                                    <th class="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                {#each items as item (item.id)}
                                    <tr
                                        class="hover:bg-slate-50 transition-colors"
                                    >
                                        <td
                                            class="px-6 py-4 font-semibold text-slate-800"
                                            >{item.nama}</td
                                        >
                                        <td class="px-6 py-4 text-slate-600"
                                            >{item.jabatan}</td
                                        >
                                        <td class="px-6 py-4 text-center">
                                            <button
                                                onclick={() =>
                                                    onToggleAktif(item)}
                                                class="group"
                                            >
                                                <span
                                                    class="px-2.5 py-1 cursor-pointer rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors
                                                    {item.is_active
                                                        ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                                                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}"
                                                >
                                                    {item.is_active
                                                        ? "Aktif"
                                                        : "Nonaktif"}
                                                </span>
                                            </button>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            {#if item.ttd_url}
                                                <a
                                                    href={item.ttd_url}
                                                    target="_blank"
                                                    class="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
                                                >
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
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                    Lihat
                                                </a>
                                            {:else}
                                                <span
                                                    class="text-xs text-slate-400"
                                                    >–</span
                                                >
                                            {/if}
                                        </td>
                                        <td class="px-6 py-4">
                                            <div
                                                class="flex items-center justify-center gap-2"
                                            >
                                                <button
                                                    class="p-1.5 cursor-pointer text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                    onclick={() => onEdit(item)}
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
                                                <button
                                                    class="p-1.5 cursor-pointer text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                                                    title="Hapus"
                                                    disabled={deletingId ===
                                                        item.id}
                                                    onclick={() =>
                                                        onHapus(item)}
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
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            {/each}
        {/if}
    {/if}
</div>
