<script>
    let {
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
    } = $props();
</script>

<!-- ==============================
     BLOK PENANDATANGAN
     ============================== -->
<div style="display: flex; justify-content: space-around; margin-top: 4pt;">
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
        style="margin-bottom: 0; font-style: italic; margin-top: 12pt; text-align: center;"
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
