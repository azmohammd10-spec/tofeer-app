// =========================
// Editor Controller
// =========================
import {
    getCurrentDesign,
    updateDesign,
    addElement
} from "../modules/design/designService.js";

import {
    createRectangle
} from "./tools/shapeTool.js";

// =========================
// المتغيرات العامة
// =========================
let canvas = null;               // مرجع عنصر الـ canvas
let selectedElement = null;      // العنصر المحدد حاليًا
let dragData = null;            // بيانات السحب الحالية { element, offsetX, offsetY, elementRef }

// =========================
// تهيئة المحرر بعد تحميل الصفحة
// =========================
window.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.getElementById("designCanvas");
    if (canvasElement) {
        initEditor(canvasElement);
    } else {
        console.error("❌ designCanvas not found");
    }
});

// =========================
// تهيئة المحرر
// =========================
export function initEditor(canvasElement) {
    canvas = canvasElement;
    const design = getCurrentDesign();

    if (!design) {
        console.error("❌ No design selected");
        return;
    }

    renderCanvas(design);
    console.log("✅ Editor initialized:", design);
}

// =========================
// رسم التصميم بالكامل
// =========================
function renderCanvas(design) {
    canvas.innerHTML = "";
    canvas.style.width = design.width + "px";
    canvas.style.height = design.height + "px";
    canvas.style.position = "relative";
    canvas.style.background = "#fff";
    canvas.style.margin = "0 auto";

    if (design.elements && design.elements.length) {
        design.elements.forEach(element => renderElement(element));
    }
}

// =========================
// رسم عنصر واحد حسب نوعه
// =========================
function renderElement(element) {
    switch (element.type) {
        case "text":
            renderTextElement(element);
            break;
        case "shape":
            renderShapeElement(element);
            break;
        case "image":
            renderImageElement(element);
            break;
        default:
            console.warn("⚠️ Unknown element type:", element.type);
    }
}

// ----- رسم عنصر نصي -----
function renderTextElement(element) {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.left = element.x + "px";
    el.style.top = element.y + "px";
    el.style.fontSize = element.fontSize + "px";
    el.style.color = element.color;
    el.style.cursor = "pointer";
    el.innerText = element.content;

    // إضافة أحداث السحب
    enableDrag(el, element);

    // تحديد العنصر عند النقر
    el.addEventListener("click", (e) => {
        e.stopPropagation();
        selectElement(element);
    });

    canvas.appendChild(el);
}

// ----- رسم عنصر شكل -----
function renderShapeElement(element) {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.left = element.x + "px";
    el.style.top = element.y + "px";
    el.style.width = element.width + "px";
    el.style.height = element.height + "px";
    el.style.background = element.background;
    el.style.cursor = "pointer";

    if (element.shapeType === "circle") {
        el.style.borderRadius = "50%";
    }

    enableDrag(el, element);

    el.addEventListener("click", (e) => {
        e.stopPropagation();
        selectElement(element);
    });

    canvas.appendChild(el);
}

// ----- رسم عنصر صورة -----
function renderImageElement(element) {
    const img = document.createElement("img");
    img.src = element.src;
    img.style.position = "absolute";
    img.style.left = element.x + "px";
    img.style.top = element.y + "px";
    img.style.width = element.width + "px";
    img.style.height = element.height + "px";
    img.style.objectFit = "cover";
    img.style.cursor = "pointer";
    img.style.touchAction = "none";

    enableDrag(img, element);

    img.addEventListener("click", (e) => {
        e.stopPropagation();
        selectElement(element);
    });

    canvas.appendChild(img);
}

// ----- تمكين السحب لعنصر -----
function enableDrag(elementRef, elementData) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const startDrag = (e) => {
        const point = e.touches ? e.touches[0] : e;
        const rect = canvas.getBoundingClientRect();
        offsetX = point.clientX - rect.left - elementData.x;
        offsetY = point.clientY - rect.top - elementData.y;
        isDragging = true;
        e.preventDefault();
    };

    const moveDrag = (e) => {
        if (!isDragging) return;
        const point = e.touches ? e.touches[0] : e;
        const rect = canvas.getBoundingClientRect();
        elementData.x = point.clientX - rect.left - offsetX;
        elementData.y = point.clientY - rect.top - offsetY;
        elementRef.style.left = elementData.x + "px";
        elementRef.style.top = elementData.y + "px";
        e.preventDefault();
    };

    const endDrag = () => {
        if (isDragging) {
            isDragging = false;
            updateDesign({ elements: getCurrentDesign().elements });
        }
    };

    elementRef.addEventListener("mousedown", startDrag);
    elementRef.addEventListener("touchstart", startDrag);
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("touchmove", moveDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);
}

