import React, { useState } from "react";

function Qna() {
  // 샘플 FAQ 리스트
  const faqList = [
    {
      id: 1,
      question: "단체 주문이나 예약은 최소 며칠 전에 해야 하나요?",
      answer: "하루식빵은 매일 한정된 양만 굽기 때문에, 단체 주문(10개 이상) 및 특별 예약은 최소 2~3일 전에 연락해 주셔야 일정 조율이 가능합니다. Q&A에 성함과 연락처, 필요한 수량을 기재해 주시거나 매장(02-1234-5678)으로 전화 주시면 친절히 안내해 드리겠습니다.",
    },
    {
      id: 2,
      question: "보관은 어떻게 해야 가장 신선하게 먹을 수 있나요?",
      answer: "하루식빵은 방부제를 일절 넣지 않아 당일 구매하신 후 바로 드시는 것이 가장 맛있습니다. 상온에서는 최대 2일까지 보관 가능하며, 장기 보관을 원하실 경우 결대로 썰어 지퍼백에 밀봉한 후 반드시 '냉동 보관'해 주세요. 드실 때 실온에서 자연 해동하거나 에어프라이어(160도 4분)에 구우면 갓 구운 맛이 납니다. (냉장 보관은 수분을 빼앗아가므로 피해야 합니다.)",
    },
    {
      id: 3,
      question: "비건(채식) 고객이 먹을 수 있는 식빵도 있나요?",
      answer: "네, 있습니다! 저희 '무화과 크랜베리 식빵'은 우유, 버터, 달걀 등 동물성 원료를 완전히 배제하고 100% 식물성 재료와 유기농 호밀가루로만 반죽하여 구워내므로 채식주의자 분들도 안심하고 맛있게 드실 수 있는 웰빙 식빵입니다.",
    },
  ];

  // 가상의 질문 리스트 상태 관리
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      category: "단체주문",
      title: "다음 주 어린이집 생일 파티용 미니식빵 20개 예약 문의합니다.",
      author: "김*진",
      date: "2026.05.28",
      content: "다음 주 수요일 오전 10시까지 수령 가능할까요? 미니 우유식빵 10개와 초코식빵 10개로 주문하고 싶습니다. 답변 부탁드립니다!",
      answer: "안녕하세요, 하루식빵입니다! 문의하신 수요일 단체 주문 가능합니다. 당일 아침에 정성껏 구워 10시까지 따뜻하게 준비해 두겠습니다. 상세 예약 확인 및 결제를 위해 기재해주신 번호로 금일 연락드리겠습니다. 감사합니다!",
      status: "답변완료",
    },
    {
      id: 2,
      category: "배송문의",
      title: "혹시 지방 택배 배송도 지원하시나요?",
      author: "박*아",
      date: "2026.05.27",
      content: "대전 지역인데 우유식빵이랑 알밤식빵이 너무 먹고 싶어요. 배송이 가능한가요?",
      answer: null,
      status: "답변대기",
    },
  ]);

  // 입력 폼 상태 관리
  const [category, setCategory] = useState("일반문의");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // 성공 팝업/얼럿 상태 관리
  const [isSuccess, setIsSuccess] = useState(false);
  const [expandedFaqId, setExpandedFaqId] = useState(null);
  const [expandedInquiryId, setExpandedInquiryId] = useState(null);

  // FAQ 아코디언 토글
  const handleFaqToggle = (id) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  // 질문 아코디언 토글
  const handleInquiryToggle = (id) => {
    setExpandedInquiryId(expandedInquiryId === id ? null : id);
  };

  // 질문 등록 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !title || !content) {
      alert("모든 필드를 작성해 주세요.");
      return;
    }

    const newInquiry = {
      id: inquiries.length + 1,
      category,
      title,
      author: author.charAt(0) + "*" + (author.length > 2 ? author.charAt(author.length - 1) : ""),
      date: new Date().toLocaleDateString("ko-KR").slice(0, -1),
      content,
      answer: null,
      status: "답변대기",
    };

    setInquiries([newInquiry, ...inquiries]);
    setIsSuccess(true);
    
    // 입력 필드 초기화
    setAuthor("");
    setTitle("");
    setContent("");

    // 3초 후 성공 배지 닫기
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div className="bakery-container section-padding">
      {/* 1. 타이틀 헤더 */}
      <div className="section-header-center">
        <span className="section-subtitle">Q&A BOARD</span>
        <h2 className="section-title font-serif">자주 묻는 질문 & 문의 게시판</h2>
        <p style={{ color: "var(--bakery-text-muted)", marginTop: "8px" }}>
          하루식빵에 대해 궁금하신 점을 남겨주시면 소중히 답변해 드리겠습니다.
        </p>
        <div className="title-divider" style={{ marginTop: "16px" }}></div>
      </div>

      <div className="qna-layout-grid">
        {/* 왼쪽 섹션: FAQ & 문의 게시판 */}
        <div className="qna-main-column">
          {/* FAQ 영역 */}
          <div className="faq-section">
            <h3 className="section-sub-heading font-serif">자주 묻는 질문 (FAQ)</h3>
            <div className="faq-list">
              {faqList.map((faq) => {
                const isOpen = expandedFaqId === faq.id;
                return (
                  <div key={faq.id} className={`faq-item bakery-card ${isOpen ? "open" : ""}`}>
                    <div className="faq-question" onClick={() => handleFaqToggle(faq.id)}>
                      <span className="faq-q-badge">Q</span>
                      <span className="faq-q-text">{faq.question}</span>
                      <span className="faq-arrow-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points={isOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                        </svg>
                      </span>
                    </div>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1:1 문의글 목록 영역 */}
          <div className="inquiry-section">
            <h3 className="section-sub-heading font-serif">고객 1:1 문의글 목록</h3>
            <div className="inquiry-list">
              {inquiries.map((inq) => {
                const isOpen = expandedInquiryId === inq.id;
                return (
                  <div key={inq.id} className={`inq-item bakery-card ${isOpen ? "open" : ""}`}>
                    <div className="inq-header" onClick={() => handleInquiryToggle(inq.id)}>
                      <div className="inq-header-left">
                        <span className={`bakery-badge ${inq.status === "답변완료" ? "bakery-badge-primary" : "bakery-badge-accent"}`}>
                          {inq.status}
                        </span>
                        <span className="inq-cat-tag">[{inq.category}]</span>
                        <span className="inq-title">{inq.title}</span>
                      </div>
                      <div className="inq-header-right">
                        <span className="inq-author">{inq.author}</span>
                        <span className="inq-date">{inq.date}</span>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="inq-content-box">
                        <div className="user-question-body">
                          <h5>🙋‍♂️ 질문 내용</h5>
                          <p>{inq.content}</p>
                        </div>
                        {inq.answer ? (
                          <div className="admin-answer-body">
                            <h5>🍞 하루식빵의 답변</h5>
                            <p>{inq.answer}</p>
                          </div>
                        ) : (
                          <div className="admin-pending-body">
                            <p>⏳ 파티시에가 열심히 도우를 굽고 있습니다. 확인하는 대로 즉시 소중한 답변을 남겨 드리겠습니다!</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 오른쪽 섹션: 질문 작성 폼 카드 */}
        <div className="qna-form-column">
          <div className="bakery-card qna-form-card">
            <h3 className="form-card-title font-serif">질문 남기기</h3>
            <p className="form-card-desc">단체 주문 예약, 제품 관련 건의 등 궁금하신 점을 작성해 주세요.</p>
            
            {isSuccess && (
              <div className="form-success-banner animate-fade-in">
                ✨ 질문이 성공적으로 등록되었습니다.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="bakery-input-group">
                <label className="bakery-label">문의 카테고리</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bakery-input"
                  style={{ appearance: "auto" }}
                >
                  <option value="단체주문">🍞 단체주문/예약</option>
                  <option value="배송문의">🚚 배송문의</option>
                  <option value="제품문의">🌾 제품/영양성분문의</option>
                  <option value="기타문의">💬 기타문의</option>
                </select>
              </div>

              <div className="bakery-input-group">
                <label className="bakery-label">작성자 성함</label>
                <input
                  type="text"
                  placeholder="예: 홍길동"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bakery-input"
                  required
                />
              </div>

              <div className="bakery-input-group">
                <label className="bakery-label">문의 제목</label>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bakery-input"
                  required
                />
              </div>

              <div className="bakery-input-group">
                <label className="bakery-label">문의 내용</label>
                <textarea
                  rows="5"
                  placeholder="문의하실 내용을 자유롭게 작성해 주세요. (개인정보 노출에 주의해 주세요)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bakery-input"
                  style={{ resize: "vertical" }}
                  required
                ></textarea>
              </div>

              <button type="submit" className="bakery-btn bakery-btn-primary" style={{ width: "100%", marginTop: "10px" }}>
                질문 접수하기
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .qna-layout-grid {
          display: grid;
          grid-template-columns: 1.8fr 1.2fr;
          gap: 40px;
          align-items: start;
        }

        .section-sub-heading {
          font-size: 22px;
          margin-bottom: 20px;
          border-left: 4px solid var(--bakery-primary);
          padding-left: 12px;
          color: var(--bakery-text);
        }

        .faq-section {
          margin-bottom: 50px;
        }

        /* FAQ CSS */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-item {
          padding: 0;
          overflow: hidden;
        }

        .faq-question {
          display: flex;
          align-items: center;
          padding: 18px 24px;
          cursor: pointer;
          user-select: none;
          background-color: var(--bakery-card-bg);
          transition: var(--bakery-transition);
        }

        .faq-question:hover {
          background-color: var(--bakery-secondary);
        }

        .faq-q-badge {
          font-size: 20px;
          font-weight: 900;
          color: var(--bakery-primary);
          margin-right: 16px;
        }

        .faq-q-text {
          font-weight: 700;
          font-size: 15.5px;
          color: var(--bakery-text);
          flex-grow: 1;
        }

        .faq-answer {
          padding: 20px 24px 24px 60px;
          background-color: #FCFAF7;
          border-top: 1px dashed var(--bakery-border);
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--bakery-text-muted);
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Inquiry List CSS */
        .inquiry-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .inq-item {
          padding: 0;
        }

        .inq-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          cursor: pointer;
          transition: var(--bakery-transition);
        }

        .inq-header:hover {
          background-color: rgba(212, 140, 69, 0.03);
        }

        .inq-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-grow: 1;
        }

        .inq-cat-tag {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--bakery-primary);
        }

        .inq-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--bakery-text);
        }

        .inq-header-right {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 13px;
          color: var(--bakery-text-muted);
          margin-left: 20px;
          flex-shrink: 0;
        }

        .inq-content-box {
          padding: 24px;
          background-color: #FCFAF7;
          border-top: 1px dashed var(--bakery-border);
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: slideIn 0.3s ease-out;
        }

        .user-question-body h5, .admin-answer-body h5 {
          font-size: 13.5px;
          font-weight: 800;
          color: var(--bakery-primary);
          margin: 0 0 8px;
        }

        .user-question-body p, .admin-answer-body p {
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--bakery-text);
          margin: 0;
          white-space: pre-wrap;
        }

        .admin-answer-body {
          background-color: var(--bakery-secondary);
          border: 1px solid var(--bakery-secondary-border);
          border-radius: 12px;
          padding: 16px 20px;
        }

        .admin-pending-body {
          color: var(--bakery-text-muted);
          font-size: 13.5px;
          background-color: var(--bakery-card-bg);
          border: 1px dashed var(--bakery-border);
          border-radius: 10px;
          padding: 12px 18px;
          margin: 0;
        }

        /* Qna Form CSS */
        .qna-form-card {
          padding: 30px;
          position: sticky;
          top: 100px;
        }

        .form-card-title {
          font-size: 22px;
          margin-bottom: 8px;
        }

        .form-card-desc {
          font-size: 13.5px;
          color: var(--bakery-text-muted);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .form-success-banner {
          background-color: #E2F5E9;
          color: #278A4E;
          border: 1px solid #BFEAD0;
          padding: 12px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
        }

        @media (max-width: 1024px) {
          .qna-layout-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .qna-form-card {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .inq-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .inq-header-right {
            margin-left: 0;
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}

export default Qna;
