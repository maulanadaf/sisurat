<script>
    import { Card, CardContent } from "$lib/components/UI/card";
    import Button from "$lib/components/UI/Button.svelte";
    import { goto } from "$app/navigation";
</script>

<svelte:head>
    <title>Pilih Jenis Surat - SiSurat</title>
</svelte:head>

<div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-4">
        <button
            onclick={() => goto("/kelola-surat")}
            class="p-2 h-10 w-10 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm flex items-center justify-center cursor-pointer"
            title="Kembali ke Kelola Surat"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
            </svg>
        </button>
        <div>
            <h1 class="text-3xl font-bold text-[var(--dark)] tracking-tight">
                Pilih Jenis Surat
            </h1>
            <p class="text-slate-500 mt-1">
                Silakan pilih kategori surat yang ingin Anda buat untuk
                menyesuaikan format dokumen.
            </p>
        </div>
    </div>

    <!-- Cards Pilihan -->
    <div class="grid md:grid-cols-2 gap-6 mt-6">
        <!-- Card: Bidang Inti -->
        <Card
            class="h-full border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col"
            onclick={() => goto("/kelola-surat/buat/bidang-inti")}
        >
            <CardContent
                class="p-8 flex flex-col flex-1 items-center text-center gap-4"
            >
                <div
                    class="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-10 h-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                    </svg>
                </div>
                <div>
                    <h3
                        class="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors"
                    >
                        Surat Bidang Inti
                    </h3>
                    <p class="text-slate-500 text-sm">
                        Surat resmi organisasi yang dikeluarkan langsung oleh
                        pengurus inti (Ketua Umum, Sekretaris Umum) untuk
                        keperluan kelembagaan.
                    </p>
                </div>
                <Button
                    variant="outline"
                    class="w-full mt-auto group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200"
                >
                    Buat Surat Bidang Inti
                </Button>
            </CardContent>
        </Card>

        <!-- Card: Kepanitiaan -->
        <Card
            class="h-full border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col"
            onclick={() => goto("/kelola-surat/buat/kepanitiaan")}
        >
            <CardContent
                class="p-8 flex flex-col flex-1 items-center text-center gap-4"
            >
                <div
                    class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-10 h-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
                <div>
                    <h3
                        class="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors"
                    >
                        Surat Kepanitiaan
                    </h3>
                    <p class="text-slate-500 text-sm">
                        Surat operasional yang dikeluarkan oleh pelaksana
                        kegiatan (Ketua Panitia) untuk keperluan kepanitiaan
                        spesifik.
                    </p>
                </div>
                <Button
                    variant="outline"
                    class="w-full mt-auto group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200"
                >
                    Buat Surat Kepanitiaan
                </Button>
            </CardContent>
        </Card>
    </div>
</div>
