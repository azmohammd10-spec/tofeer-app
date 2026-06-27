import { getVideos, updateVideo } from "./services/videoService.js";
import { calculateVideoScore } from "./algorithm/algorithm.js";
import { updateFairness } from "./algorithm/fairness.js";
import { boostTrendingVideos } from "./algorithm/trending.js";

const feed = document.getElementById("feed");

async function loadFeed(){

    let videos = await getVideos();

    // 1. حساب score لكل فيديو
    videos = videos.map(video => {
        const score = calculateVideoScore(video);
        return {
            ...video,
            score
        };
    });

    // 2. تطبيق العدالة + المراحل
    videos = videos.map(video => updateFairness(video, video.score));

    // 3. تطبيق الترند
    videos = boostTrendingVideos(videos);

    // 4. عرض الفيديوهات
    render(videos);

}

function render(videos){

    feed.innerHTML = "";

    videos.forEach(video => {

        const div = document.createElement("div");
        div.className = "video";

        div.innerHTML = `
            <video src="${video.url}" controls></video>
            <div class="info">
                ⭐ Score: ${video.score.toFixed(1)} <br>
                🔥 Stage: ${video.stage} <br>
                👀 Views Target: ${video.viewsTarget}
            </div>
        `;

        feed.appendChild(div);
    });

}

loadFeed();
