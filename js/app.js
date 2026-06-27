import { getVideos } from "./services/videoService.js";
import { calculateVideoScore } from "./algorithm/algorithm.js";
import { updateFairness } from "./algorithm/fairness.js";
import { boostTrendingVideos } from "./algorithm/trending.js";

const feed = document.getElementById("feed");

let videos = [];
let observers = [];

async function loadFeed(){

    videos = await getVideos();

    // حساب الذكاء
    videos = videos.map(v => {
        const score = calculateVideoScore(v);
        return updateFairness({...v, score}, score);
    });

    videos = boostTrendingVideos(videos);

    render(videos);

    setupAutoPlay();

}

function render(videos){

    feed.innerHTML = "";

    videos.forEach(video => {

        const div = document.createElement("div");
        div.className = "video";

        div.innerHTML = `
            <video 
                src="${video.url}" 
                muted 
                playsinline
                loop
            ></video>

            <div class="overlay">
                ⭐ Score: ${video.score?.toFixed(1) || 0} <br>
                🔥 Stage: ${video.stage} <br>
                👀 Views: ${video.viewsTarget}
            </div>
        `;

        feed.appendChild(div);
    });

}

// تشغيل الفيديو عند ظهوره
function setupAutoPlay(){

    const videos = document.querySelectorAll("video");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            const video = entry.target;

            if(entry.isIntersecting){

                video.play();

                trackWatch(video);

            } else {
                video.pause();
            }

        });

    }, { threshold: 0.7 });

    videos.forEach(video => observer.observe(video));
}


// تتبع وقت المشاهدة (مهم للخوارزمية)
function trackWatch(video){

    let watchTime = 0;

    const interval = setInterval(() => {

        if(video.paused){
            clearInterval(interval);
            return;
        }

        watchTime += 1;

        // هنا لاحقًا سنربطه بـ Firebase
        video.dataset.watchTime = watchTime;

    }, 1000);

}

loadFeed();
