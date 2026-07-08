// =========================
// دوال إضافية - أضفها في نهاية الملف
// =========================

export function updateElement(id, newData) {
    if (!currentDesign) return;
    const index = currentDesign.elements.findIndex(el => el.id === id);
    if (index !== -1) {
        currentDesign.elements[index] = { ...currentDesign.elements[index], ...newData };
        localStorage.setItem("currentDesign", JSON.stringify(currentDesign));
    }
}

export function deleteElement(id) {
    if (!currentDesign) return;
    currentDesign.elements = currentDesign.elements.filter(el => el.id !== id);
    localStorage.setItem("currentDesign", JSON.stringify(currentDesign));
}

export function getElementById(id) {
    if (!currentDesign) return null;
    return currentDesign.elements.find(el => el.id === id) || null;
}

export function clearElements() {
    if (!currentDesign) return;
    currentDesign.elements = [];
    localStorage.setItem("currentDesign", JSON.stringify(currentDesign));
}
