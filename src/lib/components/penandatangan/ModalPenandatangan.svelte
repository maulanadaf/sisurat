<script>
    import Label from "$lib/components/UI/Label.svelte";
    import Input from "$lib/components/UI/Input.svelte";
    import Button from "$lib/components/UI/Button.svelte";

    let {
        showModal = false,
        modalMode = "tambah",
        modalType = "bidang",
        form = $bindable(),
        ttdPreview = "",
        ttdFile = null,
        isLoading = false,
        onClose,
        onSave,
        onFileChange,
    } = $props();
</script>

{#if showModal}
    <!-- Backdrop -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onclick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}
    >
        <!-- Modal Box -->
        <div
            class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
            <!-- Modal Header -->
            <div
                class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50"
            >
                <h2 class="text-lg font-bold text-slate-800">
                    {modalMode === "tambah" ? "Tambah" : "Edit"}
                    {modalType === "bidang"
                        ? "Penandatangan Bidang Inti"
                        : "Penandatangan Kepanitiaan"}
                </h2>
                <button
                    onclick={onClose}
                    class="p-2 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors cursor-pointer"
                    aria-label="Tutup Modal"
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
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <!-- Modal Body -->
            <div class="px-6 py-5 space-y-4">
                <!-- Nama -->
                <div class="space-y-1.5">
                    <Label for="nama"
                        >Nama <span class="text-red-500">*</span></Label
                    >
                    <Input
                        id="nama"
                        bind:value={form.nama}
                        placeholder="Masukkan nama lengkap"
                    />
                </div>

                <!-- Bidang Inti only fields -->
                {#if modalType === "bidang"}
                    <div class="space-y-1.5">
                        <Label for="jabatan"
                            >Jabatan <span class="text-red-500">*</span></Label
                        >
                        <select
                            id="jabatan"
                            bind:value={form.jabatan}
                            class="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 text-slate-800"
                        >
                            <option value="" disabled
                                >-- Pilih Jabatan --</option
                            >
                            <option value="Ketua UKM Kewirausahaan"
                                >Ketua UKM Kewirausahaan</option
                            >
                            <option value="Sekretaris UKM Kewirausahaan"
                                >Sekretaris UKM Kewirausahaan</option
                            >
                            <option value="Pembina UKM Kewirausahaan"
                                >Pembina UKM Kewirausahaan</option
                            >
                        </select>
                    </div>
                    <div class="space-y-1.5">
                        <Label for="periode"
                            >Periode <span class="text-red-500">*</span></Label
                        >
                        <Input
                            id="periode"
                            bind:value={form.periode}
                            placeholder="Contoh: 2024/2025"
                        />
                    </div>
                    <div class="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="is_active"
                            bind:checked={form.is_active}
                            class="w-4 h-4 accent-[var(--primary)] rounded cursor-pointer"
                        />
                        <Label
                            for="is_active"
                            class="cursor-pointer text-slate-700"
                            >Status Aktif</Label
                        >
                    </div>
                {/if}

                <!-- Upload Tanda Tangan -->
                <div class="space-y-1.5">
                    <Label for="ttd_file">Upload Tanda Tangan</Label>
                    <div
                        class="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-[var(--primary)] transition-colors"
                    >
                        {#if ttdPreview}
                            <div class="mb-3 flex justify-center">
                                <img
                                    src={ttdPreview}
                                    alt="Preview TTD"
                                    class="max-h-24 object-contain rounded-lg border border-slate-100 bg-slate-50 p-2"
                                />
                            </div>
                        {/if}
                        <label
                            for="ttd_file"
                            class="flex flex-col items-center gap-2 cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-8 h-8 text-slate-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.5"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                            </svg>
                            <span class="text-sm text-slate-500">
                                {ttdPreview
                                    ? "Ganti file"
                                    : "Klik untuk upload"}
                                <span class="text-slate-400">(PNG / JPG)</span>
                            </span>
                        </label>
                        <input
                            type="file"
                            id="ttd_file"
                            accept="image/*"
                            class="hidden"
                            onchange={onFileChange}
                        />
                    </div>
                    {#if form.ttd_url && !ttdFile}
                        <p class="text-[11px] text-slate-400">
                            File tanda tangan sudah ada. Upload baru untuk
                            mengganti.
                        </p>
                    {/if}
                </div>
            </div>

            <!-- Modal Footer -->
            <div
                class="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3"
            >
                <Button
                    variant="outline"
                    onclick={onClose}
                    class="text-slate-600 font-medium"
                >
                    Batal
                </Button>
                <Button
                    onclick={onSave}
                    disabled={isLoading}
                    class="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-white font-medium"
                >
                    {#if isLoading}
                        <svg
                            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                        Menyimpan...
                    {:else}
                        {modalMode === "tambah" ? "Simpan Data" : "Perbarui"}
                    {/if}
                </Button>
            </div>
        </div>
    </div>
{/if}
