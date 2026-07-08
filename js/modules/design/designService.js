// =========================
// Design Service
// =========================

let currentDesign = null;

// إنشاء تصميم جديد
export function createDesign(type) {

    currentDesign = {

        id: crypto.randomUUID(),

        type: type.id,

        name: type.name,

        width: type.width,

        height: type.height,

        category: type.category,

        elements: [],

        createdAt: Date.now()

    };

    // حفظ التصميم مؤقتًا
    localStorage.setItem(
        "currentDesign",
        JSON.stringify(currentDesign)
    );

    return currentDesign;

}

// جلب التصميم الحالي
export function getCurrentDesign() {

    if (currentDesign) return currentDesign;

    const saved = localStorage.getItem("currentDesign");

    if (saved) {

        currentDesign = JSON.parse(saved);

    }

    return currentDesign;

}
// =========================
// إضافة عنصر إلى التصميم
// =========================
export function addElement(element) {

    if (!currentDesign) return;

    currentDesign.elements.push(element);

    localStorage.setItem(
        "currentDesign",
        JSON.stringify(currentDesign)
    );

}

// =========================
// تحديث التصميم
// =========================
export function updateDesign(data) {

    if (!currentDesign) return;

    currentDesign = {

        ...currentDesign,

        ...data

    };

    localStorage.setItem(
        "currentDesign",
        JSON.stringify(currentDesign)
    );

}
// حذف التصميم الحالي
export function clearCurrentDesign() {

    currentDesign = null;

    localStorage.removeItem("currentDesign");

}
