<script>
    import { onMount } from "svelte";
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
    } from "$lib/components/UI/card";
    import Button from "$lib/components/UI/Button.svelte";
    import { supabase } from "$lib/supabaseClient";

    let allSurat = $state([]);
    let totalSurat = $state(0);
    let totalBidangInti = $state(0);
    let totalKepanitiaan = $state(0);
    let recentSurat = $state([]);
    let isLoading = $state(true);

    let selectedYear = $state(new Date().getFullYear());

    onMount(async () => {
        try {
            const { data, error } = await supabase
                .from("surat")
                .select(
                    "id, kategori, noSurat:nomor_surat_full, perihal, tgl_surat, created_at",
                )
                .order("created_at", { ascending: false });

            if (!error && data) {
                allSurat = data;
                totalSurat = data.length;
                totalBidangInti = data.filter(
                    (s) => s.kategori === "Bidang Inti",
                ).length;
                totalKepanitiaan = data.filter(
                    (s) => s.kategori === "Kepanitiaan",
                ).length;
                recentSurat = data.slice(0, 5); // Ambil 5 data terbaru
            }
        } catch (err) {
            console.error(err);
        } finally {
            isLoading = false;
        }
    });

    let chartBars = $derived.by(() => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Ags",
            "Sep",
            "Okt",
            "Nov",
            "Des",
        ];
        const counts = Array(12).fill(0);

        allSurat.forEach((surat) => {
            const dStr = surat.tgl_surat || surat.created_at;
            if (dStr) {
                const date = new Date(dStr);
                if (date.getFullYear() === selectedYear) {
                    counts[date.getMonth()] += 1;
                }
            }
        });

        return counts.map((count, index) => ({
            month: months[index],
            value: count,
        }));
    });

    let maxChartValue = $derived(Math.max(5, ...chartBars.map((b) => b.value)));

    let availableYears = $derived.by(() => {
        if (!allSurat.length) return [new Date().getFullYear()];
        const years = new Set(
            allSurat.map((s) => {
                const d = s.tgl_surat || s.created_at;
                return d ? new Date(d).getFullYear() : new Date().getFullYear();
            }),
        );
        const sorted = Array.from(years).sort((a, b) => b - a);
        return sorted.length > 0
            ? sorted.slice(0, 5)
            : [new Date().getFullYear()];
    });

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

<svelte:head>
    <title>Dashboard - SiSurat</title>
</svelte:head>

