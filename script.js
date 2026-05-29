// Page switching
const navLinks = document.querySelectorAll(".nav-link, [data-page]");
const pageSections = document.querySelectorAll(".page-section");
const heroSection = document.getElementById("home-page");

function switchPage(pageName) {
  // Update nav active state
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageName);
  });

  // Hide hero, show target page
  heroSection.classList.remove("active");
  pageSections.forEach((section) => {
    section.classList.toggle("active", section.id === `${pageName}-page`);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome() {
  // Show hero, hide all pages
  heroSection.classList.add("active");
  pageSections.forEach((section) => {
    section.classList.remove("active");
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    if (page) {
      switchPage(page);
    }
  });
});

// Brand click goes home
document.querySelector(".brand").addEventListener("click", (e) => {
  e.preventDefault();
  goHome();
});

// Typing animation - one letter at a time
const heroRoles = ["Frontend Developer", "Vue Specialist", "React Developer"];
const heroRoleLive = document.getElementById("hero-role-live");

if (heroRoleLive && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function typeEffect() {
    const currentRole = heroRoles[roleIndex];

    if (isPaused) {
      setTimeout(typeEffect, 2000);
      isPaused = false;
      isDeleting = true;
      return;
    }

    if (isDeleting) {
      charIndex--;
      heroRoleLive.textContent = currentRole.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % heroRoles.length;
        setTimeout(typeEffect, 300);
        return;
      }
      setTimeout(typeEffect, 50);
    } else {
      charIndex++;
      heroRoleLive.textContent = currentRole.substring(0, charIndex);

      if (charIndex === currentRole.length) {
        isPaused = true;
        setTimeout(typeEffect, 0);
        return;
      }
      setTimeout(typeEffect, 100);
    }
  }

  typeEffect();
}

// Project filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === "all" || category === filter) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// Mobile navigation
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.getElementById("site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Scroll reveal
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll("[data-reveal]").forEach((node) => revealObserver.observe(node));
} else {
  document.querySelectorAll("[data-reveal]").forEach((node) => node.classList.add("is-visible"));
}

// Skill bar animation
if ("IntersectionObserver" in window) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = "0";
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".skill-progress").forEach((bar) => skillObserver.observe(bar));
}

// Gallery Data
const galleries = {
  city: {
    title: "City · 城市探索",
    images: [
      { src: "assets/images/city/24f5135456dec67ab353e0f38f961757_720.jpg", title: "城市黄昏", desc: "夕阳下的城市天际线" },
      { src: "assets/images/city/4b7d764173604b46222d5db2acb83d87_0.jpg", title: "街头漫步", desc: "穿行在城市的每个角落" },
      { src: "assets/images/city/5f2094a888a444430326cb24c99d2a33_0.jpg", title: "海滨风光", desc: "面朝大海，春暖花开" },
      { src: "assets/images/city/657ae1ef3e9740fa164434d5bb7e9a01_0.jpg", title: "湖畔倒影", desc: "宁静的湖水映照城市" },
      { src: "assets/images/city/86bd5dac1dd6715c394c3d01f5f99675_720.jpg", title: "城市剪影", desc: "光影交错的城市轮廓" },
      { src: "assets/images/city/cd304fc9c7d0571514698f8242d3d210_0.jpg", title: "建筑之美", desc: "现代与传统的交融" },
      { src: "assets/images/city/e16249635fbf27052098d73a92109b6d_720.jpg", title: "绿意盎然", desc: "城市中的自然角落" },
      { src: "assets/images/city/e5670ef46097a6228b528dd259d8979e_720.jpg", title: "云端视角", desc: "仰望天空的瞬间" },
      { src: "assets/images/city/e8c2f089bf32d7c7696ecdd44b6d2da2_720.jpg", title: "水岸风情", desc: "城市的另一面" }
    ]
  },
  life: {
    title: "Moments · 生活随拍",
    images: [
      { src: "assets/images/life/1683dcbc15c7a991040d376237c0c014_0.jpg", title: "日常碎片", desc: "记录生活的点点滴滴" },
      { src: "assets/images/life/513ca26d82a5dcfb3af1be6aa81d1717_0.jpg", title: "好友时光", desc: "与朋友在一起的日子" },
      { src: "assets/images/life/07ee4e1118658dbe6901b7713f512218_0.jpg", title: "生活瞬间", desc: "平凡日子里的美好" },
      { src: "assets/images/life/5ed767c30bc6ccb46719fc15999e2f76_0.jpg", title: "周末时光", desc: "放松身心的时刻" },
      { src: "assets/images/life/4a509e5a413c320a2153a1f8a92b5d0d_0.jpg", title: "城市漫步", desc: "用脚步丈量城市" },
      { src: "assets/images/life/e75883df6cad945ee458c338c356b883_0.jpg", title: "美好记忆", desc: "值得珍藏的瞬间" }
    ]
  },
  work: {
    title: "Company · 公司风采",
    images: [
      { src: "assets/images/work/a520dfe2817d036092d7a9c432b13737_720.jpg", title: "团队聚餐", desc: "欢乐的团队时光" },
      { src: "assets/images/work/4bb180f7be8b1f9108cfbf4c418673a1_0.jpg", title: "冬季团建", desc: "一起滑雪的快乐" },
      { src: "assets/images/work/7fcec2c12a59f3acf06a23bec183db77_0.jpg", title: "篮球友谊赛", desc: "ESR友谊赛·球场风采" },
      { src: "assets/images/work/d4210bb21e99b016173cabc0aa541c1a_0.jpg", title: "年会舞台", desc: "闪耀的舞台时刻" },
      { src: "assets/images/work/06fe5957d5fd7dd27f3ecbe29e5b38f0_0.jpg", title: "圣诞布置", desc: "温馨的节日氛围" },
      { src: "assets/images/work/b2b6d0abda269a4e50b506ed379358fe_0.jpg", title: "公司年会", desc: "精彩的年会表演" },
      { src: "assets/images/work/c2048f1cc2386a87f00c8b8f061d8910_0.png", title: "篮球比赛", desc: "工作之余的运动激情" },
      { src: "assets/images/work/c7520c74f0563e007648fde069f371d3_0.jpg", title: "培训分享", desc: "学习成长的每一天" }
    ]
  }
};

