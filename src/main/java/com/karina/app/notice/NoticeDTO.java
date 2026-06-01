package com.karina.app.notice;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "notices")
@ToString
@EntityListeners(AuditingEntityListener.class)
public class NoticeDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createAt;

    @Column
    private String author;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    private String title;

}
