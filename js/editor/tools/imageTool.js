// =========================
// Image Tool
// =========================

import { addElement } from "../../modules/design/designService.js";

// إضافة صورة إلى التصميم
export function createImage(url) {

    const element = {
        id: crypto.randomUUID(),
        type: "image",
        src: url,
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        rotation: 0
    };

    addElement(element);

    return element;

}

// تغيير حجم الصورة
export function resizeImage(element, width, height) {
    element.width = width;
    element.height = height;
}

// تحريك الصورة
export function moveImage(element, x, y) {
    element.x = x;
    element.y = y;
}

// تدوير الصورة
export function rotateImage(element, angle) {
    element.rotation = angle;
}
