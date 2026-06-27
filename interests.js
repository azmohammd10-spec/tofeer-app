// =========================
// STAR Interests Engine
// =========================

// تحديث اهتمامات المستخدم بناءً على الفيديو الذي شاهده
export function updateInterests(user, video) {

    if (!user) return user;

    if (!user.interests) {
        user.interests = [];
    }

    const category = video?.category;

    if (category && !user.interests.includes(category)) {
        user.interests.push(category);
    }

    return user;
}


// =========================
// حساب درجة اهتمام المستخدم بفيديو معين
// =========================
export function calculateInterestScore(user, video) {

    if (!user?.interests || !video?.category) {
        return 0;
    }

    if (user.interests.includes(video.category)) {
        return 100;
    }

    return 20;
}


// =========================
// اقتراح محتوى مشابه لاهتمامات المستخدم
// =========================
export function filterByInterest(videos, user) {

    if (!user?.interests) return videos;

    return videos.filter(video =>
        user.interests.includes(video.category)
    );
}
