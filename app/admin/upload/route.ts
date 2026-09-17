import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

// Allow images and videos
const ALLOWED_TYPES = [
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
  'video/mp4', 'video/webm', 'video/quicktime'
];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB (Supabase Free Tier Limit)

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'portfolio';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WEBP, MP4, WEBM, MOV' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { data, error } = await supabase.storage
      .from('portfolio-media')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from('portfolio-media')
      .getPublicUrl(data.path);

    return NextResponse.json({
      url: urlData.publicUrl,
      path: data.path,
      kind: file.type.startsWith('video/') ? 'video' : 'image',
    });
  } catch (err: any) {
    console.error('Upload route error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { path } = await request.json();

    if (!path) {
      return NextResponse.json({ error: 'No path provided' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const { error } = await supabase.storage
      .from('portfolio-media')
      .remove([path]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}