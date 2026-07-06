// =========================
// Category Service
// =========================

let categories = [];

// تحميل التصنيفات
export async function loadCategories() {

    try {

        const response = await fetch("../../data/categories.json");

        categories = await response.json();

        return categories;

    } catch (error) {

        console.error("Failed to load categories:", error);

        return [];

    }

}

// جميع التصنيفات
export function getCategories() {

    return categories;

}

// جلب تصنيف واحد
export function getCategory(id) {

    return categories.find(category =>
        category.id === id
    );

}
