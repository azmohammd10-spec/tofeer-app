// =========================
// STAR Algorithm Engine
// =========================

// عدد المشاهدات في كل مرحلة
export const STAGES = [
    1500,
    2000,
    5000,
    10000,
    25000,
    50000,
    100000,
    500000,
    1000000
];

// حساب نقاط الفيديو
export function calculateScore(video){

    let score = 0;

    score += video.watchTime * 0.35;
    score += video.completionRate * 0.25;
    score += video.rewatchRate * 0.15;
    score += video.shareRate * 0.10;
    score += video.saveRate * 0.05;
    score += video.commentRate * 0.05;
    score += video.likeRate * 0.05;

    // خصم نقاط عند كثرة البلاغات
    score -= video.reportRate * 0.20;

    return Math.max(0, Math.min(score,100));
}

// المرحلة التالية
export function getNextStage(currentStage){

    if(currentStage >= STAGES.length-1)
        return currentStage;

    return currentStage + 1;
}

// هل ينتقل للمرحلة التالية؟
export function shouldPromote(score){

    return score >= 80;

}
