// =========================
// STAR Algorithm Core
// =========================

// مراحل الانتشار (Fair Distribution System)
export const STAGES = [
    1500,
    2000,
    5000,
    10000,
    25000,
    50000,
    100000
];


// =========================
// حساب جودة الفيديو (0 → 100)
// =========================
export function calculateVideoScore(video) {

    let score = 0;

    // مدة المشاهدة (أهم عامل)
    score += (video.watchTime || 0) * 0.35;

    // نسبة الإكمال
    score += (video.completionRate || 0) * 0.25;

    // إعادة المشاهدة
    score += (video.rewatchRate || 0) * 0.15;

    // المشاركات
    score += (video.shareRate || 0) * 0.10;

    // الحفظ
    score += (video.saveRate || 0) * 0.05;

    // التعليقات
    score += (video.commentRate || 0) * 0.05;

    // الإعجابات
    score += (video.likeRate || 0) * 0.05;

    // عقوبة البلاغات
    score -= (video.reportRate || 0) * 0.30;

    // ضبط النتيجة بين 0 و 100
    return Math.max(0, Math.min(100, score));
}


// =========================
// تحديد المرحلة التالية
// =========================
export function getNextStage(currentStageIndex) {

    if (currentStageIndex >= STAGES.length - 1) {
        return currentStageIndex; // وصل للنهاية
    }

    return currentStageIndex + 1;
}


// =========================
// هل الفيديو يستحق الترقية؟
// =========================
export function shouldPromote(score) {

    return score >= 80;

}


// =========================
// حساب المرحلة حسب الأداء
// =========================
export function getStageByScore(score) {

    if (score >= 95) return 6; // Viral
    if (score >= 90) return 5;
    if (score >= 85) return 4;
    if (score >= 80) return 3;
    if (score >= 70) return 2;
    if (score >= 50) return 1;

    return 0;
}
