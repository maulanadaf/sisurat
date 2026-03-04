<script>
    import { cn } from "$lib/utils";

    /** @type {{ class?: string, type?: string, value?: any, [key: string]: any }} */
    let {
        class: className = "",
        type = "text",
        value = $bindable(),
        ...rest
    } = $props();
</script>

<input
    {type}
    bind:value
    class={cn(
        "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
    )}
    {...rest}
/>
