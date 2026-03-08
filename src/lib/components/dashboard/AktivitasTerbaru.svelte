<script>
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
    } from "$lib/components/UI/card";

    let { recentSurat = [], isLoading = false } = $props();

    function timeAgo(dateStr) {
        if (!dateStr) return "Waktu tidak diketahui";
        const date = new Date(dateStr);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return "Baru saja";
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return `Kemarin`;
        if (diffInDays < 30) return `${diffInDays} hari yang lalu`;

        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
        });
    }
</script>

<Card
    class="shadow-sm border-0 ring-1 ring-slate-100 h-full flex flex-col min-h-[400px]"
>
    <CardHeader
        class="border-b border-slate-50 pb-5 flex flex-row items-center justify-between"
    >
        <CardTitle class="text-[var(--dark)] text-lg"
            >Aktivitas Terakhir</CardTitle
        >
        <a
            class="text-xs text-indigo-600 font-bold p-0 h-auto hover:bg-transparent hover:text-indigo-800 transition-colors"
            href="/arsip">Lihat Semua</a
        >
    </CardHeader>
    <CardContent class="flex-1 overflow-y-auto pt-6 px-1">
        {#if isLoading}
            <div class="flex items-center justify-center h-full">
                <div
                    class="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"
                ></div>
            </div>
        {:else if recentSurat.length === 0}
            <div
                class="flex flex-col items-center justify-center h-full text-center space-y-3 pb-8"
            >
                <div
                    class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-slate-600">
                        Belum ada aktivitas
                    </p>
                    <p class="text-xs text-slate-400 mt-1">
                        Buat surat pertama Anda untuk melihat riwayatnya di
                        sini.
                    </p>
                </div>
            </div>
        {:else}
            <div class="space-y-5 px-5">
                <div
                    class="absolute w-px h-[calc(100%-80px)] bg-slate-100 left-9 top-24 -z-10"
                ></div>
                {#each recentSurat as surat}
                    <a
                        href="/cetak/{surat.id}"
                        target="_blank"
                        class="flex gap-4 group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
                    >
                        <div
                            class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative bg-white ring-4 ring-white shadow-sm mt-0.5
                            {surat.kategori === 'Bidang Inti'
                                ? 'text-indigo-500 bg-indigo-50 border border-indigo-100'
                                : 'text-emerald-500 bg-emerald-50 border border-emerald-100'}"
                        >
                            {#if surat.kategori === "Bidang Inti"}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2.5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            {:else}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2.5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            {/if}
                        </div>
                        <div>
                            <p
                                class="text-sm text-slate-800 font-bold group-hover:text-indigo-600 transition-colors line-clamp-1 leading-snug"
                            >
                                {surat.perihal}
                            </p>
                            <p
                                class="text-xs text-slate-500 font-medium font-mono mt-0.5"
                            >
                                {surat.noSurat}
                            </p>
                            <p
                                class="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-3 h-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {timeAgo(surat.created_at)}
                            </p>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </CardContent>
</Card>
