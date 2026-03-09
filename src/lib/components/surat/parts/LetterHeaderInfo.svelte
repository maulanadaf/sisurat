<script>
    let {
        noSurat = "",
        lampiran = "-",
        perihal = "",
        tempatSurat = "Bangil",
        tglSurat = "",
    } = $props();

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
</script>

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
                            <td style="vertical-align: top; font-weight: bold;"
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
