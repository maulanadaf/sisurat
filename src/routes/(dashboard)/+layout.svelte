<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Sidebar from "$lib/components/layout/Sidebar.svelte";

    let { children } = $props();
    let isSidebarOpen = $state(false);
    let isAuthenticated = $state(false);

    onMount(() => {
        // Cek apakah user sudah login (disimpan di localStorage)
        const checkAuth = localStorage.getItem("isAuthenticated");
        if (!checkAuth) {
            goto("/login");
        } else {
            isAuthenticated = true;
        }
    });

    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
    }
</script>

{#if isAuthenticated}
    <div
        class="flex min-h-screen bg-[var(--soft)] w-full overflow-hidden text-[var(--dark)]"
    >
        <!-- Sidebar Component -->
        <Sidebar isOpen={isSidebarOpen} />

        <!-- Overlay for mobile when sidebar is open -->
        {#if isSidebarOpen}
            <button
                type="button"
                class="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm transition-opacity"
                onclick={toggleSidebar}
                aria-label="Tutup sidebar"
            ></button>
        {/if}

        <!-- Main Content Area -->
        <main
            class="flex-1 min-w-0 transition-all duration-300 ease-in-out md:ml-[280px] relative min-h-screen flex flex-col"
        >
            <!-- Mobile Header (Visible only on medium screens and below) -->
            <header
                class="md:hidden flex items-center justify-between p-4 bg-white shadow-sm z-30 sticky top-0 w-full"
            >
                <h2
                    class="text-xl font-bold tracking-wider text-[var(--primary)] flex items-center gap-1"
                >
                    <span class="text-[var(--accent)]">Si</span>Surat
                </h2>
                <button
                    type="button"
                    onclick={toggleSidebar}
                    class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    aria-label="Buka navigasi menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </header>

            <!-- Content Area -->
            <div class="p-6 md:p-8 flex-1 overflow-x-hidden">
                <!-- Render Child Pages Here -->
                {@render children()}
            </div>
        </main>
    </div>
{/if}
