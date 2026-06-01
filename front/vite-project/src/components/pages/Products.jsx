import React, { useState } from "react";

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productList = [
    {
      id: 1,
      name: "프리미엄 생(生) 우유식빵",
      category: "signature",
      price: "5,500원",
      emoji: "🍞",
      tag: "BEST",
      shortDesc: "100% 국산 유기농 우유로 결을 살려낸 고품격 우유식빵",
      longDesc: "물은 단 한 방울도 들어가지 않고 오직 국산 1등급 유기농 우유와 천연 버터로 반죽했습니다. 손으로 결대로 찢어 드실 때 가장 고소하며, 잼을 바르지 않고 그냥 드셔도 담백함과 촉촉함이 오랫동안 유지됩니다.",
      ingredients: "국산 유기농 밀가루, 국산 1등급 우유, 프랑스 엘르앤비르 버터, 천일염",
      allergen: "밀, 우유 함유",
      tip: "구매 후 첫날은 상온에서 찢어 드시고, 남은 식빵은 지퍼백에 넣어 냉동 보관하신 후 180도 오븐에 3분간 데워 드세요.",
    },
    {
      id: 2,
      name: "공주 알밤 식빵",
      category: "sweet",
      price: "6,500원",
      emoji: "🌰",
      tag: "POPULAR",
      shortDesc: "당도 높은 공주 알밤과 수제 소보로가 듬뿍 올라간 식빵",
      longDesc: "충남 공주에서 공수한 달콤하고 묵직한 알밤을 빵 결 마다 가득 채워 넣었습니다. 겉에는 바삭하고 달콤한 아몬드 소보로 토핑을 올려 겉은 바삭하고 속은 부드러운 극상의 조화를 경험하실 수 있습니다.",
      ingredients: "국산 유기농 밀가루, 공주 알밤, 천연 버터, 아몬드 슬라이스",
      allergen: "밀, 우유, 계란, 견과류 함유",
      tip: "에어프라이어에 160도에서 4분간 구워 드시면 겉의 소보로가 바삭하게 되살아납니다.",
    },
    {
      id: 3,
      name: "트리플 치즈 식빵",
      category: "savory",
      price: "6,000원",
      emoji: "🧀",
      tag: "NEW",
      shortDesc: "롤치즈, 체다치즈, 모짜렐라의 깊은 치즈 풍미",
      longDesc: "짭조름하고 고소한 치즈 애호가들을 위한 식빵입니다. 롤치즈, 체다치즈, 모짜렐라 치즈가 반죽에 아낌없이 박혀 있어 씹을 때마다 톡톡 터지는 고소함과 짭조름한 풍미가 훌륭합니다.",
      ingredients: "국산 유기농 밀가루, 네덜란드 체다치즈, 모짜렐라, 천연 발효종",
      allergen: "밀, 우유 함유",
      tip: "두툼하게 썰어 전자레인지에 20초 정도 데워 드시면 치즈가 부드럽게 늘어나 최상의 풍미를 냅니다.",
    },
    {
      id: 4,
      name: "오징어 먹물 치즈 식빵",
      category: "savory",
      price: "6,200원",
      emoji: "🖤",
      tag: "UNIQUE",
      shortDesc: "오징어 먹물 반죽에 에멘탈 치즈를 듬뿍 넣은 건강 식빵",
      longDesc: "천연 오징어 먹물로 반죽하여 쫄깃하고 담백한 검은 식빵 속에 노란 에멘탈 치즈와 롤치즈가 가득 차 있습니다. 먹물의 감칠맛과 치즈의 풍미가 만나 와인 안주나 브런치용으로 제격입니다.",
      ingredients: "국산 유기농 밀가루, 천연 오징어 먹물, 프랑스 에멘탈 치즈, 롤치즈",
      allergen: "밀, 우유, 오징어 함유",
      tip: "올리브 오일과 발사믹 식초에 살짝 찍어 드시면 고급 레스토랑 식전 빵 못지않은 깊은 풍미를 즐길 수 있습니다.",
    },
    {
      id: 5,
      name: "벨기에 리얼 초코 식빵",
      category: "sweet",
      price: "6,000원",
      emoji: "🍫",
      tag: "KIDS",
      shortDesc: "벨기에산 다크 초콜릿 칩이 부드럽게 녹아드는 단맛",
      longDesc: "인공 초콜릿 시럽이 아닌 카카오 함량 58%의 벨기에산 고급 다크 초콜릿 칩을 반죽에 듬뿍 섞어 구웠습니다. 지나치게 달지 않으면서도 다크 초콜릿 특유의 쌉싸름하고 깊은 달콤함을 느낄 수 있습니다.",
      ingredients: "국산 유기농 밀가루, 벨기에산 다크 초콜릿 칩, 천연 버터, 코코아 파우더",
      allergen: "밀, 우유, 대두 함유",
      tip: "따뜻한 아메리카노 혹은 차가운 우유와 함께 곁들이시면 단맛의 조화가 무척 훌륭합니다.",
    },
    {
      id: 6,
      name: "무화과 크랜베리 식빵",
      category: "healthy",
      price: "6,300원",
      emoji: "🍇",
      tag: "HEALTHY",
      shortDesc: "달콤한 무화과와 새콤한 크랜베리가 박힌 웰빙 식빵",
      longDesc: "레드 와인에 조려내어 깊은 달콤함을 머금은 유기농 반건조 무화과와 상큼한 크랜베리를 가득 넣은 건강 지향 식빵입니다. 통밀가루를 섞어 반죽하여 구수한 호밀향과 씹는 재미가 탁월합니다.",
      ingredients: "국산 유기농 밀가루, 유기농 호밀가루, 레드와인 조림 무화과, 건크랜베리",
      allergen: "밀 함유 (비건 프렌들리)",
      tip: "가볍게 토스트한 뒤 크림치즈를 얇게 펴 발라 드시면 훌륭한 오픈 샌드위치가 완성됩니다.",
    },
  ];

  const categories = [
    { id: "all", label: "전체 제품" },
    { id: "signature", label: "시그니처" },
    { id: "sweet", label: "달콤한 식빵" },
    { id: "savory", label: "고소/짭조름" },
    { id: "healthy", label: "건강/웰빙" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all"
    ? productList
    : productList.filter((p) => p.category === activeCategory);

  return (
    <div className="bakery-container section-padding">
      {/* 타이틀 헤더 */}
      <div className="section-header-center">
        <span className="section-subtitle">MENU BOARD</span>
        <h2 className="section-title font-serif">하루식빵 제품 라인업</h2>
        <p style={{ color: "var(--bakery-text-muted)", marginTop: "8px" }}>
          매일 새벽부터 직접 반죽하여 한정 수량만 정성껏 굽습니다.
        </p>
        <div className="title-divider" style={{ marginTop: "16px" }}></div>
      </div>

      {/* 카테고리 필터 버튼 탭 */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 상품 카드 그리드 */}
      <div className="product-grid">
        {filteredProducts.map((prod) => (
          <div key={prod.id} className="bakery-card product-card">
            <div className="product-visual">
              <span className="product-emoji">{prod.emoji}</span>
              <span className="bakery-badge bakery-badge-primary product-badge">
                {prod.tag}
              </span>
            </div>
            <div className="product-body">
              <h3 className="product-name">{prod.name}</h3>
              <p className="product-short-desc">{prod.shortDesc}</p>
              <div className="product-footer">
                <span className="product-price">{prod.price}</span>
                <button
                  className="bakery-btn bakery-btn-secondary product-btn"
                  onClick={() => setSelectedProduct(prod)}
                >
                  상세 정보
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 팝업 모달창 (상세 정보 보기) */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="닫기">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            <div className="modal-grid">
              <div className="modal-visual">
                <span className="modal-emoji">{selectedProduct.emoji}</span>
                <span className="bakery-badge bakery-badge-primary modal-badge">{selectedProduct.tag}</span>
              </div>
              
              <div className="modal-info">
                <h3 className="modal-title font-serif">{selectedProduct.name}</h3>
                <span className="modal-price">{selectedProduct.price}</span>
                
                <div className="modal-divider-thin"></div>
                
                <h4 className="info-section-title">제품 스토리</h4>
                <p className="modal-description">{selectedProduct.longDesc}</p>
                
                <h4 className="info-section-title">원재료명 및 함량</h4>
                <p className="modal-ingredients">{selectedProduct.ingredients}</p>
                
                <h4 className="info-section-title">알레르기 안내</h4>
                <p className="modal-allergen">{selectedProduct.allergen}</p>
                
                <div className="modal-tip-box">
                  <h5>👨‍🍳 파티시에의 맛있게 먹는 Tip</h5>
                  <p>{selectedProduct.tip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* 카테고리 탭 CSS */
        .category-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .category-btn {
          background-color: var(--bakery-card-bg);
          border: 1px solid var(--bakery-border);
          color: var(--bakery-text);
          padding: 10px 24px;
          border-radius: 30px;
          font-size: 14.5px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--bakery-transition);
        }

        .category-btn:hover {
          background-color: rgba(212, 140, 69, 0.05);
          border-color: var(--bakery-primary);
          color: var(--bakery-primary);
        }

        .category-btn.active {
          background-color: var(--bakery-primary);
          color: #FFFFFF;
          border-color: var(--bakery-primary);
          box-shadow: 0 4px 12px rgba(212, 140, 69, 0.2);
        }

        /* 상품 그리드 */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .product-visual {
          height: 220px;
          background-color: var(--bakery-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-bottom: 1px solid var(--bakery-border);
          transition: var(--bakery-transition);
        }

        .product-card:hover .product-visual {
          background-color: #FFF0D1;
        }

        .product-emoji {
          font-size: 90px;
          transition: var(--bakery-transition);
        }

        .product-card:hover .product-emoji {
          transform: scale(1.1) rotate(5deg);
        }

        .product-badge {
          position: absolute;
          top: 16px;
          left: 16px;
        }

        .product-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-name {
          font-size: 19px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--bakery-text);
        }

        .product-short-desc {
          font-size: 13.5px;
          color: var(--bakery-text-muted);
          line-height: 1.5;
          margin: 0 0 20px;
          flex-grow: 1;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px dashed var(--bakery-border);
          padding-top: 16px;
        }

        .product-price {
          font-size: 18px;
          font-weight: 700;
          color: var(--bakery-text);
        }

        .product-btn {
          padding: 8px 16px;
          font-size: 13px;
        }

        /* 팝업 모달창 CSS */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(62, 39, 35, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: modalFadeIn 0.3s ease-out;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background-color: var(--bakery-card-bg);
          border: 1px solid var(--bakery-border);
          border-radius: 24px;
          max-width: 800px;
          width: 90%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
          animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: var(--bakery-bg);
          border: 1px solid var(--bakery-border);
          color: var(--bakery-text-muted);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--bakery-transition);
          z-index: 10;
        }

        .modal-close:hover {
          color: var(--bakery-accent);
          border-color: #FFCDCD;
          background-color: #FFEAEA;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
        }

        .modal-visual {
          background-color: var(--bakery-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 360px;
          position: relative;
          border-right: 1px solid var(--bakery-border);
        }

        .modal-emoji {
          font-size: 140px;
        }

        .modal-badge {
          position: absolute;
          top: 24px;
          left: 24px;
        }

        .modal-info {
          padding: 40px;
          text-align: left;
        }

        .modal-title {
          font-size: 28px;
          margin-bottom: 8px;
          color: var(--bakery-text);
        }

        .modal-price {
          font-size: 22px;
          font-weight: 700;
          color: var(--bakery-primary);
        }

        .modal-divider-thin {
          height: 1px;
          background-color: var(--bakery-border);
          margin: 20px 0;
        }

        .info-section-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--bakery-primary);
          margin: 16px 0 6px;
          text-transform: uppercase;
        }

        .modal-description {
          font-size: 15px;
          line-height: 1.6;
          color: var(--bakery-text);
          margin: 0;
        }

        .modal-ingredients, .modal-allergen {
          font-size: 14px;
          color: var(--bakery-text-muted);
          margin: 0;
        }

        .modal-allergen {
          color: var(--bakery-accent);
          font-weight: 500;
        }

        .modal-tip-box {
          background-color: var(--bakery-secondary);
          border: 1px solid var(--bakery-secondary-border);
          border-radius: 12px;
          padding: 16px 20px;
          margin-top: 24px;
        }

        .modal-tip-box h5 {
          font-size: 14px;
          margin: 0 0 6px;
          color: var(--bakery-text);
        }

        .modal-tip-box p {
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--bakery-text-muted);
          margin: 0;
        }

        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .modal-grid {
            grid-template-columns: 1fr;
          }
          .modal-visual {
            min-height: 200px;
            height: 200px;
            border-right: none;
            border-bottom: 1px solid var(--bakery-border);
          }
          .modal-emoji {
            font-size: 80px;
          }
          .modal-info {
            padding: 24px;
          }
        }

        @media (max-width: 600px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Products;
