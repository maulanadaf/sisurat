<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    import Input from "$lib/components/UI/Input.svelte";

    let {
        ttdKiriTeks,
        ttdKiriNama = $bindable(),
        ttdKiriUrl = $bindable(),
        ttdKananTeks,
        ttdKananNama = $bindable(),
        ttdKananUrl = $bindable(),
        mengetahuiTeks,
        mengetahuiNama = $bindable(),
        mengetahuiUrl = $bindable(),
    } = $props();

    // Data dari Supabase
    let listBidangInti = $state([]);
    let isFetching = $state(true);

    onMount(async () => {
        const { data } = await supabase
            .from("ttd_bidang_inti")
            .select("id, nama, jabatan, ttd_url")
            .eq("is_active", true);

        listBidangInti = data ?? [];
        isFetching = false;

        syncPenandatangan();
    });

    $effect(() => {
        if (listBidangInti.length > 0) {
            syncPenandatangan();
        }
    });

    function syncPenandatangan() {
        const sekretaris = listBidangInti.find(
            (b) => b.jabatan === "Sekretaris UKM Kewirausahaan",
        );
        const ketua = listBidangInti.find(
            (b) => b.jabatan === "Ketua UKM Kewirausahaan",
        );
        const pembina = listBidangInti.find(
            (b) => b.jabatan === "Pembina UKM Kewirausahaan",
        );

        ttdKiriNama = ketua?.nama ?? "";
        ttdKiriUrl = ketua?.ttd_url ?? "";

        ttdKananNama = sekretaris?.nama ?? "";
        ttdKananUrl = sekretaris?.ttd_url ?? "";

        mengetahuiNama = pembina?.nama ?? "";
        mengetahuiUrl = pembina?.ttd_url ?? "";
    }
</script>

<section>
    <div class="flex items-center gap-2 mb-4">
        <div
            class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm"
        >
            3
        </div>
        <h3
            class="text-lg font-bold text-slate-800 border-b border-slate-200 pb-1 flex-1"
        >
            Pengaturan Penandatangan
        </h3>
    </div>
    <div class="grid md:grid-cols-2 gap-x-6 gap-y-5 pl-10 mb-6 relative">
        {#if isFetching}
            <div
                class="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl"
            >
                <span class="text-sm font-medium text-slate-500 animate-pulse"
                    >Menyiapkan data penandatangan...</span
                >
            </div>
        {/if}

        <div
            class="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-3"
        >
            <p
                class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1"
            >
                Pihak Kiri
            </p>
            <p class="text-sm font-medium text-slate-700 mb-1">
                {ttdKiriTeks}
            </p>
            <Input
                bind:value={ttdKiriNama}
                readonly
                class="h-8 text-sm bg-slate-100 font-semibold cursor-not-allowed"
                placeholder="Data tidak ditemukan"
            />
        </div>
        <div
            class="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-3"
        >
            <p
                class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1"
            >
                Pihak Kanan
            </p>
            <p class="text-sm font-medium text-slate-700 mb-1">
                {ttdKananTeks}
            </p>
            <Input
                bind:value={ttdKananNama}
                readonly
                class="h-8 text-sm bg-slate-100 font-semibold cursor-not-allowed"
                placeholder="Data tidak ditemukan"
            />
        </div>
        <div
            class="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-3 md:col-span-2 md:w-1/2 md:mx-auto"
        >
            <p
                class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 text-center"
            >
                Mengetahui
            </p>
            <p class="text-sm font-medium text-slate-700 mb-1 text-center">
                {mengetahuiTeks}
            </p>
            <Input
                bind:value={mengetahuiNama}
                readonly
                class="h-8 text-sm bg-slate-100 font-semibold cursor-not-allowed text-center"
                placeholder="Data tidak ditemukan"
            />
        </div>
    </div>
</section>
