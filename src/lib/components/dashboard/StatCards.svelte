<script>
    import { Card, CardContent } from "$lib/components/UI/card";

    let {
        totalSurat = 0,
        totalBidangInti = 0,
        totalKepanitiaan = 0,
        isLoading = false,
    } = $props();
</script>

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
