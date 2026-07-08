// js/modules/tools/shapeTool.js
import { addElement } from "../design/designService.js";

export function createRectangle(options = {}) {
    const element = {
        id: crypto.randomUUID(),
        type: "shape",
        shapeType: "rectangle",
        x: options.x || 100,
        y: options.y || 100,
        width: options.width || 150,
        height: options.height || 100,
        background: options.background || "#4CAF50",
        borderRadius: 0,
        borderWidth: 0,
        borderColor: "#000"
    };
    addElement(element);
    return element;
}

export function createCircle(options = {}) {
    const element = {
        id: crypto.randomUUID(),
        type: "shape",
        shapeType: "circle",
        x: options.x || 200,
        y: options.y || 200,
        width: options.width || 120,
        height: options.height || 120,
        background: options.background || "#FF5722",
        borderRadius: "50%",
        borderWidth: 0,
        borderColor: "#000"
    };
    addElement(element);
    return element;
}
