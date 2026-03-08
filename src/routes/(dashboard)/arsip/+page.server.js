import { supabase } from '$lib/supabaseClient';

export async function load() {
    let { data, error } = await supabase
        .from('surat')
        .select('id, nomor_surat_full, tgl_surat, kepada, perihal, kategori, jenis_surat, status')
        .order('created_at', { ascending: false });

    // Fallback jika kolom status belum ada di database
    if (error && error.message.includes('status')) {
        console.warn('[arsip] Kolom status tidak ditemukan, melakukan fallback query...');
        const fallback = await supabase
            .from('surat')
            .select('id, nomor_surat_full, tgl_surat, kepada, perihal, kategori, jenis_surat')
            .order('created_at', { ascending: false });
        data = fallback.data;
        error = fallback.error;
    }

    if (error) {
        console.error('[arsip] Gagal mengambil data arsip surat:', error.message);
        return { arsipSurat: [] };
    }

    let arsipSurat = (data ?? []).map((s) => ({
        id: s.id,
        noSurat: s.nomor_surat_full ?? '-',
        tanggal: s.tgl_surat ?? '-',
        pihak: s.kepada ?? '-',
        perihal: s.perihal ?? '-',
        kategori: s.kategori ?? '-',
        jenisSurat: s.jenis_surat ?? '-',
        status: s.status ?? 'Draft', // default ke Draft jika belum ada nilainya
    }));

    // Filter hanya surat yang sudah Selesai
    arsipSurat = arsipSurat.filter(s => s.status === 'Selesai');

    return { arsipSurat };
}
