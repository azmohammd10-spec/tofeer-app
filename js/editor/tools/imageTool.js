// js/modules/tools/imageTool.js
import { addElement } from "../design/designService.js";

export function createImage(src, options = {}) {
    const element = {
        id: crypto.randomUUID(),
        type: "image",
        src: src,
        x: options.x || 50,
        y: options.y || 50,
        width: options.width || 200,
        height: options.height || 200,
        objectFit: options.objectFit || "cover"
    };
    addElement(element);
    return element;
}
