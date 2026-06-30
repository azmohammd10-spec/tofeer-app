import { getForYouVideos } from "./videoFeed.js";

async function loadFeed() {
    const videos = await getForYouVideos();
    const container = document.getElementById("feed");

    container.innerHTML = "";

    videos.forEach(video => {
        const wrapper = document.createElement("div");
        wrapper.className = "video-wrapper";

        wrapper.innerHTML = `
            <div class="video-container">
                
                <video class="video" src="${video.video_url}" autoplay muted loop></video>

                <!-- الأزرار الجانبية -->
                <div class="side-actions">

                    <!-- بروفايل -->
                    <div class="action">
                        <div class="profile">👤</div>
                    </div>

                    <!-- لايك -->
                    <div class="action">
                        <div class="icon">❤</div>
                        <small>${video.likes_count || 0}</small>
                    </div>

                    <!-- تعليق -->
                    <div class="action">
                        <div class="icon">💬</div>
                        <small>${video.comments_count || 0}</small>
                    </div>

                    <!-- حفظ -->
                    <div class="action">
                        <div class="icon">🔖</div>
                    </div>

                    <!-- مشاركة -->
                    <div class="action">
                        <div class="icon">🔗</div>
                    </div>

                </div>
            </div>

            <p class="caption">${video.caption || ""}</p>
        `;

        container.appendChild(wrapper);
    });
}

loadFeed();
