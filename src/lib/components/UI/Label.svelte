<script>
    import { cn } from "$lib/utils";

    /** @type {{ class?: string, for?: string, children?: any, [key: string]: any }} */
    let {
        class: className = "",
        for: forId = "",
        children,
        ...rest
    } = $props();
</script>

<label
    for={forId}
    class={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
    )}
    {...rest}
>
    {@render children?.()}
</label>
