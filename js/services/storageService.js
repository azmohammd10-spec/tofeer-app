window.addEventListener("DOMContentLoaded", () => {

    const videoInput = document.getElementById("videoFile");
    const captionInput = document.getElementById("caption");
    const categoryInput = document.getElementById("category");
    const uploadBtn = document.getElementById("uploadBtn");

    if (!uploadBtn) {
        console.error("uploadBtn not found");
        return;
    }

    uploadBtn.addEventListener("click", async () => {

        console.log("BUTTON CLICKED");

        const file = videoInput.files?.[0];

        if (!file) {
            alert("اختر فيديو أولاً");
            return;
        }

        try {

            uploadBtn.disabled = true;
            uploadBtn.textContent = "جاري الرفع...";

            const videoURL = await uploadVideoFile(file, (progress) => {
                console.log("progress:", progress);
                uploadBtn.textContent = `جاري الرفع ${progress}%`;
            });

            await uploadVideo({
                url: videoURL,
                caption: captionInput.value,
                category: categoryInput.value,
                views: 0,
                likes: 0,
                stage: "TESTING"
            });

            alert("تم الرفع بنجاح");

        } catch (err) {
            console.error("UPLOAD ERROR:", err);
            alert("فشل الرفع");
        }

        uploadBtn.disabled = false;
        uploadBtn.textContent = "رفع الفيديو";
    });

});
