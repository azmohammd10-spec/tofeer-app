// =========================
// STAR App
// =========================

import {
    getVideos,
    incrementViews
} from "./services/videoService.js";

const feed = document.getElementById("feed");

let videos = [];
let observer = null;

// =========================
// تحميل الفيديوهات
// =========================
async function loadFeed() {

    try {

        videos = await getVideos();

        if (!Array.isArray(videos) || videos.length === 0) {

            feed.innerHTML = `
                <div style="
                    color:#fff;
                    text-align:center;
                    margin-top:45vh;
                    font-size:18px;
                ">
                    لا توجد فيديوهات بعد
                </div>
            `;

            return;
        }

        renderVideos(videos);
        setupAutoPlay();

    } catch (err) {

        console.error(err);

        feed.innerHTML = `
            <div style="
                color:red;
                text-align:center;
                margin-top:45vh;
            ">
                خطأ في تحميل الفيديوهات
            </div>
        `;

    }

}

// =========================
// إنشاء عنصر فيديو
// =========================
function createVideoElement(video) {

    const videoUrl =
        video.url ||
        video.videoUrl ||
        video.fileUrl ||
        "";

    const div = document.createElement("div");

    div.className = "video";

    div.innerHTML = `

        <video
            src="${videoUrl}"
            muted
            loop
            playsinline
            data-id="${video.id}"
        ></video>

        <div class="overlay">

            ⭐ ${video.caption || "بدون وصف"}<br>

            👁 ${video.views || 0} مشاهدة<br>

            🔥 ${video.stage || "TESTING"}

        </div>

        <div class="side-actions">

            <div class="action profile">
                <img src="assets/profile.jpg">
            </div>

            <div class="action like-btn">
                <div class="circle">❤️</div>
                <small class="likes-count">
                    ${video.likes || 0}
                </small>
            </div>

            <div class="action">
                <div class="circle">💬</div>
                <small>
                    ${video.comments || 0}
                </small>
            </div>

            <div
                class="action save-btn"
                onclick="toggleSave(this)"
            >

                <div class="circle">
                    <span class="save-icon">✦</span>
                </div>

                <small>حفظ</small>

            </div>

            <div class="action">

                <div class="circle">🔗</div>

                <small>مشاركة</small>

            </div>

        </div>

    `;

    return div;

}
