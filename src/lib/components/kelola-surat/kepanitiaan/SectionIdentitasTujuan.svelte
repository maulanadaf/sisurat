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
            <Input
                bind:value={kepada}
                placeholder="Contoh: Wakil Rektor III"
                required
                class="bg-slate-50 focus:border-emerald-500"
            />
        </div>
    </div>
</section>
