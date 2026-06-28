// =========================
// STAR Storage Service
// =========================

import { storage } from "../firebase.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";


// رفع فيديو إلى Firebase Storage
export async function uploadVideoFile(file) {

    try {

        // اسم فريد للفيديو
        const fileName =
            Date.now() + "_" + file.name.replace(/\s+/g, "_");

        // المسار داخل Storage
        const storageRef = ref(storage, `videos/${fileName}`);

        // رفع الملف
        await uploadBytes(storageRef, file);

        // الحصول على الرابط
        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL;

    } catch (error) {

        console.error("Upload Error:", error);

        throw error;

    }

}
