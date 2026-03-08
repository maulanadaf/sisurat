<script>
    import { Card, CardContent } from "$lib/components/UI/card";
    import Button from "$lib/components/UI/Button.svelte";
    import RiwayatSuratTable from "$lib/components/kelola-surat/RiwayatSuratTable.svelte";
    import { goto } from "$app/navigation";

    let { data } = $props();
    let riwayatSurat = $derived(data.riwayatSurat);
</script>

<svelte:head>
    <title>Kelola Surat Keluar - SiSurat</title>
</svelte:head>

<div class="space-y-6">
    <!-- Header -->
    <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
        <div>
            <h1 class="text-3xl font-bold text-[var(--dark)] tracking-tight">
                Kelola Surat Keluar
            </h1>
            <p class="text-slate-500 mt-1">
                Pusat manajemen pembuatan dan pencatatan surat keluar instansi.
            </p>
        </div>
    </div>

    <!-- Pilihan Buat Surat (Action Panel) -->
    <Card class="border-slate-200 shadow-sm overflow-hidden">
        <CardContent class="p-6">
            <div
                class="flex flex-col md:flex-row gap-6 items-center justify-between"
            >
                <div class="flex gap-4 items-center">
                    <div
                        class="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shrink-0"
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
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-slate-800">
                            Catat Surat Keluar
                        </h3>
                        <p class="text-sm text-slate-500">
                            Masukan pendataan surat keluar untuk divalidasi ke
                            dalam riwayat.
                        </p>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3">
                    <Button
                        variant="default"
                        onclick={() => {
                            goto("/kelola-surat/buat");
                        }}
                        class="gap-2 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white border-transparent cursor-pointer"
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
                        Buat Data Surat
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>

    <!-- Riwayat Surat -->
    <RiwayatSuratTable data={riwayatSurat} />
</div>
