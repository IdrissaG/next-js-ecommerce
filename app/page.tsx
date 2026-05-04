"use client";

import { useEffect, useRef } from "react";

export default function HomePage() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    document.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const animRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      ring.style.left = ringPos.current.x + "px";
      ring.style.top = ringPos.current.y + "px";
      rafId = requestAnimationFrame(animRing);
    };
    rafId = requestAnimationFrame(animRing);

    const hoverEls = document.querySelectorAll("a, button, .card, .insta-tile");
    const onEnter = () => {
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(201,169,110,0.8)";
    };
    const onLeave = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(201,169,110,0.5)";
    };
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Scroll reveal
    const revealEls = document.querySelectorAll<HTMLElement>(
      ".section-header, .story-grid, .card"
    );
    revealEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => observer.observe(el));

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">ZEINAB</a>
        <ul className="nav-links">
          <li><a href="#collection">Collection</a></li>
          <li><a href="#story">Story</a></li>
          <li><a href="#instagram">Instagram</a></li>
          <li><a href="#contact" style={{ color: "var(--gold)" }}>Shop Now</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <p className="hero-eyebrow">Dakar · Est. 2018</p>
        <h1 className="hero-title">ZEINAB</h1>
        <p className="hero-subtitle">Create your own trend</p>
        <div className="hero-divider" />
        <p className="hero-since">
          Now online — <span>Back &amp; Better</span>
        </p>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "contents" }}>
              <span>New Collection</span><span className="dot">✦</span>
              <span>Dakar to the World</span><span className="dot">✦</span>
              <span>Create Your Trend</span><span className="dot">✦</span>
              <span>Online Boutique 2024</span><span className="dot">✦</span>
              <span>Feminine · Bold · Timeless</span><span className="dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* COLLECTION */}
      <div id="collection">
        <div className="section">
          <div className="section-header">
            <div>
              <p className="section-label">Latest Arrivals</p>
              <h2 className="section-title">
                The New <em>Essentials</em>
              </h2>
            </div>
            <a href="#" className="section-link">View All Pieces</a>
          </div>

          <div className="grid-4">
            {/* Featured card */}
            <div className="card">
              <div className="card-placeholder cp-1" style={{ height: "100%" }}>
                <div className="cp-shape" style={{ width: 300, height: 300, top: -50, right: -80 }} />
                <svg className="silhouette" width="180" height="320" viewBox="0 0 180 320" fill="none">
                  <path d="M90 20 C65 20 50 45 50 70 L30 160 L20 300 L160 300 L150 160 L130 70 C130 45 115 20 90 20Z" fill="white" />
                </svg>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right,transparent,rgba(201,169,110,0.4),transparent)" }} />
              </div>
              <div className="card-info">
                <div className="card-name">Élegance Noire</div>
                <div className="card-price">Featured Piece</div>
              </div>
            </div>

            <div className="card">
              <div className="card-placeholder cp-2">
                <div className="cp-shape" style={{ width: 200, height: 200, bottom: -30, left: -40 }} />
                <svg className="silhouette" width="120" height="200" viewBox="0 0 120 200" fill="none">
                  <path d="M60 10 C40 10 30 30 30 50 L20 100 C20 130 35 190 60 190 C85 190 100 130 100 100 L90 50 C90 30 80 10 60 10Z" fill="white" />
                </svg>
              </div>
              <div className="card-info">
                <div className="card-name">Silhouette I</div>
                <div className="card-price">Available Now</div>
              </div>
            </div>

            <div className="card">
              <div className="card-placeholder cp-3">
                <div className="cp-shape" style={{ width: 180, height: 180, top: -20, right: -20 }} />
                <svg className="silhouette" width="100" height="160" viewBox="0 0 100 160" fill="none">
                  <path d="M20 10 L80 10 L95 80 L80 150 L20 150 L5 80 Z" fill="white" />
                </svg>
              </div>
              <div className="card-info">
                <div className="card-name">Couture Line</div>
                <div className="card-price">New Season</div>
              </div>
            </div>

            <div className="card">
              <div className="card-placeholder cp-4">
                <svg className="silhouette" width="120" height="180" viewBox="0 0 120 180" fill="none">
                  <ellipse cx="60" cy="90" rx="45" ry="70" fill="white" />
                  <rect x="45" y="10" width="30" height="30" rx="15" fill="white" />
                </svg>
              </div>
              <div className="card-info">
                <div className="card-name">Dakar Edit</div>
                <div className="card-price">Exclusive</div>
              </div>
            </div>

            <div className="card">
              <div className="card-placeholder cp-5">
                <div className="cp-shape" style={{ width: 220, height: 220, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              </div>
              <div className="card-info">
                <div className="card-name">Evening Wear</div>
                <div className="card-price">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA STRIP */}
      <section className="cta-strip" id="contact">
        <p className="cta-eyebrow">Online Boutique · Open Now</p>
        <h2 className="cta-title">
          Wear your story.
          <em>Set the trend.</em>
        </h2>
        <a href="https://www.instagram.com/zeinab" className="btn btn-outline" target="_blank" rel="noreferrer">
          Follow on Instagram
        </a>
        <a href="https://www.instagram.com/zeinab" className="btn btn-gold" target="_blank" rel="noreferrer">
          Shop the Look
        </a>
      </section>

      {/* STORY */}
      <div id="story">
        <div className="section">
          <div className="story-grid">
            <div className="story-visual">
              <div className="story-year">2018</div>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.15 }}>
                <svg width="200" height="280" viewBox="0 0 200 280" fill="none">
                  <path d="M100 20 C65 20 45 55 45 90 L30 180 C30 230 60 270 100 270 C140 270 170 230 170 180 L155 90 C155 55 135 20 100 20Z" fill="white" stroke="rgba(201,169,110,0.5)" strokeWidth="1" />
                </svg>
              </div>
              <div className="story-dakar">Dakar, Sénégal</div>
            </div>

            <div className="story-text">
              <p className="section-label">The Story</p>
              <h2 className="section-title" style={{ marginBottom: 32 }}>
                Born in <em>Dakar</em>
              </h2>
              <p className="story-body">
                &quot;Since 2018, Zeinab has dressed women who refuse to follow trends — they create them. From our boutique in Dakar to the world, our clothes are made for women who know exactly who they are.&quot;
              </p>
              <div className="story-detail">
                <p><strong>Founded</strong> — Dakar, Sénégal, 2018</p>
                <p><strong>Philosophy</strong> — Feminine. Bold. Timeless.</p>
                <p><strong>Now</strong> — Online worldwide</p>
              </div>
              <div className="badge">Relaunch 2024 — Online Only</div>
            </div>
          </div>
        </div>
      </div>

      {/* INSTAGRAM */}
      <section className="insta-section" id="instagram">
        <p className="insta-title">
          Follow the journey on{" "}
          <a href="https://www.instagram.com/zeinab" target="_blank" rel="noreferrer">@zeinab</a>
        </p>
        <div className="insta-grid">
          <div className="insta-tile" style={{ background: "linear-gradient(135deg,#1a1815,#252018)" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.15 }}>
              <svg width="80" height="120" viewBox="0 0 80 120" fill="white"><path d="M40 5 C25 5 15 20 15 35 L10 75 L5 115 L75 115 L70 75 L65 35 C65 20 55 5 40 5Z" /></svg>
            </div>
          </div>
          <div className="insta-tile" style={{ background: "linear-gradient(135deg,#181618,#222022)" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.12 }}>
              <svg width="70" height="100" viewBox="0 0 70 100" fill="rgba(201,169,110,1)"><ellipse cx="35" cy="50" rx="30" ry="45" /></svg>
            </div>
          </div>
          <div className="insta-tile" style={{ background: "linear-gradient(135deg,#1c1a14,#28231a)" }}>
            <div style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "'Cormorant Garamond',serif", fontSize: 32, color: "rgba(201,169,110,0.15)", letterSpacing: "0.1em" }}>Z</div>
          </div>
          <div className="insta-tile" style={{ background: "#161614" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 70%,rgba(201,169,110,0.08),transparent 60%)" }} />
          </div>
          <div className="insta-tile" style={{ background: "linear-gradient(135deg,#191714,#23201a)" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.1 }}>
              <svg width="90" height="90" viewBox="0 0 90 90" fill="white"><polygon points="45,5 85,30 85,70 45,85 5,70 5,30" /></svg>
            </div>
          </div>
          <div className="insta-tile" style={{ background: "#141414" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 11, letterSpacing: "0.3em", color: "rgba(201,169,110,0.3)", textTransform: "uppercase" }}>More</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="footer-logo">ZEINAB</div>
          <div className="footer-sub">Create your own trend</div>
        </div>
        <div className="footer-links">
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="https://www.instagram.com/zeinab" target="_blank" rel="noreferrer">Instagram</a>
          <a href="#">Contact</a>
        </div>
      </footer>
      <div className="footer-bottom">
        <span className="footer-copy">© 2024 Zeinab. Dakar, Sénégal.</span>
        <span className="footer-copy">All rights reserved.</span>
      </div>
    </>
  );
}