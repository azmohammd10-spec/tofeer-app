// =========================
// Home UI
// =========================

import { loadTemplates, getTemplates } from "../modules/templates/templateService.js";
import { loadCategories, getCategories } from "../modules/categories/categoryService.js";

// عناصر الصفحة
const templatesGrid = document.getElementById("templatesGrid");
const categoriesBar = document.getElementById("categoriesBar");
const searchInput = document.getElementById("searchInput");

// =========================
// تشغيل الصفحة
// =========================
async function initHome() {

    try {

        // تحميل البيانات
        await loadCategories();
        await loadTemplates();

        renderCategories();
        renderTemplates(getTemplates());

        setupSearch();

        console.log("✅ Home loaded successfully");

    } catch (error) {

        console.error("❌ Home init error:", error);

    }

}

// =========================
// عرض التصنيفات
// =========================
function renderCategories() {

    const categories = getCategories();

    categoriesBar.innerHTML = "";

    categories.forEach(cat => {

        const div = document.createElement("div");
        div.className = "category";
        div.innerHTML = `${cat.icon} ${cat.name}`;

        div.onclick = () => {

            const filtered = getTemplates().filter(t => t.category === cat.id);
            renderTemplates(filtered);

        };

        categoriesBar.appendChild(div);

    });

}

// =========================
// عرض القوالب
// =========================
function renderTemplates(templates) {

    templatesGrid.innerHTML = "";

    templates.forEach(template => {

        const card = document.createElement("div");
        card.className = "template-card";

        card.innerHTML = `
            <img src="../${template.thumbnail}" />
            <h3>${template.name}</h3>
        `;

        card.onclick = () => {
            console.log("Template selected:", template);
            // لاحقًا نفتح editor
        };

        templatesGrid.appendChild(card);

    });

}

// =========================
// البحث
// =========================
function setupSearch() {

    searchInput.addEventListener("input", (e) => {

        const value = e.target.value.toLowerCase();

        const filtered = getTemplates().filter(t =>
            t.name.toLowerCase().includes(value)
        );

        renderTemplates(filtered);

    });

}

// تشغيل الصفحة
initHome();
