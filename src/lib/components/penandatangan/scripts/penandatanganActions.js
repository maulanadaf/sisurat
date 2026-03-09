import { supabase } from "$lib/supabaseClient";

export async function uploadTtd(file) {
    const ext = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const { data: uploadData, error } = await supabase.storage
        .from("ttd")
        .upload(fileName, file, { upsert: false });

    if (error) throw error;

    const { data: urlData } = supabase.storage
        .from("ttd")
        .getPublicUrl(uploadData.path);

    return urlData.publicUrl;
}

export async function simpanPenandatangan({ form, ttdFile, modalType, modalMode }) {
    let ttd_url = form.ttd_url;
    if (ttdFile) {
        ttd_url = await uploadTtd(ttdFile);
    }

    if (modalType === "bidang") {
        const payload = {
            nama: form.nama,
            jabatan: form.jabatan,
            periode: form.periode,
            is_active: form.is_active,
            ttd_url,
        };

        // Otomatis nonaktifkan yang lama jika jabatan ini di-set aktif (untuk Ketua, Sekretaris, Pembina)
        if (form.is_active) {
            const j = form.jabatan.toLowerCase();
            if (
                j.includes("ketua") ||
                j.includes("sekretaris") ||
                j.includes("pembina")
            ) {
                const { error: deactivateError } = await supabase
                    .from("ttd_bidang_inti")
                    .update({ is_active: false })
                    .eq("jabatan", form.jabatan)
                    .eq("is_active", true);
                if (deactivateError)
                    console.error("Gagal menonaktifkan ttd lama:", deactivateError.message);
            }
        }

        if (modalMode === "tambah") {
            const { error } = await supabase.from("ttd_bidang_inti").insert(payload);
            if (error) throw error;
        } else {
            const { error } = await supabase
                .from("ttd_bidang_inti")
                .update(payload)
                .eq("id", form.id);
            if (error) throw error;
        }
    } else {
        const payload = { nama: form.nama, ttd_url };
        if (modalMode === "tambah") {
            const { error } = await supabase.from("ttd_kepanitiaan").insert(payload);
            if (error) throw error;
        } else {
            const { error } = await supabase
                .from("ttd_kepanitiaan")
                .update(payload)
                .eq("id", form.id);
            if (error) throw error;
        }
    }
}

export async function hapusPenandatangan({ item, type }) {
    // Hapus file TTD dari storage terlebih dahulu (jika ada)
    if (item.ttd_url) {
        const urlParts = item.ttd_url.split("/ttd/");
        if (urlParts.length > 1) {
            const filePath = urlParts[1];
            const { error: storageError } = await supabase.storage
                .from("ttd")
                .remove([filePath]);
            if (storageError) {
                console.warn("[storage] Gagal hapus file TTD:", storageError.message);
            }
        }
    }

    // Hapus baris dari tabel database
    const table = type === "bidang" ? "ttd_bidang_inti" : "ttd_kepanitiaan";
    const { error } = await supabase.from(table).delete().eq("id", item.id);
    if (error) throw error;
}

export async function toggleStatusAktif(item) {
    const newState = !item.is_active;

    if (newState) {
        const j = item.jabatan.toLowerCase();
        if (
            j.includes("ketua") ||
            j.includes("sekretaris") ||
            j.includes("pembina")
        ) {
            const { error: deactivateError } = await supabase
                .from("ttd_bidang_inti")
                .update({ is_active: false })
                .eq("jabatan", item.jabatan)
                .eq("is_active", true);
            if (deactivateError) throw deactivateError;
        }
    }

    const { error } = await supabase
        .from("ttd_bidang_inti")
        .update({ is_active: newState })
        .eq("id", item.id);
    if (error) throw error;
}
