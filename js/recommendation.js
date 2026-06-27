// =========================
// STAR Recommendation Engine
// =========================

// اختيار أول جمهور للفيديو
export function getFirstAudience(video, users){

    return users.filter(user=>{

        return user.interests.includes(video.category);

    });

}

// ترتيب الفيديوهات للمستخدم
export function rankVideos(videos){

    return videos.sort((a,b)=>{

        return b.score-a.score;

    });

}

// منع تكرار الفيديو كثيراً
export function removeSeenVideos(videos,user){

    return videos.filter(video=>{

        return !user.history.includes(video.id);

    });

}

// إضافة محتوى جديد للمستخدم
export function injectDiscovery(videos,newVideos){

    const result=[...videos];

    if(newVideos.length){

        result.splice(4,0,newVideos[0]);

    }

    return result;

}
