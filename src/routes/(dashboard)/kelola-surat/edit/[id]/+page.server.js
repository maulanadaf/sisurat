import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const { id } = params;

    // Load data surat utama
    const { data: surat, error: suratError } = await supabase
        .from('surat')
        .select('*')
        .eq('id', id)
        .single();

    if (suratError || !surat) {
        throw error(404, 'Surat tidak ditemukan.');
    }

    // Load konten surat
    const { data: konten } = await supabase
        .from('surat_konten')
        .select('*')
        .eq('surat_id', id)
        .single();

    // Load daftar alat
    const { data: alat } = await supabase
        .from('surat_alat')
        .select('*')
        .eq('surat_id', id)
        .order('urutan', { ascending: true });

    // Load penandatangan
    const { data: penandatangan } = await supabase
        .from('surat_penandatangan')
        .select('*')
        .eq('surat_id', id);

    return {
        surat,
        konten: konten ?? null,
        alat: alat ?? [],
        penandatangan: penandatangan ?? [],
    };
}
