<script>
    let {
        noSurat = "",
        paragrafPembuka = "",
        namaKegiatan = "",
        hariTglKegiatan = "",
        waktuKegiatan = "",
        tempatKegiatan = "",
        daftarAlat = [],
        paragrafPenutup = "",
    } = $props();

    // Apakah ada detail kegiatan untuk ditampilkan
    const hasDetail = $derived(
        namaKegiatan || hariTglKegiatan || waktuKegiatan || tempatKegiatan,
    );

    // Dapatkan nama jenis surat dari singkatan di No Surat
    const jenisSuratLengkap = $derived(() => {
        if (!noSurat) return "surat";

        const parts = noSurat.split("/");
        if (parts.length < 2) return "surat";

        // Bagian kedua dari no surat biasanya singkatan jenis surat
        const singkatan = parts[1];
        switch (singkatan) {
            case "SK":
                return "Surat Keputusan";
            case "SU":
                return "Surat Undangan";
            case "SPm":
                return "Surat Permohonan";
            case "SPb":
                return "Surat Pemberitahuan";
            case "SPp":
                return "Surat Peminjaman";
            case "SPn":
                return "Surat Pernyataan";
            case "SM":
                return "Surat Mandat";
            case "ST":
                return "Surat Tugas";
            case "Sket":
                return "Surat Keterangan";
            case "SR":
                return "Surat Rekomendasi";
            case "SB":
                return "Surat Balasan";
            case "SPPD":
                return "Surat Perintah Perjalanan Dinas";
            case "PK":
                return "Perjanjian Kerja";
            case "SPeng":
                return "Surat Pengantar";
            default:
                return "surat";
        }
    });
</script>

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
        <p style="text-align: justify; text-indent: 40px; margin-bottom: 4pt;">
            Teriring salam semoga aktifitas kita sehari-hari senantiasa dalam
            lindungan Allah SWT. Dan ridho-Nya. Aamiin.
        </p>
    {/if}

    <!-- ==============================
         PARAGRAF PEMBUKA
         ============================== -->
    {#if paragrafPembuka}
        <p style="text-align: justify; text-indent: 40px; margin-bottom: 6pt;">
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
                    <td style="padding-right: 8px; vertical-align: top;">:</td>
                    <td style="vertical-align: top;">{hariTglKegiatan}</td>
                </tr>
            {/if}
            {#if waktuKegiatan}
                <tr>
                    <td
                        style="padding-right: 8px; vertical-align: top; white-space: nowrap;"
                        >Waktu</td
                    >
                    <td style="padding-right: 8px; vertical-align: top;">:</td>
                    <td style="vertical-align: top;">{waktuKegiatan}</td>
                </tr>
            {/if}
            {#if tempatKegiatan}
                <tr>
                    <td
                        style="padding-right: 8px; vertical-align: top; white-space: nowrap;"
                        >Tempat</td
                    >
                    <td style="padding-right: 8px; vertical-align: top;">:</td>
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
        <p style="text-align: justify; margin-bottom: 4pt; margin-top: 6pt;">
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
                        <td style="border: 1px solid black; padding: 4px 8px;"
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
        Demikian {jenisSuratLengkap().toLowerCase()} ini kami sampaikan, atas perhatiannya
        kami ucapkan terima kasih.
    </p>
{/if}

<!-- ==============================
     SALAM PENUTUP
     ============================== -->
<p
    style="font-style: italic; font-weight: bold; margin-top: 10pt; margin-bottom: 4pt;"
>
    Wassalamu&rsquo;alaikum Wr. Wb.
</p>