// =========================
// إضافة عنصر جديد
// =========================

// إضافة نص
export function addText(text) {
    const element = {
        id: crypto.randomUUID(),
        type: "text",
        content: text || "نص جديد",
        x: 50,
        y: 50,
        fontSize: 24,
        color: "#000000"
    };
    addElement(element);
    renderElement(element);
}

// إضافة شكل (مستطيل افتراضي)
export function addShape() {
    const shape = createRectangle(); // يجب أن تعيد الدالة كائن shape مكتمل
    addElement(shape);
    renderElement(shape);
}

// إضافة صورة (يتم استدعاؤها من مكان آخر)
export function addImage(imageData) {
    const element = {
        id: crypto.randomUUID(),
        type: "image",
        src: imageData.src,
        x: imageData.x || 50,
        y: imageData.y || 50,
        width: imageData.width || 200,
        height: imageData.height || 200
    };
    addElement(element);
    renderElement(element);
}

// =========================
// تحديد العنصر وعرض خصائصه
// =========================
function selectElement(element) {
    selectedElement = element;
    const panel = document.getElementById("propertiesPanel");
    if (!panel) return;

    switch (element.type) {
        case "text":
            showTextProperties(panel, element);
            break;
        case "shape":
            showShapeProperties(panel, element);
            break;
        case "image":
            showImageProperties(panel, element);
            break;
        default:
            panel.innerHTML = `<p>❌ نوع غير مدعوم</p>`;
    }
}

// ----- خصائص النص -----
function showTextProperties(panel, element) {
    panel.innerHTML = `
        <h4>خصائص النص</h4>
        <label>النص</label>
        <input id="textContentInput" value="${element.content}">
        <label>حجم الخط</label>
        <input id="fontSizeInput" type="number" value="${element.fontSize}">
        <label>اللون</label>
        <input id="colorInput" type="color" value="${element.color}">
    `;

    document.getElementById("textContentInput").addEventListener("input", (e) => {
        element.content = e.target.value;
        renderCanvas(getCurrentDesign());
    });

    document.getElementById("fontSizeInput").addEventListener("input", (e) => {
        element.fontSize = Number(e.target.value);
        renderCanvas(getCurrentDesign());
    });

    document.getElementById("colorInput").addEventListener("input", (e) => {
        element.color = e.target.value;
        renderCanvas(getCurrentDesign());
    });
}

// ----- خصائص الشكل -----
function showShapeProperties(panel, element) {
    panel.innerHTML = `
        <h4>خصائص الشكل</h4>
        <label>اللون</label>
        <input id="shapeColor" type="color" value="${element.background}">
        <label>العرض</label>
        <input id="shapeWidth" type="number" value="${element.width}">
        <label>الارتفاع</label>
        <input id="shapeHeight" type="number" value="${element.height}">
    `;

    document.getElementById("shapeColor").addEventListener("input", (e) => {
        element.background = e.target.value;
        renderCanvas(getCurrentDesign());
    });

    document.getElementById("shapeWidth").addEventListener("input", (e) => {
        element.width = Number(e.target.value);
        renderCanvas(getCurrentDesign());
    });

    document.getElementById("shapeHeight").addEventListener("input", (e) => {
        element.height = Number(e.target.value);
        renderCanvas(getCurrentDesign());
    });
}

// ----- خصائص الصورة -----
function showImageProperties(panel, element) {
    panel.innerHTML = `
        <h4>خصائص الصورة</h4>
        <label>العرض</label>
        <input id="imageWidth" type="number" value="${element.width}">
        <label>الارتفاع</label>
        <input id="imageHeight" type="number" value="${element.height}">
    `;

    document.getElementById("imageWidth").addEventListener("input", (e) => {
        element.width = Number(e.target.value);
        renderCanvas(getCurrentDesign());
    });

    document.getElementById("imageHeight").addEventListener("input", (e) => {
        element.height = Number(e.target.value);
        renderCanvas(getCurrentDesign());
    });
}

// =========================
// ربط الأزرار في الواجهة
// =========================

// زر إضافة نص
const textTool = document.getElementById("textTool");
if (textTool) {
    textTool.addEventListener("click", () => addText());
}

// زر إضافة شكل
const shapeTool = document.getElementById("shapeTool");
if (shapeTool) {
    shapeTool.addEventListener("click", () => addShape());
}

// زر إضافة صورة (مثال: رفع ملف)
const imageTool = document.getElementById("imageTool");
if (imageTool) {
    imageTool.addEventListener("click", () => {
        // يمكن فتح نافذة اختيار ملف أو استخدام input مخفي
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const src = ev.target.result;
                    addImage({ src, x: 100, y: 100, width: 300, height: 200 });
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });
}
