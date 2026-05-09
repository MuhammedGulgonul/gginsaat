import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Desteklenmeyen format. Sadece JPG, PNG, WebP, GIF kabul edilir." },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Dosya 10 MB'dan büyük olamaz." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using a Promise wrapper
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "gginsaat_uploads" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      
      uploadStream.end(buffer);
    });

    // Return the secure URL provided by Cloudinary
    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
