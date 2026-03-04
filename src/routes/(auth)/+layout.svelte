<script>
    let { children } = $props();
</script>

<div
    class="min-h-screen bg-[var(--soft)] flex items-center justify-center p-4 selection:bg-[var(--accent)] selection:text-[var(--primary)]"
>
    {@render children()}
</div>
