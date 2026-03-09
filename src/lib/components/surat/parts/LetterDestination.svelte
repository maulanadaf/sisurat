<script>
    let { kepada = "", lokasiTujuan = "Tempat" } = $props();
</script>

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
                <td style="vertical-align: top;">{kepada || "___________"}</td>
            </tr>
        </tbody>
    </table>
    <div style="margin-top: 4px;">Di &ndash;</div>
    <div style="padding-left: 48px;">
        {lokasiTujuan || "Tempat"}
    </div>
</div>
