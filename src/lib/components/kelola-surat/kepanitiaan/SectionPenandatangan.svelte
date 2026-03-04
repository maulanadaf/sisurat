<script>
    import Input from "$lib/components/UI/Input.svelte";

    let {
        ttdKiriTeks,
        ttdKiriNama = $bindable(),
        ttdKananTeks,
        ttdKananNama = $bindable(),
        mengetahuiKiriTeks,
        mengetahuiKiriNama = $bindable(),
        mengetahuiKananTeks,
        mengetahuiKananNama = $bindable(),
    } = $props();
</script>

<section>
    <div class="flex items-center gap-2 mb-4">
        <div
            class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm"
        >
            3
        </div>
        <h3
            class="text-lg font-bold text-slate-800 border-b border-slate-200 pb-1 flex-1"
        >
            Pengaturan Penandatangan
        </h3>
    </div>
    <div class="grid md:grid-cols-2 gap-x-6 gap-y-5 pl-10 mb-6">
        <div
            class="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-3"
        >
            <p
                class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1"
            >
                Pihak Kiri (Panitia)
            </p>
            <p class="text-sm font-medium text-slate-700 mb-1">
                {ttdKiriTeks}
            </p>
            <Input
                bind:value={ttdKiriNama}
                class="h-8 text-sm bg-white font-semibold"
                placeholder="Nama Lengkap Ketua Pelaksana"
            />
        </div>
        <div
            class="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-3"
        >
            <p
                class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1"
            >
                Pihak Kanan (Panitia)
            </p>
            <p class="text-sm font-medium text-slate-700 mb-1">
                {ttdKananTeks}
            </p>
            <Input
                bind:value={ttdKananNama}
                class="h-8 text-sm bg-white font-semibold"
                placeholder="Nama Lengkap Sekretaris Pelaksana"
            />
        </div>
    </div>
    <div class="grid md:grid-cols-2 gap-x-6 gap-y-5 pl-10">
        <div
            class="p-4 rounded-xl border border-dashed border-slate-300 bg-blue-50/30 space-y-3"
        >
            <p
                class="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1"
            >
                Mengetahui (Kiri)
            </p>
            <p class="text-sm font-medium text-blue-700/80 mb-1">
                {mengetahuiKiriTeks}
            </p>
            <Input
                bind:value={mengetahuiKiriNama}
                class="h-8 text-sm bg-white font-semibold"
                placeholder="Nama Lengkap Ketua UKM Kewirausahaan"
            />
        </div>
        <div
            class="p-4 rounded-xl border border-dashed border-slate-300 bg-blue-50/30 space-y-3"
        >
            <p
                class="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1"
            >
                Mengetahui (Kanan)
            </p>
            <p class="text-sm font-medium text-blue-700/80 mb-1">
                {mengetahuiKananTeks}
            </p>
            <Input
                bind:value={mengetahuiKananNama}
                class="h-8 text-sm bg-white font-semibold"
                placeholder="Nama Lengkap Pembina UKM Kewirausahaan"
            />
        </div>
    </div>
</section>
