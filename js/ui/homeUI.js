import { getTemplates } from "../modules/templates/templateService.js";
import { getCategories } from "../modules/categories/categoryService.js";
import { toggleFavorite, getFavorites } from "../modules/favorites/favoriteService.js";

// 🏠 تشغيل الصفحة
export async function loadHome() {

  const templates = await getTemplates();
  const categories = await getCategories();

  renderCategories(categories, templates);
  renderTemplates(templates);

  setupSearch(templates);
}

let selectedCategory = "all";


// 📂 التصنيفات
function renderCategories(categories, templates) {
  const box = document.getElementById("categories");

  box.innerHTML = `<button onclick="filterAll()">الكل</button>`;

  categories.forEach(cat => {
    box.innerHTML += `
      <button onclick="filterByCategory('${cat.id}')">
        ${cat.name}
      </button>
    `;
  });

  window.filterByCategory = (id) => {
    selectedCategory = id;

    const filtered = templates.filter(t => t.category === id);
    renderTemplates(filtered);
  };

  window.filterAll = () => renderTemplates(templates);
}


// 🖼️ عرض التصاميم
function renderTemplates(list) {
  const box = document.getElementById("templates");
  const fav = getFavorites();

  box.innerHTML = "";

  list.forEach(t => {
    const isFav = fav.includes(t.id);

    box.innerHTML += `
      <div class="card">
        <h4>${t.name}</h4>

        <button onclick="favToggle('${t.id}')">
          ${isFav ? "❤️" : "🤍"}
        </button>

        <button onclick="download('${t.name}')">
          ⬇️ تحميل
        </button>
      </div>
    `;
  });

  window.favToggle = (id) => {
    toggleFavorite(id);
    renderTemplates(list);
  };

  window.download = (name) => {
    const blob = new Blob([name], { type: "text/plain" });
    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = name + ".txt";
    a.click();
  };
}


// 🔍 البحث
function setupSearch(templates) {
  const input = document.getElementById("searchInput");

  input.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = templates.filter(t =>
      t.name.toLowerCase().includes(value)
    );

    renderTemplates(filtered);
  });
}
