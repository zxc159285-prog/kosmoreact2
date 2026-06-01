import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const signatures = [
    {
      id: 1,
      title: "프리미엄 생(生) 우유식빵",
      desc: "물 한 방울 섞지 않고 100% 국산 유기농 우유와 천연 버터로 반죽하여 극한의 부드러움을 구현한 하루식빵의 시그니처 품목입니다.",
      price: "5,500원",
      badge: "BEST",
      tag: "고소한 맛",
    },
    {
      id: 2,
      title: "공주 알밤 식빵",
      desc: "당도 높은 고품질 공주 알밤이 알알이 가득 차 있어, 씹을 때마다 달콤한 율피의 풍미와 고소함이 조화로운 인기 식빵입니다.",
      price: "6,500원",
      badge: "POPULAR",
      tag: "달콤한 맛",
    },
    {
      id: 3,
      title: "트리플 치즈 식빵",
      desc: "롤치즈, 체다치즈, 모짜렐라 치즈 3종이 빵 결마다 스며들어 있어, 따뜻하게 데워 먹을 때 진한 치즈의 풍미가 예술인 식빵입니다.",
      price: "6,000원",
      badge: "NEW",
      tag: "짭조름한 맛",
    },
  ];

  return (
    <div className="home-page-content">
      {/* 1. 영웅(Hero) 배너 구역 */}
      <section className="hero-section">
        <div className="bakery-container hero-inner">
          <div className="hero-text-content">
            <span className="hero-badge">🍞 매일 아침 9시 오픈</span>
            <h1 className="hero-headline font-serif">
              매일 아침 구워내는<br />
              따뜻한 행복, <span className="highlight">하루식빵</span>
            </h1>
            <p className="hero-subline">
              유기농 밀가루와 24시간 저온 숙성 천연 효모종을 사용하여 속이 편안하고 쫄깃한 식감을 선물합니다. 방부제와 화학 첨가물 없이 정직하게 만듭니다.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate("/products")} className="bakery-btn bakery-btn-primary">
                식빵 라인업 보기
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <button onClick={() => navigate("/qna")} className="bakery-btn bakery-btn-outline">
                단체/예약 문의
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <div className="visual-bread-graphic">
                <svg className="bread-svg animate-bounce-slow" viewBox="0 0 100 100">
                  <path d="M20 50 C20 30, 30 20, 50 20 C70 20, 80 30, 80 50 C80 65, 75 75, 75 80 C75 83, 72 85, 68 85 L32 85 C28 85, 25 83, 25 80 C25 75, 20 65, 20 50 Z" fill="#E6A15C" stroke="#3E2723" strokeWidth="3" />
                  <path d="M28 50 C28 35, 35 27, 50 27 C65 27, 72 35, 72 50 C72 65, 68 73, 68 78 C68 80, 66 81, 64 81 L36 81 C34 81, 32 80, 32 78 C32 73, 28 65, 28 50 Z" fill="#FFF2D6" />
                  <path d="M35 40 Q40 37 45 40" stroke="#E6A15C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M55 42 Q60 39 65 42" stroke="#E6A15C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M42 55 Q50 51 58 55" stroke="#E6A15C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div className="visual-card-info">
                <span className="card-info-title">오늘 구운 식빵</span>
                <span className="card-info-status">실시간 오븐 작동 중 ♨️</span>
              </div>
            </div>
            <div className="visual-circle-bg"></div>
          </div>
        </div>
      </section>

      {/* 2. 브랜드 스토리 (베이커리의 철학) */}
      <section className="philosophy-section section-padding">
        <div className="bakery-container">
          <div className="section-header-center">
            <span className="section-subtitle">OUR VALUES</span>
            <h2 className="section-title font-serif">하루식빵의 세 가지 고집</h2>
            <div className="title-divider"></div>
          </div>

          <div className="philosophy-grid">
            <div className="bakery-card philosophy-card">
              <div className="philosophy-icon">🧪</div>
              <h3>24시간 저온 숙성</h3>
              <p>천연 발효종을 이용하여 하루 동안 느리게 숙성시킵니다. 밀가루 속 글루텐이 충분히 분해되어 소화가 매우 잘되고 속이 더부룩하지 않습니다.</p>
            </div>
            <div className="bakery-card philosophy-card">
              <div className="philosophy-icon">🧈</div>
              <h3>유기농 프랑스 버터</h3>
              <p>마가린이나 쇼트닝 등 인공 가공 유지를 단 1g도 섞지 않으며, 100% 프랑스산 고메 천연 버터와 유기농 밀가루만을 고집하여 풍미가 깊습니다.</p>
            </div>
            <div className="bakery-card philosophy-card">
              <div className="philosophy-icon">✨</div>
              <h3>당일 생산 & 판매</h3>
              <p>방부제나 화학 첨가제를 일절 첨가하지 않으므로 오직 당일 아침에 생산한 식빵만을 한정 판매하며, 남은 식빵은 전량 폐기 또는 기부합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 오늘 구워낸 시그니처 (Signatures) */}
      <section className="signature-section section-padding">
        <div className="bakery-container">
          <div className="signature-header">
            <div>
              <span className="section-subtitle">SIGNATURE LINEUP</span>
              <h2 className="section-title font-serif">하루식빵 대표 메뉴</h2>
            </div>
            <button onClick={() => navigate("/products")} className="bakery-btn bakery-btn-secondary">
              전체 메뉴 보기
            </button>
          </div>

          <div className="signature-grid">
            {signatures.map((sig) => (
              <div key={sig.id} className="bakery-card signature-card">
                <div className="sig-image-placeholder">
                  <span className="sig-emoji">🍞</span>
                  <span className={`bakery-badge bakery-badge-primary sig-badge`}>
                    {sig.badge}
                  </span>
                </div>
                <div className="sig-body">
                  <span className="sig-tag">{sig.tag}</span>
                  <h3 className="sig-title">{sig.title}</h3>
                  <p className="sig-desc">{sig.desc}</p>
                  <div className="sig-footer">
                    <span className="sig-price">{sig.price}</span>
                    <button onClick={() => navigate("/products")} className="sig-btn">
                      상세 정보
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 리뷰 & 소셜 밴드 */}
      <section className="review-section section-padding">
        <div className="bakery-container">
          <div className="review-banner bakery-card">
            <h2 className="font-serif">“인생 식빵을 찾았습니다!”</h2>
            <p>
              &ldquo;밤식빵에 밤이 정말 아낌없이 들어가 있어서 묵직하고 너무 맛있어요. 우유식빵은 결대로 부드럽게 찢어져서 잼 없이 그냥 먹어도 정말 고소하네요. 아이들 간식으로 매주 구매하고 있습니다.&rdquo;
            </p>
            <span className="review-author">- 신수동 주민 이*영 고객님 실제 리뷰 -</span>
          </div>
        </div>
      </section>

      <style>{`
        .home-page-content {
          overflow-x: hidden;
        }

        /* Hero CSS */
        .hero-section {
          padding: 100px 0 80px;
          background: linear-gradient(180deg, rgba(212, 140, 69, 0.03) 0%, rgba(250, 247, 242, 1) 100%);
          position: relative;
        }

        .hero-inner {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-badge {
          display: inline-block;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--bakery-primary);
          background-color: var(--bakery-secondary);
          border: 1px solid var(--bakery-secondary-border);
          padding: 6px 16px;
          border-radius: 30px;
          margin-bottom: 24px;
        }

        .hero-headline {
          font-size: 54px;
          line-height: 1.25;
          margin-bottom: 24px;
          color: var(--bakery-text);
          letter-spacing: -1.5px;
        }

        .hero-headline .highlight {
          color: var(--bakery-primary);
          position: relative;
          z-index: 1;
        }

        .hero-headline .highlight::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 4px;
          width: 100%;
          height: 12px;
          background-color: rgba(253, 241, 219, 0.9);
          z-index: -1;
          border-radius: 4px;
        }

        .hero-subline {
          font-size: 17px;
          line-height: 1.8;
          color: var(--bakery-text-muted);
          margin-bottom: 40px;
          max-width: 540px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visual-card {
          background-color: var(--bakery-card-bg);
          border: 1px solid var(--bakery-border);
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 30px 60px rgba(78, 61, 48, 0.08);
          z-index: 2;
          width: 320px;
          text-align: center;
          position: relative;
        }

        .visual-bread-graphic {
          background-color: var(--bakery-secondary);
          border-radius: 20px;
          padding: 40px 0;
          margin-bottom: 20px;
          border: 1px dashed var(--bakery-secondary-border);
        }

        .bread-svg {
          width: 120px;
          height: 120px;
          margin: 0 auto;
        }

        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .visual-card-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-info-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--bakery-text);
        }

        .card-info-status {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--bakery-primary);
        }

        .visual-circle-bg {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(214, 140, 69, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
          z-index: 1;
          border-radius: 50%;
        }

        /* Philosophy CSS */
        .section-header-center {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-subtitle {
          display: block;
          font-size: 13px;
          font-weight: 800;
          color: var(--bakery-primary);
          letter-spacing: 2px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .section-title {
          font-size: 34px;
          color: var(--bakery-text);
          margin: 0 0 16px;
        }

        .title-divider {
          width: 60px;
          height: 3px;
          background-color: var(--bakery-primary);
          margin: 0 auto;
          border-radius: 2px;
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .philosophy-card {
          padding: 40px 30px;
          text-align: center;
        }

        .philosophy-icon {
          font-size: 40px;
          margin-bottom: 24px;
          display: inline-block;
          width: 80px;
          height: 80px;
          line-height: 80px;
          border-radius: 50%;
          background-color: var(--bakery-secondary);
        }

        .philosophy-card h3 {
          font-size: 20px;
          margin-bottom: 16px;
        }

        .philosophy-card p {
          font-size: 14.5px;
          color: var(--bakery-text-muted);
          line-height: 1.6;
          margin: 0;
        }

        /* Signature CSS */
        .signature-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
        }

        .signature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .signature-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .sig-image-placeholder {
          height: 200px;
          background-color: var(--bakery-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-bottom: 1px solid var(--bakery-border);
        }

        .sig-emoji {
          font-size: 80px;
        }

        .sig-badge {
          position: absolute;
          top: 16px;
          left: 16px;
        }

        .sig-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .sig-tag {
          font-size: 12px;
          font-weight: 700;
          color: var(--bakery-primary);
          margin-bottom: 8px;
        }

        .sig-title {
          font-size: 20px;
          margin-bottom: 12px;
        }

        .sig-desc {
          font-size: 14px;
          color: var(--bakery-text-muted);
          line-height: 1.5;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .sig-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px dashed var(--bakery-border);
          padding-top: 16px;
        }

        .sig-price {
          font-size: 18px;
          font-weight: 700;
          color: var(--bakery-text);
        }

        .sig-btn {
          background: none;
          border: none;
          color: var(--bakery-primary);
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: var(--bakery-transition);
        }

        .sig-btn:hover {
          color: var(--bakery-primary-hover);
          transform: translateX(3px);
        }

        /* Review CSS */
        .review-banner {
          padding: 60px 40px;
          text-align: center;
          background-color: var(--bakery-secondary);
          border: 1px solid var(--bakery-secondary-border);
        }

        .review-banner h2 {
          font-size: 28px;
          color: var(--bakery-primary);
          margin-bottom: 20px;
        }

        .review-banner p {
          font-size: 17px;
          line-height: 1.8;
          color: var(--bakery-text);
          max-width: 780px;
          margin: 0 auto 20px;
        }

        .review-author {
          font-size: 14px;
          font-weight: 700;
          color: var(--bakery-text-muted);
        }

        @media (max-width: 1024px) {
          .hero-headline {
            font-size: 40px;
          }
          .philosophy-grid, .signature-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          .hero-subline {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-buttons {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
