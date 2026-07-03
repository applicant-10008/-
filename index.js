const backToTopBtn = document.getElementById("backToTopBtn");
    window.onscroll = function() {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    };
    
    backToTopBtn.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

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