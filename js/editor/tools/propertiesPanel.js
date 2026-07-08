// js/editor/propertiesPanel.js
import { renderCanvas } from "./renderer.js";
import { updateElement } from "../modules/design/designService.js";

export function showProperties(element, panel) {
    if (!panel || !element) return;
    if (element.type === "text") showTextProps(element, panel);
    else if (element.type === "shape") showShapeProps(element, panel);
    else if (element.type === "image") showImageProps(element, panel);
}

function showTextProps(el, panel) {
    panel.innerHTML = `
        <h4>✏️ خصائص النص</h4>
        <label>النص</label><input id="textContent" value="${el.content}" />
        <label>حجم الخط</label><input id="fontSize" type="number" value="${el.fontSize}" />
        <label>اللون</label><input id="color" type="color" value="${el.color}" />
        <label>عريض</label><input id="bold" type="checkbox" ${el.bold ? "checked" : ""} />
        <label>مائل</label><input id="italic" type="checkbox" ${el.italic ? "checked" : ""} />
    `;
    document.getElementById("textContent").addEventListener("input", e => {
        el.content = e.target.value;
        updateElement(el.id, { content: el.content });
        renderCanvas(document.getElementById("designCanvas"));
    });
    document.getElementById("fontSize").addEventListener("input", e => {
        el.fontSize = Number(e.target.value);
        updateElement(el.id, { fontSize: el.fontSize });
        renderCanvas(document.getElementById("designCanvas"));
    });
    document.getElementById("color").addEventListener("input", e => {
        el.color = e.target.value;
        updateElement(el.id, { color: el.color });
        renderCanvas(document.getElementById("designCanvas"));
    });
    document.getElementById("bold").addEventListener("change", e => {
        el.bold = e.target.checked;
        updateElement(el.id, { bold: el.bold });
        renderCanvas(document.getElementById("designCanvas"));
    });
    document.getElementById("italic").addEventListener("change", e => {
        el.italic = e.target.checked;
        updateElement(el.id, { italic: el.italic });
        renderCanvas(document.getElementById("designCanvas"));
    });
}

function showShapeProps(el, panel) {
    panel.innerHTML = `
        <h4>🔷 خصائص الشكل</h4>
        <label>اللون</label><input id="shapeColor" type="color" value="${el.background}" />
        <label>العرض</label><input id="shapeWidth" type="number" value="${el.width}" />
        <label>الارتفاع</label><input id="shapeHeight" type="number" value="${el.height}" />
    `;
    document.getElementById("shapeColor").addEventListener("input", e => {
        el.background = e.target.value;
        updateElement(el.id, { background: el.background });
        renderCanvas(document.getElementById("designCanvas"));
    });
    document.getElementById("shapeWidth").addEventListener("input", e => {
        el.width = Number(e.target.value);
        updateElement(el.id, { width: el.width });
        renderCanvas(document.getElementById("designCanvas"));
    });
    document.getElementById("shapeHeight").addEventListener("input", e => {
        el.height = Number(e.target.value);
        updateElement(el.id, { height: el.height });
        renderCanvas(document.getElementById("designCanvas"));
    });
}

function showImageProps(el, panel) {
    panel.innerHTML = `
        <h4>🖼️ خصائص الصورة</h4>
        <label>العرض</label><input id="imageWidth" type="number" value="${el.width}" />
        <label>الارتفاع</label><input id="imageHeight" type="number" value="${el.height}" />
    `;
    document.getElementById("imageWidth").addEventListener("input", e => {
        el.width = Number(e.target.value);
        updateElement(el.id, { width: el.width });
        renderCanvas(document.getElementById("designCanvas"));
    });
    document.getElementById("imageHeight").addEventListener("input", e => {
        el.height = Number(e.target.value);
        updateElement(el.id, { height: el.height });
        renderCanvas(document.getElementById("designCanvas"));
    });
}
