<script>
    import { supabase } from "$lib/supabaseClient";
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
    } from "$lib/components/UI/card";
    import Input from "$lib/components/UI/Input.svelte";
    import Label from "$lib/components/UI/Label.svelte";
    import Button from "$lib/components/UI/Button.svelte";
    import logoImg from "$lib/assets/logo.png";

    let username = $state("");
    let password = $state("");
    let isLoading = $state(false);
    let errorMessage = $state("");

    /** @param {Event} e */
    async function handleLogin(e) {
        e.preventDefault();
        isLoading = true;
        errorMessage = "";

        // Login ke Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });

        isLoading = false;

        if (error) {
            errorMessage = error.message;
        } else {
            // Set session login opsional, Supabase sudah handle session cookie/localStorage
            localStorage.setItem("isAuthenticated", "true");
            window.location.href = "/";
        }
    }
</script>

<svelte:head>
    <title>Masuk - SiSurat</title>
</svelte:head>

<div class="w-full max-w-md mx-auto relative group">
    <!-- Dekorasi Background Glow -->
    <div
        class="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"
    ></div>

    <Card
        class="relative bg-white border-0 shadow-xl rounded-2xl overflow-hidden"
    >
        <!-- Accent Line Top -->
        <div
            class="h-1.5 w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] absolute top-0 left-0"
        ></div>

        <CardHeader class="space-y-3 pt-8 pb-4 text-center">
            <div class="flex justify-center mb-2">
                <div
                    class="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 p-2 overflow-hidden"
                >
                    <img
                        src={logoImg}
                        alt="Logo ITB Yadika"
                        class="w-full h-full object-contain"
                    />
                </div>
            </div>
            <CardTitle
                class="text-2xl font-bold tracking-tight text-[var(--primary)]"
            >
                Selamat Datang
            </CardTitle>
            <CardDescription class="text-slate-500 font-medium">
                Masuk ke akun SiSurat Anda
            </CardDescription>
        </CardHeader>

        <form onsubmit={handleLogin}>
            <CardContent class="space-y-5 px-8">
                {#if errorMessage}
                    <div
                        class="bg-red-50 text-red-600 text-sm font-medium p-3 rounded-lg border border-red-100 flex items-start gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 flex-shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        {errorMessage}
                    </div>
                {/if}

                <div class="space-y-2 relative group/input">
                    <Label for="username" class="text-[var(--dark)]"
                        >Email / Username</Label
                    >
                    <div class="relative">
                        <div
                            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-[var(--primary)] transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <Input
                            id="username"
                            type="email"
                            placeholder="Masukkan email anda..."
                            required
                            bind:value={username}
                            disabled={isLoading}
                            class="pl-10 h-11 border-slate-200 bg-slate-50 hover:bg-white focus:bg-white transition-colors"
                        />
                    </div>
                </div>

                <div class="space-y-2 relative group/input">
                    <div class="flex items-center justify-between">
                        <Label for="password" class="text-[var(--dark)]"
                            >Kata Sandi</Label
                        >
                        <a
                            href="#lupa-sandi"
                            class="text-xs font-semibold text-[var(--primary)] hover:text-[var(--accent)] transition-colors hover:underline"
                        >
                            Lupa sandi?
                        </a>
                    </div>
                    <div class="relative">
                        <div
                            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-[var(--primary)] transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            bind:value={password}
                            disabled={isLoading}
                            class="pl-10 h-11 border-slate-200 bg-slate-50 hover:bg-white focus:bg-white transition-colors"
                        />
                    </div>
                </div>
            </CardContent>

            <CardFooter class="flex flex-col px-8 pb-8 pt-2 gap-4">
                <Button
                    type="submit"
                    disabled={isLoading}
                    class="w-full h-11 shadow-md hover:shadow-lg transition-all"
                >
                    {#if isLoading}
                        <svg
                            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Memproses...
                    {:else}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                        </svg>
                        Masuk Sistem
                    {/if}
                </Button>

                <p class="text-xs text-center text-slate-500">
                    Sistem Manajemen Surat v1.0 <br />
                    &copy; 2026 Hak Cipta Dilindungi
                </p>
            </CardFooter>
        </form>
    </Card>
</div>
