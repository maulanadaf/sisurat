<script>
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    import TableBidangInti from "$lib/components/penandatangan/TableBidangInti.svelte";
    import TableKepanitiaan from "$lib/components/penandatangan/TableKepanitiaan.svelte";
    import ModalPenandatangan from "$lib/components/penandatangan/ModalPenandatangan.svelte";
    import {
        simpanPenandatangan,
        hapusPenandatangan,
        toggleStatusAktif,
    } from "$lib/components/penandatangan/scripts/penandatanganActions";

    // --- Data State ---
    let bidangInti = $state([]);
    let kepanitiaan = $state([]);
    let isFetching = $state(true);

    async function fetchData() {
        isFetching = true;
        const [bidangRes, kepanitiaanRes] = await Promise.all([
            supabase
                .from("ttd_bidang_inti")
                .select("*")
                .order("created_at", { ascending: false }),
            supabase
                .from("ttd_kepanitiaan")
                .select("*")
                .order("created_at", { ascending: false }),
        ]);

        if (bidangRes.error)
            console.error("[bidang_inti]", bidangRes.error.message);
        if (kepanitiaanRes.error)
            console.error("[kepanitiaan]", kepanitiaanRes.error.message);

        bidangInti = bidangRes.data ?? [];
        kepanitiaan = kepanitiaanRes.data ?? [];
        isFetching = false;
    }

    onMount(() => {
        fetchData();
    });

    // --- Tab State ---
    let activeTab = $state("bidang"); // "bidang" | "kepanitiaan"

    // --- Modal State ---
    let showModal = $state(false);
    let modalMode = $state("tambah"); // "tambah" | "edit"
    let modalType = $state("bidang"); // "bidang" | "kepanitiaan"

    // --- Form Fields ---
    let form = $state({
        id: null,
        nama: "",
        jabatan: "",
        periode: "",
        is_active: true,
        ttd_url: "",
    });
    let ttdFile = $state(null);
    let ttdPreview = $state("");
    let isLoading = $state(false);
    let deletingId = $state(null);

    // --- Helpers ---
    function openTambah(type) {
        modalType = type;
        modalMode = "tambah";
        form = {
            id: null,
            nama: "",
            jabatan: "",
            periode: "",
            is_active: true,
            ttd_url: "",
        };
        ttdFile = null;
        ttdPreview = "";
        showModal = true;
    }

    function openEdit(item, type) {
        modalType = type;
        modalMode = "edit";
        form = {
            id: item.id,
            nama: item.nama ?? "",
            jabatan: item.jabatan ?? "",
            periode: item.periode ?? "",
            is_active: item.is_active ?? true,
            ttd_url: item.ttd_url ?? "",
        };
        ttdFile = null;
        ttdPreview = item.ttd_url ?? "";
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

    async function handleSimpan() {
        if (!form.nama.trim()) return alert("Nama tidak boleh kosong.");
        if (modalType === "bidang" && !form.jabatan.trim())
            return alert("Jabatan tidak boleh kosong.");
        if (modalType === "bidang" && !form.periode.trim())
            return alert("Periode tidak boleh kosong.");

        isLoading = true;
        try {
            await simpanPenandatangan({ form, ttdFile, modalType, modalMode });
            await fetchData();
            closeModal();
        } catch (err) {
            alert(`Gagal menyimpan data: ${err.message}`);
            console.error(err);
        } finally {
            isLoading = false;
        }
    }

    async function handleHapus(item, type) {
        const konfirmasi = confirm(
            `Yakin ingin menghapus "${item.nama}"?\nTindakan ini tidak dapat dibatalkan.`,
        );
        if (!konfirmasi) return;

        deletingId = item.id;
        try {
            await hapusPenandatangan({ item, type });
            await fetchData();
        } catch (err) {
            alert(`Gagal menghapus: ${err.message}`);
        } finally {
            deletingId = null;
        }
    }

    async function toggleAktif(item) {
        try {
            await toggleStatusAktif(item);
            await fetchData();
        } catch (err) {
            alert(`Gagal memperbarui status: ${err.message}`);
        }
    }
</script>

<svelte:head>
    <title>Penandatangan - SiSurat</title>
</svelte:head>

<div class="space-y-6">
    <!-- Header -->
    <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
        <div>
            <h1 class="text-3xl font-bold text-[var(--dark)] tracking-tight">
                Data Penandatangan
            </h1>
            <p class="text-slate-500 mt-1">
                Kelola data orang yang berhak menandatangani surat.
            </p>
        </div>
    </div>

    <!-- Tab Navigation -->
    <div class="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button
            onclick={() => (activeTab = "bidang")}
            class="px-5 py-2 cursor-pointer rounded-lg text-sm font-semibold transition-all duration-200 {activeTab ===
            'bidang'
                ? 'bg-white text-[var(--dark)] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'}"
        >
            Bidang Inti
        </button>
        <button
            onclick={() => (activeTab = "kepanitiaan")}
            class="px-5 py-2 cursor-pointer rounded-lg text-sm font-semibold transition-all duration-200 {activeTab ===
            'kepanitiaan'
                ? 'bg-white text-[var(--dark)] shadow-sm'
                : 'text-slate-500 hover:text-slate-700'}"
        >
            Kepanitiaan
        </button>
    </div>

    <!-- ============ BIDANG INTI ============ -->
    {#if activeTab === "bidang"}
        <TableBidangInti
            data={bidangInti}
            {isFetching}
            {deletingId}
            onTambah={() => openTambah("bidang")}
            onEdit={(item) => openEdit(item, "bidang")}
            onToggleAktif={toggleAktif}
            onHapus={(item) => handleHapus(item, "bidang")}
        />
    {/if}

    <!-- ============ KEPANITIAAN ============ -->
    {#if activeTab === "kepanitiaan"}
        <TableKepanitiaan
            data={kepanitiaan}
            {isFetching}
            {deletingId}
            onTambah={() => openTambah("kepanitiaan")}
            onEdit={(item) => openEdit(item, "kepanitiaan")}
            onHapus={(item) => handleHapus(item, "kepanitiaan")}
        />
    {/if}
</div>

<!-- ============ MODAL ============ -->
<ModalPenandatangan
    bind:showModal
    bind:form
    bind:ttdPreview
    {ttdFile}
    bind:isLoading
    {modalMode}
    {modalType}
    onClose={closeModal}
    onSave={handleSimpan}
    onFileChange={handleFileChange}
/>
