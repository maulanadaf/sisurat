<script>
    import Input from "$lib/components/UI/Input.svelte";
    import Label from "$lib/components/UI/Label.svelte";

    let {
        noUrut = $bindable(),
        jenisSurat = $bindable(),
        noSurat,
        singkatanKegiatan = $bindable(),
        atributSurat = $bindable(),
        lampiran = $bindable(),
        perihal = $bindable(),
        tempatSurat = $bindable(),
        tglSurat = $bindable(),
        kepada = $bindable(),
        lokasiTujuan = $bindable(),
    } = $props();

    let tujuanList = $state(kepada ? kepada.split('\n') : [""]);

    $effect(() => {
        kepada = tujuanList.filter(t => t.trim() !== "").join('\n');
    });

    function addTujuan() {
        tujuanList.push("");
    }

    function removeTujuan(index) {
        if (tujuanList.length > 1) {
            tujuanList.splice(index, 1);
        }
    }
</script>

<section>
    <div class="flex items-center gap-2 mb-4">
        <div
            class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm"
        >
            1
        </div>
        <h3
            class="text-lg font-bold text-slate-800 border-b border-slate-200 pb-1 flex-1"
        >
            Identitas &amp; Tujuan Surat
        </h3>
    </div>
    <div class="grid md:grid-cols-2 gap-x-6 gap-y-5 pl-10">
        <div class="space-y-2 md:col-span-2">
            <Label class="text-slate-600 font-medium">Nomor Surat</Label>
            <div class="flex items-center gap-2 flex-wrap">
                <Input
                    bind:value={noUrut}
                    placeholder="001"
                    required
                    class="w-20 bg-slate-50 focus:border-emerald-500 text-center"
                />
                <span class="text-slate-400 font-bold">/</span>
                <select
                    bind:value={jenisSurat}
                    class="flex h-10 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shrink-0 w-[220px]"
                >
                    <option value="SK">SK (Surat Keputusan)</option>
                    <option value="SU">SU (Surat Undangan)</option>
                    <option value="SPm">SPm (Surat Permohonan)</option>
                    <option value="SPb">SPb (Surat Pemberitahuan)</option>
                    <option value="SPp">SPp (Surat Peminjaman)</option>
                    <option value="SPn">SPn (Surat Pernyataan)</option>
                    <option value="SM">SM (Surat Mandat)</option>
                    <option value="ST">ST (Surat Tugas)</option>
                    <option value="Sket">Sket (Surat Keterangan)</option>
                    <option value="SR">SR (Surat Rekomendasi)</option>
                    <option value="SB">SB (Surat Balasan)</option>
                    <option value="SPPD"
                        >SPPD (Surat Perintah Perjalanan Dinas)</option
                    >
                    <option value="PK">PK (Perjanjian Kerja)</option>
                    <option value="SPeng">SPeng (Surat Pengantar)</option>
                </select>
                <span class="text-slate-400 font-bold">/</span>
                <Input
                    bind:value={singkatanKegiatan}
                    placeholder="Singkatan Kegiatan"
                    required
                    class="flex-1 min-w-[100px] bg-slate-50 focus:border-emerald-500"
                    oninput={(e) =>
                        (singkatanKegiatan = e.target.value.toUpperCase())}
                />
                <span class="text-slate-400 font-bold shrink-0">/</span>
                <Input
                    bind:value={atributSurat}
                    placeholder="UKMK-YDK/III/2026"
                    required
                    class="flex-1 min-w-[120px] bg-slate-50 focus:border-emerald-500"
                />
            </div>
            <p class="text-xs text-slate-500 mt-1">
                Preview Surat: <strong class="text-emerald-700"
                    >{noSurat}</strong
                >
            </p>
        </div>
        <div class="space-y-2">
            <Label class="text-slate-600 font-medium">Lampiran</Label>
            <Input
                bind:value={lampiran}
                class="bg-slate-50 focus:border-emerald-500"
            />
        </div>
        <div class="space-y-2">
            <Label class="text-slate-600 font-medium">Perihal</Label>
            <Input
                bind:value={perihal}
                placeholder="Contoh: Undangan Rapat"
                required
                class="bg-slate-50 focus:border-emerald-500"
            />
        </div>
        <div class="space-y-2">
            <Label class="text-slate-600 font-medium">Tanggal</Label>
            <Input
                type="date"
                bind:value={tglSurat}
                required
                class="block w-full bg-slate-50 focus:border-emerald-500"
            />
        </div>
        <div class="space-y-2">
            <Label class="text-slate-600 font-medium"
                >Tujuan (Kepada Yth.)</Label
            >
            <div class="space-y-2">
                {#each tujuanList as tujuan, index}
                    <div class="flex items-center gap-2">
                        <Input
                            bind:value={tujuanList[index]}
                            placeholder="Contoh: Wakil Rektor III"
                            required
                            class="bg-slate-50 focus:border-emerald-500 flex-1"
                        />
                        {#if tujuanList.length > 1}
                            <button
                                type="button"
                                class="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 border border-red-100 transition-colors"
                                onclick={() => removeTujuan(index)}
                                title="Hapus Tujuan"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        {/if}
                    </div>
                {/each}
                <button
                    type="button"
                    class="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1 mt-1"
                    onclick={addTujuan}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    Tambah Tujuan
                </button>
            </div>
        </div>
    </div>
</section>
