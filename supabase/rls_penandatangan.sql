-- =====================================================
-- RLS POLICIES: ttd_bidang_inti
-- Hanya user yang sudah login (authenticated) yang
-- bisa membaca dan memodifikasi data penandatangan.
-- =====================================================

-- SELECT: user terautentikasi bisa membaca semua baris
CREATE POLICY "TTD Bidang Inti: authenticated can read"
ON public.ttd_bidang_inti
FOR SELECT
TO authenticated
USING (true);

-- INSERT: user terautentikasi bisa menambah data
CREATE POLICY "TTD Bidang Inti: authenticated can insert"
ON public.ttd_bidang_inti
FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE: user terautentikasi bisa mengubah data
CREATE POLICY "TTD Bidang Inti: authenticated can update"
ON public.ttd_bidang_inti
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- DELETE: user terautentikasi bisa menghapus data
CREATE POLICY "TTD Bidang Inti: authenticated can delete"
ON public.ttd_bidang_inti
FOR DELETE
TO authenticated
USING (true);


-- =====================================================
-- RLS POLICIES: ttd_kepanitiaan
-- =====================================================

-- SELECT
CREATE POLICY "TTD Kepanitiaan: authenticated can read"
ON public.ttd_kepanitiaan
FOR SELECT
TO authenticated
USING (true);

-- INSERT
CREATE POLICY "TTD Kepanitiaan: authenticated can insert"
ON public.ttd_kepanitiaan
FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE
CREATE POLICY "TTD Kepanitiaan: authenticated can update"
ON public.ttd_kepanitiaan
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- DELETE
CREATE POLICY "TTD Kepanitiaan: authenticated can delete"
ON public.ttd_kepanitiaan
FOR DELETE
TO authenticated
USING (true);


-- =====================================================
-- STORAGE POLICY: bucket "ttd"
-- Hanya user authenticated yang dapat upload & baca file TTD.
-- Jalankan ini HANYA jika belum ada policy di bucket "ttd".
-- =====================================================

-- Baca file (public read) — supaya URL tanda tangan bisa ditampilkan
CREATE POLICY "TTD Storage: public can read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ttd');

-- Upload file hanya oleh user terautentikasi
CREATE POLICY "TTD Storage: authenticated can upload"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ttd');

-- Update file hanya oleh user terautentikasi
CREATE POLICY "TTD Storage: authenticated can update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'ttd');

-- Hapus file hanya oleh user terautentikasi
CREATE POLICY "TTD Storage: authenticated can delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'ttd');
