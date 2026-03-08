<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    import HeaderDashboard from "$lib/components/dashboard/HeaderDashboard.svelte";
    import StatCards from "$lib/components/dashboard/StatCards.svelte";
    import StatistikChart from "$lib/components/dashboard/StatistikChart.svelte";
    import AktivitasTerbaru from "$lib/components/dashboard/AktivitasTerbaru.svelte";

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
</script>

<svelte:head>
    <title>Dashboard - SiSurat</title>
</svelte:head>

<div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header Section -->
    <HeaderDashboard />

    <!-- Statistics Cards -->
    <StatCards {totalSurat} {totalBidangInti} {totalKepanitiaan} {isLoading} />

    <!-- Main Content Area / Chart & Recent -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- Aktivitas Chart -->
        <StatistikChart
            bind:selectedYear
            {availableYears}
            {chartBars}
            {maxChartValue}
        />

        <!-- Riwayat Singkat -->
        <AktivitasTerbaru {recentSurat} {isLoading} />
    </div>
</div>
