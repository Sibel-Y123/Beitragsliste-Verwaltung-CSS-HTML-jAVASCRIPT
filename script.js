const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const postlist = document.getElementById("postList");
const form = document.getElementById("addPostForm");

document.addEventListener("DOMContentLoaded", fetchPosts);

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const body = document.getElementById("body").value.trim();
    if (!title || !body) return;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body }),
        });

        const newPost = await response.json();
        addPost(newPost);
        form.reset();
    } catch (error) {
        console.error("Es gibt kein Beitrag:", error);
    }
});

async function fetchPosts() {
    try {
        const response = await fetch(`${apiUrl}?_limit=10`);
        const posts = await response.json();
        postlist.innerHTML = '';
        posts.forEach(post => addPost(post));
    } catch (error) {
        console.error("Beiträge konnten nicht geladen werden:", error);
    }
}

function addPost(post) {
    const div = document.createElement("div");
    div.className = "post-item";
    div.dataset.id = post.id;
    div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="delete-btn">Löschen</button>
    `;

    div.querySelector(".delete-btn").addEventListener("click", () => deletePost(post.id, div));
    postlist.prepend(div);
}

async function deletePost(id, div) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            div.remove();
        } else {
            alert("Der Löschvorgang ist fehlgeschlagen!");
        }
    } catch (error) {
        console.error("Verbindungsversuch fehlgeschlagen:", error);
    }
}






