package com.karina.app.notice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    public List<NoticeDTO> getList() {
        return noticeRepository.findAll();
    }

    public NoticeDTO getDetail(Long id){
        return noticeRepository.findById(id).orElse(null);
    }

    public NoticeDTO write(NoticeDTO noticeDTO) {
//        if (noticeDTO.getCreateAt() == null) {
//            noticeDTO.setCreateAt(LocalDateTime.now());
//        }
        if (noticeDTO.getAuthor() == null || noticeDTO.getAuthor().trim().isEmpty()) {
            noticeDTO.setAuthor("관리자");
        }
        return noticeRepository.save(noticeDTO);
    }
}
