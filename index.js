window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-H4GRHD7XM7');

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

  navigationLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        setNavigationCollapsed(true, true);
      }
    });
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

