<script module>
    import { tv } from "tailwind-variants";
    export const buttonVariants = tv({
        base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants: {
            variant: {
                default:
                    "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90",
                destructive: "bg-red-500 text-white hover:bg-red-500/90",
                outline:
                    "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
                secondary:
                    "bg-[var(--soft)] text-[var(--dark)] hover:bg-[var(--soft)]/80",
                ghost: "hover:bg-slate-100 hover:text-slate-900",
                link: "text-[var(--primary)] underline-offset-4 hover:underline",
                accent: "bg-[var(--accent)] text-[var(--dark)] hover:bg-[var(--accent)]/90",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    });
</script>

<script>
    import { cn } from "$lib/utils";

    /** @type {{ class?: string, variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'accent', size?: 'default' | 'sm' | 'lg' | 'icon', type?: 'button' | 'submit' | 'reset', disabled?: boolean, children?: any, [key: string]: any }} */
    let {
        class: className = "",
        variant = "default",
        size = "default",
        type = "button",
        disabled = false,
        children,
        ...rest
    } = $props();
</script>

<button
    {type}
    class={cn(buttonVariants({ variant, size, className }))}
    {disabled}
    {...rest}
>
    {@render children?.()}
</button>
