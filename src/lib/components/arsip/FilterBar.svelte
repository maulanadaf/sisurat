<script>
    let { searchQuery = $bindable(""), filterKategori = $bindable("Semua") } =
        $props();

    const kategoriList = ["Semua", "Bidang Inti", "Kepanitiaan"];
</script>

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
                class="px-4 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer
                {filterKategori === kat
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}"
            >
                {kat}
            </button>
        {/each}
    </div>
</div>