<div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">
                Ikhtisar <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                    >Sistem</span
                >
            </h1>
            <p class="text-slate-500 mt-2 text-sm max-w-lg leading-relaxed">
                Pantau statistik penerbitan surat, aktivitas pengarsipan
                terbaru, dan produktivitas administrasi Anda secara realtime.
            </p>
        </div>
        <div class="flex items-center gap-3">
            <a
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm shadow-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                href="/kelola-surat/buat"
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
                Buat Surat
            </a>
        </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <!-- Card 1: Total Surat Keluar -->
        <Card
            class="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100 group border-0 bg-white ring-1 ring-slate-100 shadow-sm"
        >
            <div
                class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"
            ></div>
            <CardContent
                class="p-6 relative z-10 flex flex-col justify-between h-full space-y-4"
            >
                <div class="flex items-center justify-between">
                    <div
                        class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-400 flex items-center justify-center text-white shadow-sm shadow-blue-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                            />
                        </svg>
                    </div>
                </div>
                <div>
                    <p
                        class="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-1"
                    >
                        Total Surat Keluar
                    </p>
                    <p
                        class="text-4xl font-extrabold text-slate-800 tracking-tight"
                    >
                        {isLoading ? "..." : totalSurat}
                    </p>
                </div>
            </CardContent>
        </Card>

        <!-- Card 2: Surat Bidang Inti -->
        <Card
            class="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100 group border-0 bg-white ring-1 ring-slate-100 shadow-sm"
        >
            <div
                class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"
            ></div>
            <CardContent
                class="p-6 relative z-10 flex flex-col justify-between h-full space-y-4"
            >
                <div class="flex items-center justify-between">
                    <div
                        class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-400 flex items-center justify-center text-white shadow-sm shadow-indigo-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                    </div>
                </div>
                <div>
                    <p
                        class="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-1"
                    >
                        Surat Bidang Inti
                    </p>
                    <p
                        class="text-4xl font-extrabold text-slate-800 tracking-tight"
                    >
                        {isLoading ? "..." : totalBidangInti}
                    </p>
                </div>
            </CardContent>
        </Card>

        <!-- Card 3: Surat Kepanitiaan -->
        <Card
            class="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100 group border-0 bg-white ring-1 ring-slate-100 shadow-sm"
        >
            <div
                class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"
            ></div>
            <CardContent
                class="p-6 relative z-10 flex flex-col justify-between h-full space-y-4"
            >
                <div class="flex items-center justify-between">
                    <div
                        class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center text-white shadow-sm shadow-emerald-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    </div>
                </div>
                <div>
                    <p
                        class="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-1"
                    >
                        Surat Kepanitiaan
                    </p>
                    <p
                        class="text-4xl font-extrabold text-slate-800 tracking-tight"
                    >
                        {isLoading ? "..." : totalKepanitiaan}
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>

    <!-- Main Content Area / Chart & Recent -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- Aktivitas Chart -->
        <Card
            class="xl:col-span-2 shadow-sm border-0 ring-1 ring-slate-100 min-h-[400px] flex flex-col"
        >
            <CardHeader
                class="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-50 pb-5"
            >
                <div>
                    <CardTitle class="text-[var(--dark)] text-lg mb-1"
                        >Statistik Penerbitan Surat</CardTitle
                    >
                    <p class="text-sm text-slate-500">
                        Intensitas pembuatan surat selama Tahun {selectedYear}
                    </p>
                </div>
                <div
                    class="mt-4 sm:mt-0 flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 p-1 rounded-lg"
                >
                    {#each availableYears as year}
                        <button
                            class="px-3 py-1.5 rounded-md transition-colors {selectedYear ===
                            year
                                ? 'bg-white text-slate-800 shadow-sm'
                                : 'hover:text-slate-800'}"
                            onclick={() => (selectedYear = year)}
                        >
                            {year}
                        </button>
                    {/each}
                </div>
            </CardHeader>
            <CardContent class="pt-4 flex-1 flex flex-col">
                <!-- Chart wrapper: fixed height area + label row -->
                <div class="w-full flex flex-col">
                    <!-- Grid lines + Bars area -->
                    <div class="relative w-full" style="height: 200px;">
                        <!-- Grid Lines (in px from bottom) -->
                        <div
                            class="absolute left-0 right-0 border-t border-dashed border-slate-200"
                            style="bottom: 50px;"
                        ></div>
                        <div
                            class="absolute left-0 right-0 border-t border-dashed border-slate-200"
                            style="bottom: 100px;"
                        ></div>
                        <div
                            class="absolute left-0 right-0 border-t border-dashed border-slate-200"
                            style="bottom: 150px;"
                        ></div>
                        <div
                            class="absolute left-0 right-0 border-t border-dashed border-slate-200"
                            style="bottom: 200px;"
                        ></div>

                        <!-- Bars positioned absolutely from bottom -->
                        <div
                            class="absolute inset-0 flex items-end justify-between gap-1 sm:gap-2 px-1"
                        >
                            {#each chartBars as bar, i}
                                {@const barHeightPx = Math.max(
                                    4,
                                    Math.round(
                                        (bar.value / maxChartValue) * 190,
                                    ),
                                )}
                                <div
                                    class="flex flex-col items-center flex-1 h-full justify-end group relative"
                                >
                                    <!-- Tooltip on hover -->
                                    <div
                                        class="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none whitespace-nowrap z-20 shadow-md absolute mb-1"
                                        style="bottom: {barHeightPx + 4}px;"
                                    >
                                        {bar.value} Surat
                                    </div>

                                    <!-- Bar -->
                                    <div
                                        class="w-full max-w-[36px] rounded-t-lg transition-all duration-700 group-hover:brightness-110 relative overflow-hidden
                                        {bar.value > 0
                                            ? i % 2 === 0
                                                ? 'bg-indigo-500'
                                                : 'bg-blue-400'
                                            : 'bg-slate-200'}"
                                        style="height: {barHeightPx}px;"
                                    >
                                        {#if bar.value > 0}
                                            <div
                                                class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
                                            ></div>
                                        {/if}
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Bottom border -->
                    <div class="border-t border-slate-200 mt-0"></div>

                    <!-- Month labels row -->
                    <div class="flex justify-between gap-1 sm:gap-2 px-1 mt-2">
                        {#each chartBars as bar}
                            <div class="flex-1 text-center">
                                <span
                                    class="text-[10px] sm:text-xs font-medium text-slate-400"
                                    >{bar.month}</span
                                >
                            </div>
                        {/each}
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Riwayat Singkat -->
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
                                Buat surat pertama Anda untuk melihat riwayatnya
                                di sini.
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
    </div>
</div>
