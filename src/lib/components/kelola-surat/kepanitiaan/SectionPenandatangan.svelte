<script>
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";
    import ModalPenandatangan from "$lib/components/penandatangan/ModalPenandatangan.svelte";

    let {
        ttdKiriTeks,
        ttdKiriNama = $bindable(),
        ttdKiriUrl = $bindable(),
        ttdKananTeks,
        ttdKananNama = $bindable(),
        ttdKananUrl = $bindable(),
        mengetahuiKiriTeks,
        mengetahuiKiriNama = $bindable(),
        mengetahuiKiriUrl = $bindable(),
        mengetahuiKananTeks,
        mengetahuiKananNama = $bindable(),
        mengetahuiKananUrl = $bindable(),
    } = $props();

    // --- Data dari Supabase ---
    let listKepanitiaan = $state([]); // ttd_kepanitiaan
    let listBidangInti = $state([]); // ttd_bidang_inti (aktif)
    let isFetching = $state(true);

    // ID terpilih untuk kepanitiaan (Kiri & Kanan)
    let selectedKiriId = $state("");
    let selectedKananId = $state("");

    // --- Modal State ---
    let showModal = $state(false);
    let modalForm = $state({
        id: null,
        nama: "",
        ttd_url: "",
    });
    let ttdFile = $state(null);
    let ttdPreview = $state("");
    let isSavingModal = $state(false);

    onMount(async () => {
        const [kepanitiaanRes, bidangRes] = await Promise.all([
            supabase
                .from("ttd_kepanitiaan")
                .select("id, nama, ttd_url")
                .order("nama", { ascending: true }),
            supabase
                .from("ttd_bidang_inti")
                .select("id, nama, jabatan, ttd_url")
                .eq("is_active", true)
                .order("jabatan", { ascending: true }),
        ]);

        listKepanitiaan = kepanitiaanRes.data ?? [];
        listBidangInti = bidangRes.data ?? [];
        isFetching = false;

        // Auto-fill Mengetahui dari bidang inti
        syncMengetahui();
    });

    // Saat listBidangInti berubah, sync nama Mengetahui
    $effect(() => {
        if (listBidangInti.length > 0) {
            syncMengetahui();
        }
    });

    function syncMengetahui() {
        const ketua = listBidangInti.find(
            (b) => b.jabatan === "Ketua UKM Kewirausahaan",
        );
        const pembina = listBidangInti.find(
            (b) => b.jabatan === "Pembina UKM Kewirausahaan",
        );

        mengetahuiKiriNama = ketua?.nama ?? "";
        mengetahuiKiriUrl = ketua?.ttd_url ?? "";
        mengetahuiKananNama = pembina?.nama ?? "";
        mengetahuiKananUrl = pembina?.ttd_url ?? "";
    }

    // Saat dropdown kepanitiaan berubah, update nama
    function onKiriChange() {
        const picked = listKepanitiaan.find((k) => k.id === selectedKiriId);
        ttdKiriNama = picked?.nama ?? "";
        ttdKiriUrl = picked?.ttd_url ?? "";
    }

    function onKananChange() {
        const picked = listKepanitiaan.find((k) => k.id === selectedKananId);
        ttdKananNama = picked?.nama ?? "";
        ttdKananUrl = picked?.ttd_url ?? "";
    }

    // --- Helpers Modal ---
    function openModal() {
        modalForm = { id: null, nama: "", ttd_url: "" };
        ttdFile = null;
        ttdPreview = "";
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    function handleFileChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        ttdFile = file;
        ttdPreview = URL.createObjectURL(file);
    }

    async function uploadTtd(file) {
        const ext = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;
        const { data: uploadData, error } = await supabase.storage
            .from("ttd")
            .upload(fileName, file, { upsert: false });
        if (error) throw error;
        const { data: urlData } = supabase.storage
            .from("ttd")
            .getPublicUrl(uploadData.path);
        return urlData.publicUrl;
    }

    async function handleSimpanPanitia() {
        if (!modalForm.nama.trim()) return alert("Nama tidak boleh kosong.");
        isSavingModal = true;
        try {
            let ttd_url = modalForm.ttd_url;
            if (ttdFile) {
                ttd_url = await uploadTtd(ttdFile);
            }

            const payload = { nama: modalForm.nama, ttd_url };
            const { error } = await supabase
                .from("ttd_kepanitiaan")
                .insert(payload);

            if (error) throw error;

            // Fetch ulang list
            const kepanitiaanRes = await supabase
                .from("ttd_kepanitiaan")
                .select("id, nama, ttd_url")
                .order("nama", { ascending: true });

            listKepanitiaan = kepanitiaanRes.data ?? [];
            closeModal();
        } catch (err) {
            console.error(err);
            alert(`Gagal menyimpan data: ${err.message}`);
        } finally {
            isSavingModal = false;
        }
    }
