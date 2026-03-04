<script>
    import { cn } from "$lib/utils";

    /** @type {{ class?: string, value?: any, [key: string]: any }} */
    let { class: className = "", value = $bindable(), ...rest } = $props();
</script>

<textarea
    bind:value
    class={cn(
        "flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
    )}
    {...rest}
></textarea>
