import { supabase } from '$lib/supabaseClient';

export async function load() {
    let { data, error } = await supabase
        .from('surat')
        .select('id, nomor_surat_full, tgl_surat, kepada, perihal, kategori, status')
        .order('created_at', { ascending: false });

    // Fallback jika kolom status belum ada di Supabase
    if (error && error.message.includes('status')) {
        console.warn('[kelola-surat] Kolom status tidak ditemukan, melakukan fallback query...');
        const fallback = await supabase
            .from('surat')
            .select('id, nomor_surat_full, tgl_surat, kepada, lokasi_tujuan, perihal, kategori')
            .order('created_at', { ascending: false });
        data = fallback.data;
        error = fallback.error;
    }

    if (error) {
        console.error('[kelola-surat] Gagal mengambil data riwayat surat:', error.message, error);
        return { riwayatSurat: [] };
    }

    console.log('[kelola-surat] Data dari Supabase:', JSON.stringify(data));
    // Map kolom database ke format yang dipakai komponen RiwayatSuratTable
    const riwayatSurat = (data ?? []).map((s) => ({
        id: s.id,
        noSurat: s.nomor_surat_full ?? '-',
        tanggal: s.tgl_surat ?? '-',
        pihak: s.kepada ?? '-',
        perihal: s.perihal ?? '-',
        kategori: s.kategori ?? '-',
        status: s.status ?? 'Draft', // default ke Draft jika belum ada nilainya
    }));

    return { riwayatSurat };
}
