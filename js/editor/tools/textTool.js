// =========================
// Text Tool
// =========================

import { addElement } from "../../modules/design/designService.js";

// إضافة نص جديد إلى التصميم
export function createText(text = "نص جديد") {

    const element = {
        id: crypto.randomUUID(),
        type: "text",
        content: text,
        x: 100,
        y: 100,
        fontSize: 28,
        color: "#000000",
        fontFamily: "Arial",
        bold: false,
        italic: false
    };

    addElement(element);

    return element;

}

// تغيير النص
export function updateText(element, newText) {
    element.content = newText;
}

// تغيير حجم النص
export function setFontSize(element, size) {
    element.fontSize = size;
}

// تغيير اللون
export function setColor(element, color) {
    element.color = color;
}
