// =========================
// Shape Tool
// =========================

import { addElement } from "../../modules/design/designService.js";

// إضافة مربع
export function createRectangle() {

    const element = {
        id: crypto.randomUUID(),
        type: "shape",
        shapeType: "rectangle",
        x: 100,
        y: 100,
        width: 150,
        height: 150,
        background: "#3b82f6",
        borderRadius: 0
    };

    addElement(element);

    return element;

}

// إضافة دائرة
export function createCircle() {

    const element = {
        id: crypto.randomUUID(),
        type: "shape",
        shapeType: "circle",
        x: 120,
        y: 120,
        width: 150,
        height: 150,
        background: "#ef4444",
        borderRadius: 999
    };

    addElement(element);

    return element;

}

// تغيير اللون
export function setShapeColor(element, color) {
    element.background = color;
}

// تغيير الحجم
export function resizeShape(element, width, height) {
    element.width = width;
    element.height = height;
}
