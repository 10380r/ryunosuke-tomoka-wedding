const body = document.body;
const loadingScreen = document.querySelector("[data-loading-screen]");
const staggerItems = document.querySelectorAll(".stagger-item");
const navLinks = document.querySelectorAll("a[data-nav]");

staggerItems.forEach((item, index) => {
  item.style.setProperty("--delay", `${index * 0.06}s`);
});

const revealPage = () => {
  body.classList.remove("intro-active");
  requestAnimationFrame(() => {
    body.classList.add("is-loaded");
  });
};

const readIntroSeen = () => {
  try {
    return window.sessionStorage.getItem("wedding_intro_seen") === "1";
  } catch {
    return false;
  }
};

const writeIntroSeen = () => {
  try {
    window.sessionStorage.setItem("wedding_intro_seen", "1");
  } catch {
    return;
  }
};

if (loadingScreen) {
  const shouldShowIntro = body.dataset.page === "home" && !readIntroSeen();

  if (shouldShowIntro && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    body.classList.add("intro-active");
    window.setTimeout(() => {
      writeIntroSeen();
      loadingScreen.classList.add("is-hidden");
      revealPage();
      window.setTimeout(() => {
        loadingScreen.remove();
      }, 850);
    }, 4700);
  } else {
    loadingScreen.remove();
    revealPage();
  }
} else {
  revealPage();
}

window.addEventListener("pageshow", () => {
  body.classList.add("is-loaded");
  body.classList.remove("is-leaving");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target === "_blank"
    ) {
      return;
    }

    const targetUrl = new URL(link.href, window.location.href);
    if (targetUrl.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = targetUrl.href;
    }, 360);
  });
});
