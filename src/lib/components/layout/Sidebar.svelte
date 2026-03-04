<script>
    import { page } from "$app/state";
    import logoImg from "$lib/assets/logo.png";
    import { slide } from "svelte/transition";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    let { isOpen = true } = $props();

    let userEmail = $state("Memuat...");
    let userInitial = $state("A");

    onMount(async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user) {
            userEmail = user.email;
            userInitial = userEmail.charAt(0).toUpperCase();
        } else {
            userEmail = "Tidak diketahui";
        }
    });

    let openMenus = $state({
        kelola: false,
    });

    function toggleMenu(id) {
        openMenus[id] = !openMenus[id];
    }

    const menus = [
        {
            id: "dashboard",
            label: "Dashboard",
            href: "/",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
        },
        {
            id: "kelola",
            label: "Kelola Surat",
            href: "/kelola-surat",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>`,
        },
        {
            id: "arsip",
            label: "Arsip Surat",
            href: "/arsip",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6"/></svg>`,
        },
    ];

    let currentPath = $derived(page.url.pathname);

    $effect(() => {
        if (currentPath.includes("/kelola-surat")) {
            openMenus.kelola = true;
        }
    });

    function handleLogout() {
        localStorage.removeItem("isAuthenticated");
        window.location.href = "/login";
    }
</script>

<aside
    class="fixed inset-y-0 left-0 z-50 flex flex-col w-[280px] h-screen bg-gradient-to-b from-[var(--primarySoft)] to-[var(--primaryDark)] text-white transition-transform duration-300 ease-in-out shadow-2xl {isOpen
        ? 'translate-x-0'
        : '-translate-x-full'} md:translate-x-0 overflow-hidden"
>
    <!-- Background Decoration -->
    <div
        class="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style="background-image: radial-gradient(circle at 100% 0%, var(--accent) 0%, transparent 50%);"
    ></div>

    <!-- Header / Logo -->
    <div
        class="relative z-10 flex items-center gap-3 px-6 h-24 border-b border-white/10"
    >
        <div
            class="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-md shrink-0"
        >
            <img
                src={logoImg}
                alt="Logo"
                class="w-full h-full object-contain"
            />
        </div>
        <div class="flex flex-col">
            <div
                class="text-2xl font-bold tracking-wide text-white leading-tight"
            >
                <span class="text-[var(--accent)]">Si</span><span
                    class="text-white">Surat</span
                >
            </div>
        </div>
    </div>

    <!-- Navigation -->
    <nav
        class="relative z-10 flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar"
    >
        <div
            class="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-4 px-3"
        >
            Menu Utama
        </div>
        {#each menus as menu}
            {#if menu.subMenus}
                <div class="space-y-1">
                    <button
                        onclick={() => toggleMenu(menu.id)}
                        class="w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden relative text-white/75 hover:bg-white/10 hover:text-white"
                    >
                        <div class="flex items-center gap-3.5">
                            <div
                                class="relative z-10 text-white/60 group-hover:text-white transition-colors"
                            >
                                {@html menu.icon}
                            </div>
                            <span class="relative z-10 font-medium">
                                {menu.label}
                            </span>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-4 h-4 transition-transform duration-300 {openMenus[
                                menu.id
                            ]
                                ? 'rotate-180'
                                : ''}"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {#if openMenus[menu.id]}
                        <div
                            class="pl-12 pr-2 py-1 space-y-1"
                            transition:slide={{ duration: 200 }}
                        >
                            {#each menu.subMenus as sub}
                                <a
                                    href={sub.href}
                                    class="block px-3 py-2.5 rounded-lg transition-all duration-200 text-sm relative overflow-hidden group
                                           {currentPath === sub.href
                                        ? 'text-[var(--primary)] font-semibold shadow-sm'
                                        : 'text-white/60 hover:text-white hover:bg-white/10'}"
                                >
                                    {#if currentPath === sub.href}
                                        <div
                                            class="absolute inset-0 bg-[var(--accent)] z-0"
                                        ></div>
                                    {/if}
                                    <span
                                        class="relative z-10 flex items-center gap-2"
                                    >
                                        <span
                                            class="w-1.5 h-1.5 rounded-full {currentPath ===
                                            sub.href
                                                ? 'bg-[var(--primary)]'
                                                : 'bg-transparent border border-white/40 group-hover:border-white'} transition-colors"
                                        ></span>
                                        {sub.label}
                                    </span>
                                </a>
                            {/each}
                        </div>
                    {/if}
                </div>
            {:else}
                <a
                    href={menu.href}
                    class="flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden relative
                           {currentPath === menu.href
                        ? 'text-[var(--primary)] shadow-[0_4px_20px_-4px_rgba(245,196,0,0.5)] font-semibold'
                        : 'text-white/75 hover:bg-white/10 hover:text-white'}"
                >
                    <!-- Active Background Pill -->
                    {#if currentPath === menu.href}
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[#fcd94b] z-0"
                        ></div>
                    {/if}

                    <div
                        class="relative z-10 {currentPath === menu.href
                            ? 'text-[var(--primary)]'
                            : 'text-white/60 group-hover:text-white'} transition-colors"
                    >
                        {@html menu.icon}
                    </div>
                    <span
                        class="relative z-10 {currentPath === menu.href
                            ? 'font-bold'
                            : 'font-medium'}"
                    >
                        {menu.label}
                    </span>

                    {#if currentPath === menu.href}
                        <div
                            class="absolute right-3 w-1.5 h-1.5 rounded-full bg-[var(--primary)]/50 z-10"
                        ></div>
                    {/if}
                </a>
            {/if}
        {/each}
    </nav>

    <!-- Footer Profile / Logout -->
    <div
        class="relative z-10 p-5 mx-4 mb-4 mt-auto rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3"
    >
        <div class="flex items-center gap-3 px-1">
            <div
                class="w-10 h-10 rounded-full {userEmail ===
                'ukmkewirausahaan2000@gmail.com'
                    ? 'bg-transparent p-0.5'
                    : 'bg-[var(--accent)]'} flex items-center justify-center text-[var(--primary)] font-bold text-sm shrink-0 overflow-hidden"
            >
                {#if userEmail === "ukmkewirausahaan2000@gmail.com"}
                    <img
                        src={logoImg}
                        alt="Profil"
                        class="w-full h-full object-cover"
                    />
                {:else}
                    {userInitial}
                {/if}
            </div>
            <div class="flex flex-col overflow-hidden">
                <span class="text-sm font-semibold text-white truncate"
                    >Administrator</span
                >
                <span class="text-[10px] text-white/60 truncate"
                    >{userEmail}</span
                >
            </div>
        </div>
        <button
            onclick={handleLogout}
            class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-red-500 hover:text-white text-white/80 transition-all duration-300 group text-sm font-medium mt-1"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
            </svg>
            Keluar Sistem
        </button>
    </div>
</aside>

<style>
    /* Custom Scrollbar for modern look */
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.4);
    }
</style>
