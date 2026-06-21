<script>
    import { onMount } from "svelte";
    import QRCode from "qrcode";
    import LetterHeaderInfo from "./parts/LetterHeaderInfo.svelte";
    import LetterDestination from "./parts/LetterDestination.svelte";
    import LetterContent from "./parts/LetterContent.svelte";
    import LetterSignatures from "./parts/LetterSignatures.svelte";

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
        status = "Draft",
        showQr = false,
    } = $props();

    let qrUrl = $state("");

    onMount(async () => {
        if (showQr && status === "Selesai") {
            try {
                // Hasilkan QR Code yang berisi URL halaman view/cetak saat ini
                qrUrl = await QRCode.toDataURL(window.location.href, {
                    margin: 1,
                    width: 100,
                });
            } catch (err) {
                console.error("Gagal membuat QR Code:", err);
            }
        }
    });
</script>

<!-- Isi Surat -->
<div
    class="letter-body w-full"
    style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: black;"
>
    <LetterHeaderInfo {noSurat} {lampiran} {perihal} {tempatSurat} {tglSurat} />

    <LetterDestination {kepada} {lokasiTujuan} />

    <LetterContent
        {noSurat}
        {paragrafPembuka}
        {namaKegiatan}
        {hariTglKegiatan}
        {waktuKegiatan}
        {tempatKegiatan}
        {daftarAlat}
        {paragrafPenutup}
    />

    <LetterSignatures
        {ttdKiriTeks}
        {ttdKiriNama}
        {ttdKiriUrl}
        {ttdKananTeks}
        {ttdKananNama}
        {ttdKananUrl}
        {mengetahuiKiriTeks}
        {mengetahuiKiriNama}
        {mengetahuiKiriUrl}
        {mengetahuiKananTeks}
        {mengetahuiKananNama}
        {mengetahuiKananUrl}
    />

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
