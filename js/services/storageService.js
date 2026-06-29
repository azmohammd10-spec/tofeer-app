import { uploadVideoFile } from "./services/storageService.js";
import { uploadVideo } from "./services/videoService.js";

const videoInput = document.getElementById("videoFile");
const captionInput = document.getElementById("caption");
const categoryInput = document.getElementById("category");
const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", async () => {

    const file = videoInput.files?.[0];

    if (!file) {
        alert("اختر فيديو أولاً");
        return;
    }

    try {

        uploadBtn.disabled = true;
        uploadBtn.textContent = "جاري الرفع 0%";

        // 1- رفع الفيديو إلى Supabase
        const videoURL = await uploadVideoFile(file, (progress) => {
            uploadBtn.textContent = `جاري الرفع ${progress}%`;
        });

        // 2- حفظ البيانات في Firestore
        await uploadVideo({
            url: videoURL,
            caption: captionInput.value,
            category: categoryInput.value,
            views: 0,
            likes: 0,
            stage: "TESTING"
        });

        alert("تم رفع الفيديو بنجاح ✅");

        videoInput.value = "";
        captionInput.value = "";
        categoryInput.selectedIndex = 0;

    } catch (error) {
        console.error(error);
        alert("فشل رفع الفيديو");
    }

    uploadBtn.disabled = false;
    uploadBtn.textContent = "رفع الفيديو";
});
