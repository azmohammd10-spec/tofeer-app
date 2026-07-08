// js/editor/editorController.js
import { getCurrentDesign, createDesign, updateDesign, deleteElement, clearCurrentDesign } from "../modules/design/designService.js";
import { renderCanvas } from "./renderer.js";
import { showProperties } from "./propertiesPanel.js";
import { createText } from "../modules/tools/textTool.js";
import { createRectangle, createCircle } from "../modules/tools/shapeTool.js";
import { createImage } from "../modules/tools/imageTool.js";

let canvasElement, panelElement, selectedElement = null;

export function initEditor(canvasId, panelId) {
    canvasElement = document.getElementById(canvasId);
    panelElement = document.getElementById(panelId);
    if (!canvasElement || !panelElement) return;

    let design = getCurrentDesign();
    if (!design) {
        design = createDesign({
            id: "default",
            name: "تصميم جديد",
            width: 800,
            height: 600,
            category: "general"
        });
    }

    renderCanvas(canvasElement);

    document.addEventListener("elementSelected", e => {
        selectedElement = e.detail;
        showProperties(selectedElement, panelElement);
    });

    canvasElement.addEventListener("click", e => {
        if (e.target === canvasElement) {
            selectedElement = null;
            panelElement.innerHTML = "<p>اختر عنصراً لعرض خصائصه</p>";
        }
    });

    bindButtons();
}

function bindButtons() {
    document.getElementById("textTool")?.addEventListener("click", () => {
        const el = createText("نص جديد");
        renderCanvas(canvasElement);
        selectedElement = el;
        showProperties(el, panelElement);
    });

    document.getElementById("rectTool")?.addEventListener("click", () => {
        const el = createRectangle({ x: 150, y: 150 });
        renderCanvas(canvasElement);
        selectedElement = el;
        showProperties(el, panelElement);
    });

    document.getElementById("circleTool")?.addEventListener("click", () => {
        const el = createCircle({ x: 200, y: 200 });
        renderCanvas(canvasElement);
        selectedElement = el;
        showProperties(el, panelElement);
    });

    document.getElementById("imageTool")?.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const el = createImage(ev.target.result, { x: 100, y: 100, width: 300, height: 200 });
                    renderCanvas(canvasElement);
                    selectedElement = el;
                    showProperties(el, panelElement);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });

    document.getElementById("deleteElementBtn")?.addEventListener("click", () => {
        if (selectedElement) {
            deleteElement(selectedElement.id);
            selectedElement = null;
            renderCanvas(canvasElement);
            panelElement.innerHTML = "<p>تم حذف العنصر</p>";
        } else alert("اختر عنصراً أولاً");
    });
}

window.addEventListener("DOMContentLoaded", () => {
    initEditor("designCanvas", "propertiesPanel");
});
