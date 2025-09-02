// Betölti a data-include attribútumban megadott HTML-részletet
async function includePartials() {
  const nodes = document.querySelectorAll("[data-include]");
  for (const el of nodes) {
    const url = el.getAttribute("data-include");
    try {
      const res = await fetch(url, { cache: "no-store" }); // mindig friss
      if (!res.ok) throw new Error(res.status + " " + res.statusText);
      el.innerHTML = await res.text();
    } catch (err) {
      console.error("Include error:", url, err);
      // opcionális hibaüzenet
      // el.innerHTML = "<!-- include failed: " + url + " -->";
    }
  }
}

document.addEventListener("DOMContentLoaded", includePartials);
