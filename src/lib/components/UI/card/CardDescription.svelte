<script>
    import { cn } from "$lib/utils";
    let { class: className = "", children, ...rest } = $props();
</script>

<p class={cn("text-sm text-gray-500", className)} {...rest}>
    {@render children?.()}
</p>
