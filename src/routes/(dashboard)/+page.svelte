<script>
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
        CardDescription,
    } from "$lib/components/UI/card";
    import Button from "$lib/components/UI/Button.svelte";
    import Badge from "$lib/components/UI/Badge.svelte";
    import Input from "$lib/components/UI/Input.svelte";
    // Ini adalah halaman utama Dashboard
</script>

<svelte:head>
    <title>Dashboard - SiSurat</title>
</svelte:head>

<div class="space-y-6">
    <!-- Header Section -->
    <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
        <div>
            <h1 class="text-2xl font-bold text-[var(--primary)]">Dashboard</h1>
            <p class="text-gray-600 mt-1">
                Selamat datang di Sistem Manajemen Surat (SiSurat).
            </p>
        </div>
        <div class="flex items-center gap-2">
            <Input
                type="search"
                placeholder="Cari nomor surat..."
                class="w-full md:w-64 bg-white"
            />
            <Button variant="default">Cari</Button>
        </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Surat Masuk Card -->
        <Card
            class="transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer"
        >
            <CardContent class="flex items-center gap-4 p-6">
                <div
                    class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
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
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                    </svg>
                </div>
                <div>
                    <p class="text-sm text-gray-500 font-medium">Surat Masuk</p>
                    <p class="text-2xl font-bold text-[var(--dark)]">124</p>
                </div>
            </CardContent>
        </Card>

        <!-- Surat Keluar Card -->
        <Card
            class="transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer"
        >
            <CardContent class="flex items-center gap-4 p-6">
                <div
                    class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600"
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
                    <p class="text-sm text-gray-500 font-medium">
                        Surat Keluar
                    </p>
                    <p class="text-2xl font-bold text-[var(--dark)]">86</p>
                </div>
            </CardContent>
        </Card>

        <!-- Disposisi Card -->
        <Card
            class="transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer"
        >
            <CardContent class="flex items-center gap-4 p-6">
                <div
                    class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                    </svg>
                </div>
                <div>
                    <p class="text-sm text-gray-500 font-medium">
                        Perlu Diproses
                    </p>
                    <p class="text-2xl font-bold text-[var(--dark)]">12</p>
                </div>
            </CardContent>
        </Card>

        <!-- Total Arsip Card -->
        <Card
            class="transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer"
        >
            <CardContent class="flex items-center gap-4 p-6">
                <div
                    class="w-12 h-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                    </svg>
                </div>
                <div>
                    <p class="text-sm text-gray-500 font-medium">Total Arsip</p>
                    <p class="text-2xl font-bold text-[var(--dark)]">210</p>
                </div>
            </CardContent>
        </Card>
    </div>

    <!-- Main Content Area / Chart Placeholder -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <!-- Aktivitas Terbaru -->
        <Card class="lg:col-span-2 shadow-sm min-h-[400px]">
            <CardHeader
                class="flex flex-row items-center justify-between border-b pb-4"
            >
                <CardTitle class="text-[var(--primary)]"
                    >Statistik Surat (Tahun Ini)</CardTitle
                >
                <Button variant="ghost" size="sm" class="text-[var(--primary)]"
                    >Lihat Detail</Button
                >
            </CardHeader>
            <CardContent class="pt-6">
                <div
                    class="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-dashed border-slate-200"
                >
                    <p class="text-slate-400 font-medium">
                        [ Area Grafik / Chart ]
                    </p>
                </div>
            </CardContent>
        </Card>

        <!-- Riwayat Singkat -->
        <Card class="shadow-sm h-full flex flex-col">
            <CardHeader class="border-b pb-4">
                <CardTitle class="text-[var(--primary)]"
                    >Aktivitas Terakhir</CardTitle
                >
            </CardHeader>
            <CardContent class="flex-1 overflow-y-auto pt-6 space-y-4">
                <!-- Log Item -->
                <div class="flex gap-3">
                    <Badge
                        variant="default"
                        class="h-8 w-8 flex items-center justify-center rounded-full flex-shrink-0 mt-1 p-0 bg-blue-100 text-blue-600 hover:bg-blue-200"
                        >SM</Badge
                    >
                    <div>
                        <p class="text-sm text-[var(--dark)] font-medium">
                            Surat Masuk Baru ditambahkan
                        </p>
                        <p class="text-xs text-gray-500">
                            Undangan Rapat Dinas Pendidikan
                        </p>
                        <p class="text-xs text-gray-400 mt-1">
                            10 menit yang lalu
                        </p>
                    </div>
                </div>
                <!-- Log Item -->
                <div class="flex gap-3">
                    <Badge
                        variant="default"
                        class="h-8 w-8 flex items-center justify-center rounded-full flex-shrink-0 mt-1 p-0 bg-green-100 text-green-600 hover:bg-green-200"
                        >SK</Badge
                    >
                    <div>
                        <p class="text-sm text-[var(--dark)] font-medium">
                            Surat Keluar disetujui
                        </p>
                        <p class="text-xs text-gray-500">
                            Pemberitahuan Orang Tua Wali
                        </p>
                        <p class="text-xs text-gray-400 mt-1">
                            1 jam yang lalu
                        </p>
                    </div>
                </div>
                <!-- Log Item -->
                <div class="flex gap-3">
                    <Badge
                        variant="default"
                        class="h-8 w-8 flex items-center justify-center rounded-full flex-shrink-0 mt-1 p-0 bg-purple-100 text-purple-600 hover:bg-purple-200"
                        >DS</Badge
                    >
                    <div>
                        <p class="text-sm text-[var(--dark)] font-medium">
                            Disposisi Surat Masuk
                        </p>
                        <p class="text-xs text-gray-500">
                            Diteruskan ke Waka Kurikulum
                        </p>
                        <p class="text-xs text-gray-400 mt-1">
                            3 jam yang lalu
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</div>
