(() => {
  // Header
  // Defer until loaded so that page height changes while loading won't hide the header.
  window.addEventListener('load', () => {
    const header = document.querySelector('.page-header')
    let lastScrollY = window.scrollY;
    let lastTranslateY = 0;
    document.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const deltaY = scrollY - lastScrollY;
      lastScrollY = scrollY;
      const translateY = Math.max(-header.offsetHeight, Math.min(lastTranslateY - deltaY, 0));
      // See also https://stackoverflow.com/a/44779316 .
      if (lastTranslateY !== translateY) {
        lastTranslateY = translateY;
        window.requestAnimationFrame(() => {
          header.style.transform = `translateY(${translateY}px)`;
        });
      }
    });
  });

  // Fancybox
  document.querySelectorAll('.post-body').forEach( (postBody, postIndex) => {
    postBody.querySelectorAll('img').forEach(img => {
      const parentElement = img.parentElement;
      if (parentElement.classList.contains('fancybox') || parentElement.tagName === 'A') {
        return;
      }
      const figure = document.createElement('figure');
      parentElement.insertBefore(figure, img);
      figure.appendChild(img);
      img.setAttribute('data-fancybox', `gallery-post-${postIndex}`);
      const src = img.src;
      img.setAttribute('data-src', src);
      img.setAttribute('data-thumb', src);
      const alt = img.alt;
      if (alt) {
        img.setAttribute('data-caption', alt);
        const figcaption = document.createElement('figcaption');
        figcaption.innerText = alt;
        figure.appendChild(figcaption);
      }
    });
  });
})();
