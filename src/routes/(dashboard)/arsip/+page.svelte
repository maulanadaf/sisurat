<script>
    import { supabase } from "$lib/supabaseClient";
    import { goto, invalidateAll } from "$app/navigation";
    import FilterBar from "$lib/components/arsip/FilterBar.svelte";
    import TableArsip from "$lib/components/arsip/TableArsip.svelte";

    let { data } = $props();
    let arsipSurat = $derived(data.arsipSurat);

    // Filter & search state
    let searchQuery = $state("");
    let filterKategori = $state("Semua");
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

    <FilterBar bind:searchQuery bind:filterKategori />

    <TableArsip
        {filtered}
        totalLength={arsipSurat.length}
        {searchQuery}
        {filterKategori}
        onResetFilter={() => {
            searchQuery = "";
            filterKategori = "Semua";
        }}
    />
</div>
