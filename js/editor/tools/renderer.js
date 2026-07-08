// js/editor/renderer.js
import { getCurrentDesign } from "../modules/design/designService.js";
import { enableDrag } from "./dragManager.js";

export function renderCanvas(canvasElement) {
    const design = getCurrentDesign();
    if (!design) {
        canvasElement.innerHTML = "<p>لا يوجد تصميم</p>";
        return;
    }

    canvasElement.innerHTML = "";
    canvasElement.style.width = design.width + "px";
    canvasElement.style.height = design.height + "px";
    canvasElement.style.position = "relative";
    canvasElement.style.background = "#ffffff";
    canvasElement.style.margin = "0 auto";
    canvasElement.style.overflow = "hidden";

    design.elements.forEach(el => renderElement(canvasElement, el));
}

export function renderElement(container, el) {
    if (el.type === "text") renderText(container, el);
    else if (el.type === "shape") renderShape(container, el);
    else if (el.type === "image") renderImage(container, el);
}

function renderText(container, el) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = el.x + "px";
    div.style.top = el.y + "px";
    div.style.fontSize = el.fontSize + "px";
    div.style.color = el.color;
    div.style.fontFamily = el.fontFamily || "Arial";
    div.style.fontWeight = el.bold ? "bold" : "normal";
    div.style.fontStyle = el.italic ? "italic" : "normal";
    div.style.cursor = "pointer";
    div.textContent = el.content;
    enableDrag(div, el, container);
    div.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("elementSelected", { detail: el }));
    });
    container.appendChild(div);
}

function renderShape(container, el) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = el.x + "px";
    div.style.top = el.y + "px";
    div.style.width = el.width + "px";
    div.style.height = el.height + "px";
    div.style.background = el.background;
    div.style.borderRadius = el.shapeType === "circle" ? "50%" : "0";
    div.style.border = `${el.borderWidth || 0}px solid ${el.borderColor || "#000"}`;
    div.style.cursor = "pointer";
    enableDrag(div, el, container);
    div.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("elementSelected", { detail: el }));
    });
    container.appendChild(div);
}

function renderImage(container, el) {
    const img = document.createElement("img");
    img.src = el.src;
    img.style.position = "absolute";
    img.style.left = el.x + "px";
    img.style.top = el.y + "px";
    img.style.width = el.width + "px";
    img.style.height = el.height + "px";
    img.style.objectFit = el.objectFit || "cover";
    img.style.cursor = "pointer";
    enableDrag(img, el, container);
    img.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("elementSelected", { detail: el }));
    });
    container.appendChild(img);
}
