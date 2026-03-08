<script>
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
    } from "$lib/components/UI/card";

    let {
        selectedYear = $bindable(new Date().getFullYear()),
        availableYears = [],
        chartBars = [],
        maxChartValue = 5,
    } = $props();
</script>

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
                    class="px-3 py-1.5 rounded-md transition-colors cursor-pointer {selectedYear ===
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
                            Math.round((bar.value / maxChartValue) * 190),
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
                                class="w-full max-w-[36px] rounded-t-lg transition-all duration-700 group-hover:brightness-110 relative overflow-hidden {bar.value >
                                0
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
