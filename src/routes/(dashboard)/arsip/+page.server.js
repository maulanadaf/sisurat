import { supabase } from '$lib/supabaseClient';

export async function load() {
    const { data, error } = await supabase
        .from('surat')
        .select('id, nomor_surat_full, tgl_surat, kepada, perihal, kategori, jenis_surat')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[arsip] Gagal mengambil data arsip surat:', error.message);
        return { arsipSurat: [] };
    }

    const arsipSurat = (data ?? []).map((s) => ({
        id: s.id,
        noSurat: s.nomor_surat_full ?? '-',
        tanggal: s.tgl_surat ?? '-',
        pihak: s.kepada ?? '-',
        perihal: s.perihal ?? '-',
        kategori: s.kategori ?? '-',
        jenisSurat: s.jenis_surat ?? '-',
        status: 'Terkirim',
    }));

    return { arsipSurat };
}
