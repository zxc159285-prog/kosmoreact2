package com.karina.app.notice;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notice/**")
@AllArgsConstructor //오토와이어드 안해도됨
@CrossOrigin(origins = "*")
@Slf4j
public class NoticeController {

    private NoticeService noticeService;

    @GetMapping
    public List<NoticeDTO> list() throws Exception {
        System.out.println("main branch");
        return noticeService.getList();
    }

    @GetMapping("detail/{id}")
    public NoticeDTO detail(@PathVariable(name = "id") Long id)throws  Exception{
        return noticeService.getDetail(id);
    }

    @PostMapping("write")
    public NoticeDTO write(@RequestBody NoticeDTO noticeDTO) throws Exception {

     return noticeService.write(noticeDTO);
    }
}
