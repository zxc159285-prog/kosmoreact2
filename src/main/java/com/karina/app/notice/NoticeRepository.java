package com.karina.app.notice;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<NoticeDTO,Long> {

}
