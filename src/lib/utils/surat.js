import { supabase } from "$lib/supabaseClient";

/**
 * Mengambil nomor urut terakhir (terbesar) berdasarkan kategori surat.
 * @param {string} kategori - "Bidang Inti" atau "Kepanitiaan"
 * @returns {Promise<string>} String nomor urut berikutnya (misal: "001", "012")
 */
export async function getNextNomorUrut(kategori) {
    const { data, error } = await supabase
        .from('surat')
        .select('nomor_urut')
        .eq('kategori', kategori)
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error("Gagal mendapatkan nomor urut:", error);
        return "001";
    }

    if (!data || data.length === 0) {
        return "001";
    }

    const lastNoUrutStr = data[0].nomor_urut;
    const lastNoUrut = parseInt(lastNoUrutStr, 10);

    if (isNaN(lastNoUrut)) {
        return "001";
    }

    const nextNoUrut = lastNoUrut + 1;
    // Format menjadi 3 digit (contoh: 1 -> 001, 12 -> 012)
    return nextNoUrut.toString().padStart(3, '0');
}
