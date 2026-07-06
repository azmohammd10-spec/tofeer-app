// =========================
// Design Service
// =========================

let currentDesign = null;

// إنشاء تصميم جديد
export function createDesign(type) {

    currentDesign = {
        id: crypto.randomUUID(),
        type: type.id,
        width: type.width,
        height: type.height,
        category: type.category,
        elements: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    return currentDesign;

}

// الحصول على التصميم الحالي
export function getCurrentDesign() {

    return currentDesign;

}

// تحديث التصميم
export function updateDesign(data) {

    if (!currentDesign) return;

    currentDesign = {
        ...currentDesign,
        ...data,
        updatedAt: Date.now()
    };

}

// إضافة عنصر
export function addElement(element) {

    if (!currentDesign) return;

    currentDesign.elements.push(element);

}

// حذف عنصر
export function removeElement(id) {

    if (!currentDesign) return;

    currentDesign.elements =
        currentDesign.elements.filter(
            element => element.id !== id
        );

}
