import { supabase } from '$lib/supabaseClient';

export async function load() {
    const { data, error } = await supabase
        .from('surat')
        .select('id, nomor_surat_full, tgl_surat, kepada, lokasi_tujuan, perihal, kategori')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[kelola-surat] Gagal mengambil data riwayat surat:', error.message, error);
        return { riwayatSurat: [] };
    }

    console.log('[kelola-surat] Data dari Supabase:', JSON.stringify(data));
    // Map kolom database ke format yang dipakai komponen RiwayatSuratTable
    // Sesuai skema: kepada = pihak tujuan, lokasi_tujuan = lokasi penerima (opsional)
    const riwayatSurat = (data ?? []).map((s) => ({
        id: s.id,
        noSurat: s.nomor_surat_full ?? '-',
        tanggal: s.tgl_surat ?? '-',
        pihak: s.kepada ?? '-',
        perihal: s.perihal ?? '-',
        kategori: s.kategori ?? '-',
        status: 'Terkirim',
    }));

    return { riwayatSurat };
}