// Card Slider
document.querySelectorAll(".card-slider").forEach((slider) => {
  const galleryName = slider.dataset.gallery;
  const slides = slider.querySelectorAll(".card-slide");
  const dotsContainer = slider.querySelector(".card-dots");
  const prevBtn = slider.querySelector(".card-prev");
  const nextBtn = slider.querySelector(".card-next");
  const total = slides.length;
  let currentIndex = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("card-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = slider.querySelectorAll(".card-dot");

  function getPosition(offset) {
    let pos = currentIndex + offset;
    if (pos < 0) pos = total + pos;
    if (pos >= total) pos = pos - total;
    return pos;
  }

  function goToSlide(index) {
    currentIndex = index;
    slides.forEach((slide, i) => {
      slide.classList.remove("active", "prev-1", "next-1", "prev-2", "next-2", "hidden");

      const offset = i - currentIndex;
      const absOffset = Math.abs(offset);

      if (offset === 0) {
        slide.classList.add("active");
      } else if (offset === -1 || (currentIndex === 0 && i === total - 1)) {
        slide.classList.add("prev-1");
      } else if (offset === 1 || (currentIndex === total - 1 && i === 0)) {
        slide.classList.add("next-1");
      } else if (offset === -2 || (currentIndex <= 1 && i >= total - 2)) {
        slide.classList.add("prev-2");
      } else if (offset === 2 || (currentIndex >= total - 2 && i <= 1)) {
        slide.classList.add("next-2");
      } else {
        slide.classList.add("hidden");
      }
    });
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex === 0 ? total - 1 : currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex === total - 1 ? 0 : currentIndex + 1);
  });

  // Click active slide to open lightbox
  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      if (slide.classList.contains("active")) {
        openLightbox(galleryName);
      }
    });
  });

  goToSlide(0);
});

// Lightbox - Grid View
let currentGalleryName = null;

const lightbox = document.getElementById("lightbox");
const lightboxGrid = lightbox.querySelector(".lightbox-grid");
const lightboxTitle = lightbox.querySelector(".lightbox-title");

// Image Viewer - Single Image
let viewerImages = [];
let viewerIndex = 0;

const viewer = document.getElementById("image-viewer");
const viewerImage = viewer.querySelector(".viewer-image");
const viewerCounter = viewer.querySelector(".viewer-counter");

function openLightbox(galleryName) {
  currentGalleryName = galleryName;
  const gallery = galleries[galleryName];
  lightboxTitle.textContent = gallery.title;

  // Build grid
  lightboxGrid.innerHTML = "";
  gallery.images.forEach((img, i) => {
    const item = document.createElement("div");
    item.classList.add("lightbox-grid-item");
    item.innerHTML = `
      <img src="${img.src}" alt="${img.title}">
      <div class="grid-item-info">
        <h4>${img.title}</h4>
        <p>${img.desc}</p>
      </div>
    `;
    item.addEventListener("click", () => openViewer(gallery.images, i));
    lightboxGrid.appendChild(item);
  });

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  currentGalleryName = null;
}

function openViewer(images, index) {
  viewerImages = images;
  viewerIndex = index;
  updateViewer();
  viewer.classList.add("active");
}

function closeViewer() {
  viewer.classList.remove("active");
  viewerImages = [];
  viewerIndex = 0;
}

function updateViewer() {
  viewerImage.src = viewerImages[viewerIndex].src;
  viewerCounter.textContent = `${viewerIndex + 1} / ${viewerImages.length}`;
}

function nextViewerImage() {
  viewerIndex = (viewerIndex + 1) % viewerImages.length;
  updateViewer();
}

function prevViewerImage() {
  viewerIndex = (viewerIndex - 1 + viewerImages.length) % viewerImages.length;
  updateViewer();
}

// View All buttons
document.querySelectorAll(".view-all-btn").forEach((btn) => {
  btn.addEventListener("click", () => openLightbox(btn.dataset.gallery));
});

// Lightbox controls
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Viewer controls
viewer.querySelector(".viewer-close").addEventListener("click", closeViewer);
viewer.querySelector(".viewer-next").addEventListener("click", nextViewerImage);
viewer.querySelector(".viewer-prev").addEventListener("click", prevViewerImage);
viewer.addEventListener("click", (e) => {
  if (e.target === viewer) closeViewer();
});

// Keyboard
document.addEventListener("keydown", (e) => {
  if (viewer.classList.contains("active")) {
    if (e.key === "Escape") closeViewer();
    if (e.key === "ArrowRight") nextViewerImage();
    if (e.key === "ArrowLeft") prevViewerImage();
  } else if (lightbox.classList.contains("active")) {
    if (e.key === "Escape") closeLightbox();
  }
});
