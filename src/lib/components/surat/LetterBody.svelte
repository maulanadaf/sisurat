<script>
    import { onMount } from "svelte";
    import QRCode from "qrcode";

    /**
     * Props untuk isi surat (LetterBody.svelte)
     * Cocok untuk Surat Bidang Inti maupun Kepanitiaan.
     *
     * @prop {string} noSurat         - Nomor surat lengkap
     * @prop {string} tglSurat        - Tanggal surat (YYYY-MM-DD)
     * @prop {string} tempatSurat     - Kota penanda tangan (default: Bangil)
     * @prop {string} lampiran        - Keterangan lampiran
     * @prop {string} perihal         - Perihal surat
     * @prop {string} kepada          - Pihak tujuan
     * @prop {string} lokasiTujuan    - "Di –" lokasi tujuan (opsional, default: Tempat)
     * @prop {string} paragrafPembuka - Paragraf pembuka surat
     * @prop {string} namaKegiatan    - Nama kegiatan (opsional)
     * @prop {string} hariTglKegiatan - Hari & tanggal pelaksanaan (opsional)
     * @prop {string} waktuKegiatan   - Waktu pelaksanaan (opsional)
     * @prop {string} tempatKegiatan  - Tempat pelaksanaan (opsional)
     * @prop {string} paragrafPenutup - Paragraf penutup surat
     * @prop {string} ttdKiriTeks     - Jabatan penandatangan kiri
     * @prop {string} ttdKiriNama     - Nama penandatangan kiri
     * @prop {string} ttdKananTeks    - Jabatan penandatangan kanan
     * @prop {string} ttdKananNama    - Nama penandatangan kanan
     * @prop {string} mengetahuiKiriTeks  - Jabatan mengetahui kiri (opsional)
     * @prop {string} mengetahuiKiriNama  - Nama mengetahui kiri (opsional)
     * @prop {string} mengetahuiKananTeks - Jabatan mengetahui kanan (opsional)
     * @prop {string} mengetahuiKananNama - Nama mengetahui kanan (opsional)
     */
    let {
        noSurat = "",
        tglSurat = "",
        tempatSurat = "Bangil",
        lampiran = "-",
        perihal = "",
        kepada = "",
        lokasiTujuan = "Tempat",
        paragrafPembuka = "",
        namaKegiatan = "",
        hariTglKegiatan = "",
        waktuKegiatan = "",
        tempatKegiatan = "",
        paragrafPenutup = "",
        ttdKiriTeks = "",
        ttdKiriNama = "",
        ttdKiriUrl = "",
        ttdKananTeks = "",
        ttdKananNama = "",
        ttdKananUrl = "",
        mengetahuiKiriTeks = "",
        mengetahuiKiriNama = "",
        mengetahuiKiriUrl = "",
        mengetahuiKananTeks = "",
        mengetahuiKananNama = "",
        mengetahuiKananUrl = "",
        daftarAlat = [],
    } = $props();

    let qrUrl = $state("");

    onMount(async () => {
        try {
            // Hasilkan QR Code yang berisi URL halaman view/cetak saat ini
            qrUrl = await QRCode.toDataURL(window.location.href, {
                margin: 1,
                width: 100,
            });
        } catch (err) {
            console.error("Gagal membuat QR Code:", err);
        }
    });

    // Format tanggal ke "Bangil, DD Bulan YYYY"
    const tglFormatted = $derived(() => {
        if (!tglSurat) return `${tempatSurat}, ___________`;
        const d = new Date(tglSurat);
        const formatted = d.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        return `${tempatSurat}, ${formatted}`;
    });

    // Apakah ada detail kegiatan untuk ditampilkan
    const hasDetail = $derived(
        namaKegiatan || hariTglKegiatan || waktuKegiatan || tempatKegiatan,
    );
</script>

<!-- Isi Surat -->
<div
    class="letter-body w-full"
    style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: black;"
