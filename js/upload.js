import { uploadVideoFile } from "./services/storageService.js";
import { uploadVideo } from "./services/videoService.js";

// عناصر الصفحة
const videoInput = document.getElementById("videoFile");
const captionInput = document.getElementById("caption");
const categoryInput = document.getElementById("category");
const uploadBtn = document.getElementById("uploadBtn");

// تحقق من العناصر
if (!videoInput || !uploadBtn) {
    console.error("❌ عناصر الصفحة غير موجودة");
}

// رفع الفيديو
uploadBtn?.addEventListener("click", async () => {

    console.log("🚀 CLICK STARTED");

    const file = videoInput.files?.[0];

    console.log("📂 FILE:", file);

    if (!file) {
        alert("اختر فيديو أولاً");
        return;
    }

    uploadBtn.disabled = true;
    uploadBtn.textContent = "جاري الرفع 0%";

    try {

        console.log("⬆️ BEFORE UPLOAD");

        // رفع الفيديو إلى Supabase
        const videoURL = await uploadVideoFile(file, (progress) => {
            console.log("📊 PROGRESS:", progress);
            uploadBtn.textContent = `جاري الرفع ${progress}%`;
        });

        console.log("✅ AFTER UPLOAD:", videoURL);

        // حفظ البيانات في Firestore
        console.log("💾 SAVING TO FIRESTORE...");

        await uploadVideo({
            url: videoURL,
            caption: captionInput.value.trim(),
            category: categoryInput.value,
            createdAt: Date.now(),

            stage: "TESTING",
            viewsTarget: 1500,

            score: 0,
            views: 0,
            likes: 0,
            comments: 0,
            shares: 0,
            saves: 0,

            watchTime: 0,
            completionRate: 0,
            rewatchRate: 0,
            reportRate: 0,

            trending: false
        });

        console.log("🎉 SAVED SUCCESS");

        alert("تم رفع الفيديو بنجاح ✅");

        // reset
        videoInput.value = "";
        captionInput.value = "";
        categoryInput.selectedIndex = 0;

    } catch (error) {

        console.error("❌ UPLOAD ERROR FULL:", error);

        alert(
            error?.message ||
            error?.responseText ||
            "فشل رفع الفيديو (راجع Console)"
        );
    }

    uploadBtn.disabled = false;
    uploadBtn.textContent = "رفع الفيديو";
});
