<script>
    let { kepada = "", lokasiTujuan = "Tempat" } = $props();
    let kepadaList = $derived(kepada ? kepada.split('\n').filter(k => k.trim() !== '') : []);
</script>

<!-- ==============================
     TUJUAN SURAT
     ============================== -->
<div class="mb-2" style="margin-top: 4pt;">
    <table style="border-collapse: collapse;">
        <tbody>
            <tr>
                <td
                    style="white-space: nowrap; vertical-align: top; padding-right: 4px;"
                    >Kepada Yth.</td
                >
                <td style="padding-right: 6px; vertical-align: top;">:</td>
                <td style="vertical-align: top;">
                    {#if kepadaList.length > 1}
                        <ol style="margin: 0; padding-left: 20px; list-style-type: decimal; line-height: 1.2;">
                            {#each kepadaList as item}
                                <li style="margin-bottom: 0px;">{item}</li>
                            {/each}
                        </ol>
                    {:else}
                        {kepadaList[0] || "___________"}
                    {/if}
                </td>
            </tr>
        </tbody>
    </table>
    <div style="margin-top: 4px;">Di &ndash;</div>
    <div style="padding-left: 48px;">
        {lokasiTujuan || "Tempat"}
    </div>
</div>
