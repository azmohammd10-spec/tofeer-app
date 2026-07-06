// =========================
// Template Service
// =========================

let templates = [];

// تحميل جميع القوالب
export async function loadTemplates() {

    try {

        const response = await fetch("../../data/templates.json");

        templates = await response.json();

        return templates;

    } catch (error) {

        console.error("Failed to load templates:", error);

        return [];

    }

}

// جميع القوالب
export function getTemplates() {

    return templates;

}

// البحث باسم القالب
export function searchTemplates(keyword) {

    return templates.filter(template =>
        template.name
            .toLowerCase()
            .includes(keyword.toLowerCase())
    );

}

// حسب التصنيف
export function getTemplatesByCategory(category) {

    return templates.filter(template =>
        template.category === category
    );

}

// حسب النوع
export function getTemplatesByType(type) {

    return templates.filter(template =>
        template.type === type
    );

}

// قالب واحد
export function getTemplate(id) {

    return templates.find(template =>
        template.id === id
    );

}
