const backToTopBtn = document.getElementById("backToTopBtn");
    window.onscroll = function() {
      if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
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