>
    <!-- ==============================
         BARIS IDENTITAS SURAT
         ============================== -->
    <table class="w-full mb-4" style="border-collapse: collapse;">
        <tbody>
            <!-- Kiri: No, Lampiran, Perihal | Kanan: Tempat & Tanggal -->
            <tr>
                <td style="vertical-align: top; width: 55%;">
                    <!-- No -->
                    <table style="border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td
                                    style="padding-right: 4px; vertical-align: top; white-space: nowrap;"
                                    >No</td
                                >
                                <td
                                    style="padding-right: 6px; vertical-align: top; padding-left: 17px;"
                                    >:</td
                                >
                                <td style="vertical-align: top;"
                                    >{noSurat || "___________"}</td
                                >
                            </tr>
                            <tr>
                                <td
                                    style="padding-right: 4px; vertical-align: top; white-space: nowrap;"
                                    >Lampiran</td
                                >
                                <td
                                    style="padding-right: 6px; vertical-align: top;padding-left: 17px;"
                                    >:</td
                                >
                                <td style="vertical-align: top;"
                                    >{lampiran || "-"}</td
                                >
                            </tr>
                            <tr>
                                <td
                                    style="padding-right: 4px; vertical-align: top; white-space: nowrap;"
                                    >Perihal</td
                                >
                                <td
                                    style="padding-right: 6px; vertical-align: top; padding-left: 17px;"
                                    >:</td
                                >
                                <td
                                    style="vertical-align: top; font-weight: bold;"
                                    >{perihal || "___________"}</td
                                >
                            </tr>
                        </tbody>
                    </table>
                </td>
                <!-- Tanggal (kanan, italic) -->
                <td
                    style="vertical-align: top; text-align: right; font-style: italic; white-space: nowrap;"
                >
                    {tglFormatted()}
                </td>
            </tr>
        </tbody>
    </table>

    <!-- ==============================
         TUJUAN SURAT
         ============================== -->
    <div class="mb-4" style="margin-top: 8pt;">
        <table style="border-collapse: collapse;">
            <tbody>
                <tr>
                    <td
                        style="white-space: nowrap; vertical-align: top; padding-right: 4px;"
                        >Kepada Yth.</td
                    >
                    <td style="padding-right: 6px; vertical-align: top;">:</td>
                    <td style="vertical-align: top;"
                        >{kepada || "___________"}</td
                    >
                </tr>
            </tbody>
        </table>
        <div style="margin-top: 4px;">Di &ndash;</div>
        <div style="padding-left: 48px;">
            {lokasiTujuan || "Tempat"}
        </div>
    </div>

    <!-- ==============================
         SALAM PEMBUKA
         ============================== -->
    <p
        style="margin-top: 12pt; font-style: italic; font-weight: bold; margin-bottom: 8pt;"
    >
        Assalamu&rsquo;alaikum Wr. Wb
    </p>

    <!-- ==============================
         DETAIL KEGIATAN (jika ada)
         ============================== -->
    {#if hasDetail}
        {#if namaKegiatan}
            <p
                style="text-align: justify; text-indent: 40px; margin-bottom: 4pt;"
            >
                Teriring salam semoga aktifitas kita sehari-hari senantiasa
                dalam lindungan Allah SWT. Dan ridho-Nya. Aamiin.
            </p>
        {/if}

        <!-- ==============================
         PARAGRAF PEMBUKA
         ============================== -->
        {#if paragrafPembuka}
            <p
                style="text-align: justify; text-indent: 40px; margin-bottom: 6pt;"
            >
                {paragrafPembuka}
            </p>
        {/if}

        <table
            style="border-collapse: collapse; margin-left: 56px; margin-bottom: 6pt;"
        >
            <tbody>
                {#if hariTglKegiatan}
                    <tr>
                        <td
                            style="padding-right: 8px; vertical-align: top; white-space: nowrap;"
                            >Hari/Tanggal</td
                        >
                        <td style="padding-right: 8px; vertical-align: top;"
                            >:</td
                        >
                        <td style="vertical-align: top;">{hariTglKegiatan}</td>
                    </tr>
                {/if}
                {#if waktuKegiatan}
                    <tr>
                        <td
                            style="padding-right: 8px; vertical-align: top; white-space: nowrap;"
                            >Waktu</td
                        >
                        <td style="padding-right: 8px; vertical-align: top;"
                            >:</td
                        >
                        <td style="vertical-align: top;">{waktuKegiatan}</td>
                    </tr>
                {/if}
                {#if tempatKegiatan}
                    <tr>
                        <td
                            style="padding-right: 8px; vertical-align: top; white-space: nowrap;"
                            >Tempat</td
                        >
                        <td style="padding-right: 8px; vertical-align: top;"
                            >:</td
                        >
                        <td style="vertical-align: top;">{tempatKegiatan}</td>
                    </tr>
                {/if}
            </tbody>
        </table>
    {/if}

    {#if hasDetail}
        <!-- ==============================
         DAFTAR ALAT
         ============================== -->
        {#if daftarAlat.length > 0 && daftarAlat[0].nama !== ""}
            <p
                style="text-align: justify; margin-bottom: 4pt; margin-top: 6pt;"
            >
                Adapun alat yang kita pinjam yaitu :
            </p>
            <table
                style="width: 80%; border-collapse: collapse; margin: 0 auto 12pt auto; border: 1px solid black;"
            >
                <thead>
                    <tr>
                        <th
                            style="border: 1px solid black; padding: 4px; width: 50px; text-align: center; font-weight: bold;"
                            >NO.</th
                        >
                        <th
                            style="border: 1px solid black; padding: 4px; text-align: center; font-weight: bold;"
                            >ALAT</th
                        >
                        <th
                            style="border: 1px solid black; padding: 4px; width: 120px; text-align: center; font-weight: bold;"
                            >JUMLAH</th
                        >
                    </tr>
                </thead>
                <tbody>
                    {#each daftarAlat as alat, i}
                        <tr>
                            <td
                                style="border: 1px solid black; padding: 4px; text-align: center;"
                                >{i + 1}.</td
                            >
                            <td
                                style="border: 1px solid black; padding: 4px 8px;"
                                >{alat.nama}</td
                            >
                            <td
                                style="border: 1px solid black; padding: 4px; text-align: center;"
                                >{alat.jumlah}</td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    {/if}

    <!-- ==============================
         PARAGRAF PENUTUP
         ============================== -->
    {#if paragrafPenutup}
        <p style="text-align: justify; text-indent: 40px; margin-bottom: 4pt;">
            {paragrafPenutup}
        </p>

        <p style="text-align: justify; text-indent: 40px; margin-bottom: 4pt;">
            Demikian surat permohonan tempat ini kami sampaikan, atas
            perhatiannya kami ucapkan terima kasih.
        </p>
    {/if}

    <!-- ==============================
         SALAM PENUTUP
         ============================== -->
    <p
        style="font-style: italic; font-weight: bold; margin-top: 10pt; margin-bottom: 20pt;"
    >
        Wassalamu&rsquo;alaikum Wr. Wb.
    </p>

    <!-- ==============================
         BLOK PENANDATANGAN
         ============================== -->
    <div style="display: flex; justify-content: space-around; margin-top: 8pt;">
        <!-- Kiri (Panitia/Bidang Inti) -->
        <div style="text-align: center; min-width: 160px;">
            {#if ttdKiriTeks}
                <p style="margin-bottom: 0;">{ttdKiriTeks}</p>
            {/if}
            <!-- Ruang tanda tangan -->
            <div
                style="min-height: {ttdKiriUrl
                    ? '0'
                    : '56px'}; display: flex; align-items: flex-end; justify-content: center; margin-bottom: -20px; position: relative; z-index: 0;"
            >
                {#if ttdKiriUrl}
                    <img
                        src={ttdKiriUrl}
                        alt="TTD"
                        style="max-height: 110px; max-width: 250px; object-fit: contain;"
                    />
                {/if}
            </div>
            {#if ttdKiriNama}
                <p
                    style="font-weight: bold; margin-bottom: 0; margin-top: 0; text-decoration: underline; position: relative; z-index: 10;"
                >
                    {ttdKiriNama}
                </p>
            {:else}
                <div
                    style="width: 160px; margin: 0 auto; text-decoration: underline;"
                ></div>
            {/if}
        </div>

        <!-- Kanan (Pembina/Mengetahui) -->
        <div style="text-align: center; min-width: 160px;">
            {#if ttdKananTeks}
                <p style="margin-bottom: 0;">{ttdKananTeks}</p>
            {/if}
            <div
                style="min-height: {ttdKananUrl
                    ? '0'
                    : '56px'}; display: flex; align-items: flex-end; justify-content: center; margin-bottom: -20px; position: relative; z-index: 0;"
            >
                {#if ttdKananUrl}
                    <img
                        src={ttdKananUrl}
                        alt="TTD"
                        style="max-height: 110px; max-width: 250px; object-fit: contain;"
                    />
                {/if}
            </div>
            {#if ttdKananNama}
                <p
                    style="font-weight: bold; margin-bottom: 0; margin-top: 0; text-decoration: underline; position: relative; z-index: 10;"
                >
                    {ttdKananNama}
                </p>
            {:else}
                <div
                    style="width: 160px; margin: 0 auto; text-decoration: underline;"
                ></div>
            {/if}
        </div>
    </div>

    <!-- Mengetahui (baris kedua, jika ada) -->
    {#if mengetahuiKiriTeks || mengetahuiKananTeks}
        <p
            style="margin-bottom: 0; font-style: italic; margin-top: 28pt; text-align: center;"
        >
            Mengetahui,
        </p>
        <div
            style="display: flex; justify-content: {mengetahuiKiriTeks &&
            mengetahuiKananTeks
                ? 'space-around'
                : 'center'}; margin-top: 8pt;"
        >
            {#if mengetahuiKiriTeks}
                <div style="text-align: center; min-width: 160px;">
                    <p style="margin-bottom: 0;">{mengetahuiKiriTeks}</p>
                    <div
                        style="min-height: {mengetahuiKiriUrl
                            ? '0'
                            : '56px'}; display: flex; align-items: flex-end; justify-content: center; margin-bottom: -20px; position: relative; z-index: 0;"
                    >
                        {#if mengetahuiKiriUrl}
                            <img
                                src={mengetahuiKiriUrl}
                                alt="TTD"
                                style="max-height: 110px; max-width: 250px; object-fit: contain;"
                            />
                        {/if}
                    </div>
                    {#if mengetahuiKiriNama}
                        <p
                            style="font-weight: bold; margin-bottom: 0; margin-top: 0; text-decoration: underline; position: relative; z-index: 10;"
                        >
                            {mengetahuiKiriNama}
                        </p>
                    {:else}
                        <div
                            style="width: 160px; margin: 0 auto; text-decoration: underline;"
                        ></div>
                    {/if}
                </div>
            {/if}

            {#if mengetahuiKananTeks}
                <div style="text-align: center; min-width: 160px;">
                    <p style="margin-bottom: 0;">{mengetahuiKananTeks}</p>
                    <div
                        style="min-height: {mengetahuiKananUrl
                            ? '0'
                            : '56px'}; display: flex; align-items: flex-end; justify-content: center; margin-bottom: -20px; position: relative; z-index: 0;"
                    >
                        {#if mengetahuiKananUrl}
                            <img
                                src={mengetahuiKananUrl}
                                alt="TTD"
                                style="max-height: 110px; max-width: 250px; object-fit: contain;"
                            />
                        {/if}
                    </div>
                    {#if mengetahuiKananNama}
                        <p
                            style="font-weight: bold; margin-bottom: 0; margin-top: 0; text-decoration: underline; position: relative; z-index: 10;"
                        >
                            {mengetahuiKananNama}
                        </p>
                    {:else}
                        <div
                            style="width: 160px; margin: 0 auto; text-decoration: underline;"
                        ></div>
                    {/if}
                </div>
            {/if}
        </div>
    {/if}

    <!-- ==============================
         QR CODE
         ============================== -->
    {#if qrUrl}
        <div
            style="position: absolute; bottom: 30px; right: 40px; text-align: center;"
        >
            <img
                src={qrUrl}
                alt="QR Validasi"
                style="width: 70px; height: 70px; display: block; margin: 0 auto;"
            />
            <p
                style="font-size: 7pt; margin-top: 2px; color: #475569; font-family: sans-serif;"
            >
                Scan untuk validasi
            </p>
        </div>
    {/if}
</div>
