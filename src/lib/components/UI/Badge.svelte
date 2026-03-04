<script module>
    import { tv } from "tailwind-variants";

    export const badgeVariants = tv({
        base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-[var(--primary)] focus:ring-offset-2",
        variants: {
            variant: {
                default:
                    "border-transparent bg-[var(--primary)] text-white hover:bg-[var(--primary)]/80",
                secondary:
                    "border-transparent bg-[var(--soft)] text-[var(--dark)] hover:bg-[var(--soft)]/80",
                destructive:
                    "border-transparent bg-red-500 text-white hover:bg-red-500/80",
                outline: "text-foreground",
                accent: "border-transparent bg-[var(--accent)] text-[var(--dark)] hover:bg-[var(--accent)]/80",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    });
</script>

<script>
    import { cn } from "$lib/utils";

    /** @type {{ class?: string, variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'accent', children?: any, [key: string]: any }} */
    let {
        class: className = "",
        variant = "default",
        children,
        ...rest
    } = $props();
</script>

<div class={cn(badgeVariants({ variant, className }))} {...rest}>
    {@render children?.()}
</div>
