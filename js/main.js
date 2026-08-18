document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
   * マウス追従ネオンスポットライト
   * -------------------------------------------------- */
  const glow = document.createElement('div');
  glow.classList.add('mouse-glow');
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    // カーソルの座標に合わせて発光エフェクトを移動
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });


  /* --------------------------------------------------
   *  カードの3Dチルト（立体的な傾き）エフェクト
   * -------------------------------------------------- */
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // カード内のX座標
      const y = e.clientY - rect.top;  // カード内のY座標

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // マウスの位置に応じて傾き（度数）を計算
      const rotateX = ((y - centerY) / centerY) * -12; // 上下傾き
      const rotateY = ((x - centerX) / centerX) * 12;  // 左右傾き

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    // マウスが外れたら元の位置に戻す
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });


  /* --------------------------------------------------
   * スクロール時のふわっと出現アニメーション
   * -------------------------------------------------- */
  const observerOptions = {
    root: null,
    threshold: 0.15 // 要素が15%画面に入ったら発火
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 一度表示されたら監視解除
      }
    });
  }, observerOptions);

  cards.forEach((card, index) => {
    card.classList.add('scroll-fade');
    // 少しずつズレて表示されるようにディレイを設定
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
  });


  /* --------------------------------------------------
   * ナビゲーションのスムーズスクロール
   * -------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#') && targetId.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

});
/* --------------------------------------------------
   *  スクロール位置に合わせてナビゲーションの active を自動切り替え
   * -------------------------------------------------- */
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  /* --------------------------------------------------
   * トップに戻る（↑）ボタンのスクロール制御
   * -------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
