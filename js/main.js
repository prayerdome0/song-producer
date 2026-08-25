(function () {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dotsWrap = document.querySelector(".hero-dots");
  if (slides.length && dotsWrap) {
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Show slide " + (i + 1));
      if (i === 0) b.classList.add("on");
      b.addEventListener("click", () => go(i, true));
      dotsWrap.appendChild(b);
    });
    const dots = Array.from(dotsWrap.querySelectorAll("button"));
    let n = 0;
    let timer = setInterval(() => go(n + 1), 4500);
    function go(i, user) {
      n = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("active", k === n));
      dots.forEach((d, k) => d.classList.toggle("on", k === n));
      if (user) {
        clearInterval(timer);
        timer = setInterval(() => go(n + 1), 4500);
      }
    }
  }

  const auto = document.querySelector(".auto-show");
  if (auto) {
    const imgs = Array.from(auto.querySelectorAll("img"));
    const cap = auto.querySelector(".caption span");
    let i = 0;
    setInterval(() => {
      i = (i + 1) % imgs.length;
      imgs.forEach((im, k) => im.classList.toggle("on", k === i));
      if (cap) cap.textContent = imgs[i].alt || "Studio";
    }, 3200);
  }

  const menuBtn = document.querySelector(".menu-btn");
  const links = document.querySelector(".nav-links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", () => links.classList.toggle("open"));
  }

  const box = document.querySelector(".lightbox");
  if (box) {
    const img = box.querySelector("img");
    document.querySelectorAll("[data-full]").forEach((el) => {
      el.addEventListener("click", () => {
        img.src = el.getAttribute("data-full");
        img.alt = el.getAttribute("alt") || "SWDL gallery";
        box.classList.add("open");
      });
    });
    box.querySelector("button").addEventListener("click", () => box.classList.remove("open"));
    box.addEventListener("click", (e) => {
      if (e.target === box) box.classList.remove("open");
    });
  }

  const form = document.querySelector("form[data-swdl]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = form.querySelector(".note");
      note.textContent = "Message recorded locally. Reach SWDL at xxxxx — this preview does not send mail.";
    });
  }
})();
