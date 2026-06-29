// =========================
// STAR - Supabase Storage Service
// =========================

const SUPABASE_URL = "https://nhrwbmbejscdkjlwsbtp.supabase.co";
const SUPABASE_KEY = "sb_publishable_WgOtBrrTfkMk1HWstBHlqw_HDxlmz_9";
const BUCKET = "videos";

// رفع فيديو إلى Supabase
export async function uploadVideoFile(file, onProgress = null) {

    return new Promise((resolve, reject) => {

        const fileName = `${Date.now()}_${file.name}`;

        const xhr = new XMLHttpRequest();

        xhr.open(
            "POST",
            `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${fileName}`
        );

        xhr.setRequestHeader("Authorization", `Bearer ${SUPABASE_KEY}`);
        xhr.setRequestHeader("apikey", SUPABASE_KEY);

        xhr.upload.onprogress = (event) => {

            if (event.lengthComputable && onProgress) {

                const progress = Math.round(
                    (event.loaded / event.total) * 100
                );

                onProgress(progress);
            }

        };

        xhr.onload = () => {

            if (xhr.status === 200 || xhr.status === 201) {

                resolve(
                    `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${fileName}`
                );

            } else {

                reject(new Error(xhr.responseText));

            }

        };

        xhr.onerror = () => {

            reject(new Error("فشل الاتصال بـ Supabase"));

        };

        xhr.send(file);

    });

}
