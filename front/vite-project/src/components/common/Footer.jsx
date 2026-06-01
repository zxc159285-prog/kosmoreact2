import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bakery-footer">
      <div className="bakery-container footer-grid">
        {/* 매장 아이덴티티 및 소개 */}
        <div className="footer-section brand-info">
          <Link to="/" className="footer-logo" style={{ textDecoration: "none" }}>
            <span className="footer-logo-text font-serif">하루식빵</span>
            <span className="footer-logo-sub">HARU BREAD</span>
          </Link>
          <p className="brand-description">
            매일 아침 유기농 밀가루와 천연 천일염, 천연 효모를 넣어 24시간 저온 숙성하여 굽는 건강한 수제 식빵 전문점입니다. 매일 먹어도 질리지 않는 담백하고 쫄깃한 식빵을 선사합니다.
          </p>
          <div className="social-links">
            <a href="#instagram" className="social-icon" aria-label="인스타그램">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
              </svg>
            </a>
            <a href="#facebook" className="social-icon" aria-label="페이스북">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#kakao" className="social-icon" aria-label="카카오톡">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 퀵 링크 */}
        <div className="footer-section footer-links">
          <h4 className="footer-title">빠른 이동</h4>
          <ul>
            <li><Link to="/">메인 홈</Link></li>
            <li><Link to="/products">식빵 라인업</Link></li>
            <li><Link to="/notice">공지사항</Link></li>
            <li><Link to="/qna">Q&A 문의</Link></li>
            {/* 오연결 주소였던 /member를 쪼개진 회원가입 정식 경로인 /join으로 수정 */}
            <li><Link to="/join">회원가입</Link></li>
          </ul>
        </div>

        {/* 운영 시간 및 위치 정보 */}
        <div className="footer-section footer-contact">
          <h4 className="footer-title">매장 안내</h4>
          <p className="contact-item">
            <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            서울특별시 마포구 백범로 23 (신수동)
          </p>
          <p className="contact-item">
            <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            전화: 02-1234-5678
          </p>
          <p className="contact-item">
            <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            오픈: 매일 09:00 ~ 소진 시 조기 마감
          </p>
          <div className="sold-out-badge">
            🍞 당일 생산 / 당일 판매 원칙
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="bakery-container bottom-inner">
          <p className="copyright">
            &copy; {new Date().getFullYear()} 하루식빵. All rights reserved. Designed for Shokupan Lovers.
          </p>
          <div className="bottom-links">
            <a href="#privacy">개인정보처리방침</a>
            <a href="#terms">이용약관</a>
          </div>
        </div>
      </div>

      <style>{`
        .bakery-footer {
          background-color: var(--bakery-dark-accent);
          color: #E2D7CF;
          padding: 80px 0 0;
          border-top: 1px solid rgba(239, 228, 214, 0.1);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 60px;
          padding-bottom: 60px;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          margin-bottom: 24px;
        }

        .footer-logo-text {
          font-size: 26px;
          font-weight: 900;
          color: #FFFFFF;
          letter-spacing: -0.5px;
        }

        .footer-logo-sub {
          font-size: 11px;
          font-weight: 700;
          background-color: var(--bakery-primary);
          color: #FFFFFF;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .brand-description {
          font-size: 14px;
          line-height: 1.7;
          color: #B2A297;
          margin: 0 0 24px;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: rgba(255, 255, 255, 0.05);
          color: #FFFFFF;
          border-radius: 50%;
          transition: var(--bakery-transition);
        }

        .social-icon:hover {
          background-color: var(--bakery-primary);
          color: #FFFFFF;
          transform: translateY(-3px);
        }

        .footer-title {
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 30px;
          height: 2px;
          background-color: var(--bakery-primary);
        }

        .footer-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          text-decoration: none;
          color: #B2A297;
          font-size: 15px;
          cursor: pointer;
          padding: 0;
          text-align: left;
          transition: var(--bakery-transition);
        }

        .footer-links a:hover {
          color: var(--bakery-primary);
          padding-left: 6px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: #B2A297;
          margin: 0 0 16px;
          line-height: 1.5;
        }

        .contact-icon {
          width: 18px;
          height: 18px;
          color: var(--bakery-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .sold-out-badge {
          display: inline-block;
          margin-top: 12px;
          background-color: rgba(212, 140, 69, 0.15);
          color: var(--bakery-primary);
          border: 1px solid rgba(212, 140, 69, 0.3);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          text-align: center;
        }

        .footer-bottom {
          margin-top: 60px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px 0;
        }

        .bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #8E7A6E;
        }

        .bottom-links {
          display: flex;
          gap: 20px;
        }

        .bottom-links a {
          color: #8E7A6E;
          text-decoration: none;
          transition: var(--bakery-transition);
        }

        .bottom-links a:hover {
          color: #FFFFFF;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .bottom-inner {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
