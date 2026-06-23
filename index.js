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