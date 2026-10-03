window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-H4GRHD7XM7');

const currentUrl = new URL(window.location.href);
if (currentUrl.searchParams.has("_version")) {
  currentUrl.searchParams.delete("_version");
  window.history.replaceState(null, "", currentUrl.pathname + currentUrl.search + currentUrl.hash);
}

const siteVersion = document.querySelector('meta[name="site-version"]')?.content;
const updateNotice = document.getElementById("updateNotice");
const refreshForUpdate = document.getElementById("refreshForUpdate");
const dismissUpdate = document.getElementById("dismissUpdate");

if (siteVersion && updateNotice && refreshForUpdate && dismissUpdate) {
  let latestVersion = "";
  let dismissedVersion = "";
  let checkingForUpdates = false;

  const isNewerVersion = (candidate, current) => {
    const candidateParts = candidate.split(".").map(Number);
    const currentParts = current.split(".").map(Number);

    if ([...candidateParts, ...currentParts].some(part => !Number.isInteger(part))) return false;

    for (let index = 0; index < Math.max(candidateParts.length, currentParts.length); index++) {
      const candidatePart = candidateParts[index] || 0;
      const currentPart = currentParts[index] || 0;

      if (candidatePart !== currentPart) return candidatePart > currentPart;
    }

    return false;
  };

  const checkForUpdates = async () => {
    if (checkingForUpdates || document.visibilityState !== "visible") return;

    checkingForUpdates = true;

    try {
      const checkUrl = new URL(window.location.href);
      checkUrl.searchParams.set("_update_check", Date.now().toString());

      const response = await fetch(checkUrl, { cache: "no-store" });
      if (!response.ok) return;

      const latestHtml = await response.text();
      const latestDocument = new DOMParser().parseFromString(latestHtml, "text/html");
      latestVersion = latestDocument.querySelector('meta[name="site-version"]')?.content || "";

      const hasNewerVersion = isNewerVersion(latestVersion, siteVersion);
      updateNotice.hidden = !hasNewerVersion || latestVersion === dismissedVersion;
    } catch {
      updateNotice.hidden = true;
    } finally {
      checkingForUpdates = false;
    }
  };

  refreshForUpdate.addEventListener("click", () => {
    if (!latestVersion) return;

    const refreshUrl = new URL(window.location.href);
    refreshUrl.searchParams.set("_version", latestVersion);
    window.location.replace(refreshUrl);
  });

  dismissUpdate.addEventListener("click", () => {
    dismissedVersion = latestVersion;
    updateNotice.hidden = true;
  });

  checkForUpdates();
  window.setInterval(checkForUpdates, 0.25 * 60 * 1000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkForUpdates();
  });
}

const navigation = document.querySelector(".section-inner");
const navigationToggle = document.getElementById("navToggle");
const navigationLinks = document.getElementById("navLinks");

if (navigation && navigationToggle && navigationLinks) {
  const setNavigationCollapsed = (collapsed, returnFocus = false) => {
    navigation.classList.toggle("is-collapsed", collapsed);
    document.body.classList.toggle("nav-collapsed", collapsed);
    navigationToggle.setAttribute("aria-expanded", String(!collapsed));

    const label = collapsed ? "Expand navigation" : "Collapse navigation";
    navigationToggle.setAttribute("aria-label", label);
    navigationToggle.setAttribute("title", label);

    if (returnFocus) navigationToggle.focus();
  };

  navigationToggle.addEventListener("click", () => {
    setNavigationCollapsed(!navigation.classList.contains("is-collapsed"));
  });
}


const backToTopBtn = document.getElementById("backToTopBtn");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    backToTopBtn.style.display = scrollTop > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const spotifyLoadButtons = document.querySelectorAll(".spotify-load-btn");
spotifyLoadButtons.forEach(button => {
  button.addEventListener("click", () => {
    const embed = button.closest(".spotify-embed");
    if (!embed || embed.classList.contains("loaded")) return;

    const src = embed.dataset.src;
    const trackId = src.match(/track\/([^?]+)/)?.[1] || "unknown";
    const trackName = embed.dataset.track || "Spotify track";

    if (window.gtag) {
      window.gtag("event", "spotify_player_click", {
        event_category: "engagement",
        event_label: trackName,
        spotify_track: trackId,
        spotify_track_name: trackName
      });
    }

    const iframe = document.createElement("iframe");
    iframe.setAttribute("title", "Spotify audio player");
    iframe.setAttribute("src", src);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "152");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture");
    iframe.setAttribute("loading", "lazy");
    iframe.style.borderRadius = "12px";

    embed.innerHTML = "";
    embed.appendChild(iframe);
    embed.classList.add("loaded");
  });
});

const socialLinks = document.querySelectorAll(".social-link");
socialLinks.forEach(link => {
  link.addEventListener("click", () => {
    const platform = link.getAttribute("title") || "unknown";
    const destinationUrl = link.href || "unknown";

    if (window.gtag) {
      window.gtag("event", "social_media_click", {
        event_category: "engagement",
        event_label: platform,
        social_platform: platform.toLowerCase(),
        destination_url: destinationUrl
      });
    }
  });
});

