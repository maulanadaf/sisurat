<script>
    import Input from "$lib/components/UI/Input.svelte";
    import Label from "$lib/components/UI/Label.svelte";
    import Textarea from "$lib/components/UI/Textarea.svelte";
    import Button from "$lib/components/UI/Button.svelte";

    let {
        paragrafPembuka = $bindable(),
        namaKegiatan = $bindable(),
        hariTglKegiatan = $bindable(),
        waktuKegiatan = $bindable(),
        tempatKegiatan = $bindable(),
        isPeminjaman = $bindable(),
        daftarAlat = $bindable(),
        paragrafPenutup = $bindable(),
    } = $props();

    function addAlat() {
        daftarAlat = [...daftarAlat, { id: Date.now(), nama: "", jumlah: "" }];
    }

    function removeAlat(idToRemove) {
        daftarAlat = daftarAlat.filter((a) => a.id !== idToRemove);
    }
</script>

<section>
    <div class="flex items-center gap-2 mb-4">
        <div
            class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm"
        >
            2
        </div>
        <h3
            class="text-lg font-bold text-slate-800 border-b border-slate-200 pb-1 flex-1"
        >
            Rincian Kegiatan
        </h3>
    </div>
    <div class="grid md:grid-cols-2 gap-x-6 gap-y-5 pl-10">
        <div class="md:col-span-2 space-y-2">
            <Label class="text-slate-600 font-medium">Paragraf Pembuka</Label>
            <Textarea
                bind:value={paragrafPembuka}
                required
                class="bg-slate-50 focus:border-blue-500 min-h-[80px]"
            />
        </div>
        <div class="space-y-2">
            <Label class="text-slate-600 font-medium">Nama/Topik Kegiatan</Label
            >
            <Input
                bind:value={namaKegiatan}
                placeholder="Contoh: Bazar Ramadhan / Pendelegasian"
                required
                class="bg-slate-50 focus:border-blue-500"
            />
        </div>
        <div class="space-y-2">
            <Label class="text-slate-600 font-medium"
                >Hari & Tanggal Pelaksanaan</Label
            >
            <Input
                bind:value={hariTglKegiatan}
                placeholder="Contoh: Sabtu, 16 Maret 2024"
                required
                class="bg-slate-50 focus:border-blue-500"
            />
        </div>
        <div class="space-y-2">
            <Label class="text-slate-600 font-medium">Waktu (Jam)</Label>
            <Input
                bind:value={waktuKegiatan}
                placeholder="Contoh: 15.00 - 17.30 WIB"
                required
                class="bg-slate-50 focus:border-blue-500"
            />
        </div>
        <div class="space-y-2">
            <Label class="text-slate-600 font-medium">Tempat Pelaksanaan</Label>
            <Input
                bind:value={tempatKegiatan}
                placeholder="Contoh: Depan Kampus ITB Yadika Pasuruan"
                required
                class="bg-slate-50 focus:border-blue-500"
            />
        </div>
        <div
            class="md:col-span-2 space-y-4 border-t border-slate-100 pt-5 mt-2"
        >
            <label class="flex items-center gap-3 cursor-pointer group w-max">
                <div
                    class="relative flex items-center justify-center w-5 h-5 border-2 border-slate-300 rounded overflow-hidden group-hover:border-blue-500 transition-colors"
                >
                    <input
                        type="checkbox"
                        bind:checked={isPeminjaman}
                        class="absolute w-full h-full opacity-0 cursor-pointer peer"
                    />
                    <svg
                        class="w-3.5 h-3.5 text-white bg-blue-500 w-full h-full p-0.5 opacity-0 peer-checked:opacity-100 transition-opacity"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <span
                    class="text-slate-700 font-semibold select-none group-hover:text-blue-600 transition-colors"
                    >Sertakan Tabel Peminjaman Barang / Alat</span
                >
            </label>

            {#if isPeminjaman}
                <div
                    class="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2"
                >
                    <table class="w-full text-sm text-left">
                        <thead
                            class="bg-slate-200/60 text-slate-700 uppercase text-[11px] font-bold border-b border-slate-200"
                        >
                            <tr>
                                <th class="px-4 py-3 w-12 text-center">No</th>
                                <th class="px-4 py-3">Nama Alat</th>
                                <th class="px-4 py-3 w-40">Jumlah</th>
                                <th class="px-4 py-3 w-16 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            {#each daftarAlat as alat, index (alat.id)}
                                <tr
                                    class="bg-white hover:bg-slate-50/50 transition-colors"
                                >
                                    <td
                                        class="px-4 py-3 text-center text-slate-500 font-medium"
                                        >{index + 1}.</td
                                    >
                                    <td class="px-4 py-2">
                                        <input
                                            type="text"
                                            bind:value={alat.nama}
                                            class="w-full bg-transparent border-0 focus:ring-0 p-1 text-sm outline-none text-slate-800 font-medium"
                                            required
                                        />
                                    </td>
                                    <td class="px-4 py-2">
                                        <input
                                            type="text"
                                            bind:value={alat.jumlah}
                                            class="w-full bg-transparent border-0 focus:ring-0 p-1 text-sm outline-none text-slate-700"
                                            required
                                        />
                                    </td>
                                    <td class="px-4 py-2 text-center">
                                        <button
                                            type="button"
                                            onclick={() => removeAlat(alat.id)}
                                            class="text-slate-300 hover:text-red-500 transition-colors p-1"
                                            title="Hapus"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="w-5 h-5 mx-auto"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                ><path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                /></svg
                                            >
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                    <div
                        class="bg-white p-3 border-t border-slate-100 flex justify-center"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            onclick={addAlat}
                            class="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs font-semibold rounded-lg px-4 gap-2"
                        >
                            + Tambah Alat
                        </Button>
                    </div>
                </div>
            {/if}
        </div>

        <div
            class="md:col-span-2 space-y-2 pt-2 border-t border-slate-100 mt-2"
        >
            <Label class="text-slate-600 font-medium">Paragraf Penutup</Label>
            <Textarea
                bind:value={paragrafPenutup}
                required
                class="bg-slate-50 focus:border-blue-500 min-h-[80px]"
            />
        </div>
    </div>
</section>