</script>

<section>
    <div class="flex items-center gap-2 mb-4">
        <div
            class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm"
        >
            3
        </div>
        <div
            class="flex-1 flex items-center justify-between border-b border-slate-200 pb-1"
        >
            <h3 class="text-lg font-bold text-slate-800">
                Pengaturan Penandatangan
            </h3>
            <button
                type="button"
                onclick={openModal}
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                Tambah TTD
            </button>
        </div>
    </div>

    <!-- Panitia Pelaksana (dari ttd_kepanitiaan) -->
    <div class="grid md:grid-cols-2 gap-x-6 gap-y-5 pl-10 mb-6">
        <!-- Kiri: Ketua Pelaksana -->
        <div
            class="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 space-y-3"
        >
            <p
                class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1"
            >
                Pihak Kiri (Panitia)
            </p>
            <p class="text-sm font-medium text-slate-700 mb-1">{ttdKiriTeks}</p>

            {#if isFetching}
                <div class="h-8 bg-slate-200 animate-pulse rounded-md"></div>
            {:else if listKepanitiaan.length === 0}
                <p class="text-xs text-red-400 italic">
                    Belum ada data kepanitiaan. Tambah di halaman Penandatangan.
                </p>
            {:else}
                <select
                    bind:value={selectedKiriId}
                    onchange={onKiriChange}
                    class="flex h-8 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-semibold text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                    <option value="" disabled>-- Pilih nama --</option>
                    {#each listKepanitiaan as item (item.id)}
                        <option value={item.id}>{item.nama}</option>
                    {/each}
                </select>
            {/if}
        </div>

        <!-- Kanan: Sekretaris Pelaksana -->
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

            {#if isFetching}
                <div class="h-8 bg-slate-200 animate-pulse rounded-md"></div>
            {:else if listKepanitiaan.length === 0}
                <p class="text-xs text-red-400 italic">
                    Belum ada data kepanitiaan. Tambah di halaman Penandatangan.
                </p>
            {:else}
                <select
                    bind:value={selectedKananId}
                    onchange={onKananChange}
                    class="flex h-8 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-semibold text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                    <option value="" disabled>-- Pilih nama --</option>
                    {#each listKepanitiaan as item (item.id)}
                        <option value={item.id}>{item.nama}</option>
                    {/each}
                </select>
            {/if}
        </div>
    </div>

    <!-- Mengetahui (dari ttd_bidang_inti — auto-fill) -->
    <div class="grid md:grid-cols-2 gap-x-6 gap-y-5 pl-10">
        <!-- Kiri: Ketua UKM -->
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

            {#if isFetching}
                <div class="h-8 bg-blue-100 animate-pulse rounded-md"></div>
            {:else if mengetahuiKiriNama}
                <div
                    class="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md border border-slate-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3.5 h-3.5 text-emerald-500 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2.5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <span class="text-sm font-semibold text-slate-800"
                        >{mengetahuiKiriNama}</span
                    >
                </div>
                <p class="text-[10px] text-slate-400">
                    Diisi otomatis dari data aktif bidang inti.
                </p>
            {:else}
                <p class="text-xs text-red-400 italic">
                    Ketua UKM Kewirausahaan belum diset aktif di halaman
                    Penandatangan.
                </p>
            {/if}
        </div>

        <!-- Kanan: Pembina UKM -->
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

            {#if isFetching}
                <div class="h-8 bg-blue-100 animate-pulse rounded-md"></div>
            {:else if mengetahuiKananNama}
                <div
                    class="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md border border-slate-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3.5 h-3.5 text-emerald-500 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2.5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <span class="text-sm font-semibold text-slate-800"
                        >{mengetahuiKananNama}</span
                    >
                </div>
                <p class="text-[10px] text-slate-400">
                    Diisi otomatis dari data aktif bidang inti.
                </p>
            {:else}
                <p class="text-xs text-red-400 italic">
                    Pembina UKM Kewirausahaan belum diset aktif di halaman
                    Penandatangan.
                </p>
            {/if}
        </div>
    </div>
</section>

<!-- Modal Upload TTD -->
<ModalPenandatangan
    {showModal}
    modalMode="tambah"
    modalType="kepanitiaan"
    bind:form={modalForm}
    {ttdPreview}
    {ttdFile}
    isLoading={isSavingModal}
    onClose={closeModal}
    onFileChange={handleFileChange}
    onSave={handleSimpanPanitia}
/>
