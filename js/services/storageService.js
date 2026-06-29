import { db } from "../firebase.js";
import {
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// =========================
// حفظ فيديو في Firestore
// =========================
export async function uploadVideo(video) {

    return await addDoc(collection(db, "videos"), {
        ...video,
        createdAt: Date.now()
    });

}

// =========================
// جلب الفيديوهات
// =========================
export async function getVideos() {

    const snap = await getDocs(collection(db, "videos"));

    return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}
