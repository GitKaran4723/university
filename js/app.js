// Fetch and render content dynamically from JSON
async function fetchAndRender(category) {
  const response = await fetch(`data/${category}.json`);
  const items = await response.json();

  // Clear and populate content list
  const listContainer = document.getElementById("content-list");
  const contentDisplay = document.getElementById("content-display");
  contentDisplay.classList.add("hidden"); // Hide content display initially
  listContainer.innerHTML = `<h1>${capitalize(category)}</h1>`;

  items.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.className = "content-item";
    listItem.innerHTML = `
        <h2>${item.title}</h2>
        <p><strong>Author:</strong> ${item.author} | <strong>Date:</strong> ${item.date}</p>
        <button class="btn" onclick="loadMarkdown('${item.file}')">Read More</button>
      `;
    listContainer.appendChild(listItem);
  });
}

// Fetch and render Markdown content
async function loadMarkdown(file) {
  const response = await fetch(file);
  const markdown = await response.text();

  // Parse Markdown and display it
  const contentDisplay = document.getElementById("content-display");
  contentDisplay.innerHTML = marked.parse(markdown);

  // Add the "visible" class for smooth transition
  contentDisplay.classList.remove("hidden");
  contentDisplay.classList.add("visible");

  // Smooth scroll to content display
  contentDisplay.scrollIntoView({ behavior: "smooth" });
}

// Utility function to capitalize strings
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});
