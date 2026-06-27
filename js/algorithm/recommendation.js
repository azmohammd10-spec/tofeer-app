// =========================
// STAR Recommendation Engine
// =========================


// =========================
// اختيار أول جمهور (1500 مستخدم)
// =========================
export function getFirstAudience(video, users) {

    // نختار مستخدمين مهتمين بنفس التصنيف
    const filtered = users.filter(user => {

        return user.interests?.includes(video.category);

    });

    // إذا لم يوجد كفاية، نكمل عشوائيًا لضمان 1500
    return filtered.length >= 1500
        ? filtered.slice(0, 1500)
        : users.slice(0, 1500);

}


// =========================
// ترتيب صفحة For You
// =========================
export function rankVideos(videos) {

    return videos.sort((a, b) => {

        // ترتيب حسب قوة الفيديو
        const scoreA = a.score || 0;
        const scoreB = b.score || 0;

        return scoreB - scoreA;

    });

}


// =========================
// منع تكرار الفيديو
// =========================
export function removeSeenVideos(videos, user) {

    return videos.filter(video => {

        return !user.history?.includes(video.id);

    });

}


// =========================
// إدخال محتوى جديد (Discovery)
// =========================
export function injectDiscovery(videos, newVideos) {

    const result = [...videos];

    if (newVideos && newVideos.length > 0) {

        // إدخال فيديو جديد بعد أول 3 فيديوهات
        result.splice(3, 0, newVideos[0]);

    }

    return result;

}


// =========================
// بناء صفحة For You النهائية
// =========================
export function buildForYouPage(videos, user, newVideos = []) {

    let feed = removeSeenVideos(videos, user);

    feed = rankVideos(feed);

    feed = injectDiscovery(feed, newVideos);

    return feed;

}
