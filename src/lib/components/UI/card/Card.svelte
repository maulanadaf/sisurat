<script>
    import { cn } from "$lib/utils";

    let { class: className = "", children, ...rest } = $props();
</script>

<div
    class={cn(
        "rounded-xl border bg-white text-[var(--dark)] shadow",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</div>
