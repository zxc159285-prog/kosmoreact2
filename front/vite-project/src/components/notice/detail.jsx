import React, { useState, useEffect } from "react";
import "./detail.css";

function NoticeDetail({ id, onBack }) {
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("올바르지 않은 게시글 ID입니다.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`http://localhost:8080/notice/detail/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("서버와의 통신이 원활하지 않습니다.");
                }
                return res.text().then(text => text ? JSON.parse(text) : null); // null 응답 대비 안전 파싱
            })
            .then((data) => {
                console.log("공지사항 상세 데이터:", data);
                if (!data) {
                    // 데이터베이스에 없는 ID인 경우 null 반환됨
                    setNotice(null);
                } else {
                    setNotice(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("상세보기 데이터 조회 실패:", err);
                setError(err.message || "네트워크 에러가 발생했습니다.");
                setLoading(false);
            });
    }, [id]);

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });
        } catch (e) {
            return dateString;
        }
    };

    // 1. 로딩 중 화면
    if (loading) {
        return (
            <div className="notice-detail-container">
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div className="spinner" style={{ margin: "0 auto 16px" }}></div>
                    <p style={{ color: "var(--text)" }}>공지사항 내용을 불러오는 중입니다...</p>
                </div>
            </div>
        );
    }

    // 2. 에러가 발생했거나 데이터가 존재하지 않는 경우 (예외 방어)
    if (error || !notice) {
        return (
            <div className="notice-detail-container error-card">
                <span className="error-icon">🔍</span>
                <h3 className="error-title">게시글을 찾을 수 없습니다</h3>
                <p className="error-desc">
                    {error || "요청하신 공지사항이 삭제되었거나 존재하지 않는 게시글입니다."}
                </p>
                <button className="back-button" onClick={onBack}>
                    ← 목록으로 돌아가기
                </button>
            </div>
        );
    }

    // 3. 정상 데이터 출력 화면
    return (
        <div className="notice-detail-container">
            {/* 뒤로가기 버튼 */}
            <button className="back-button" onClick={onBack}>
                ← 목록으로 돌아가기
            </button>

            {/* 헤더 섹션 */}
            <div className="notice-detail-header">
                <h2 className="notice-detail-title">{notice.title}</h2>
                <div className="notice-detail-meta">
                    <span className="meta-item">
                        번호: <strong>{notice.id}</strong>
                    </span>
                    <span className="meta-divider">|</span>
                    <span className="meta-item">
                        작성자: <strong>{notice.author}</strong>
                    </span>
                    <span className="meta-divider">|</span>
                    <span className="meta-item">
                        작성일: <strong>{formatDate(notice.createAt)}</strong>
                    </span>
                </div>
            </div>

            {/* 본문 섹션 */}
            <div className="notice-detail-body">
                <pre className="notice-detail-content">
                    {notice.content || "상세 내용이 없습니다."}
                </pre>
            </div>
        </div>
    );
}

export default NoticeDetail;