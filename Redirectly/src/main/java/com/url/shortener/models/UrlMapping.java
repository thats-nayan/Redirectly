package com.url.shortener.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class UrlMapping{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String originalUrl;
    private String shortUrl;
    private int clickCount = 0;
    private LocalDateTime createdAt;

    public UrlMapping(String originalUrl, String shortUrl, int clickCount, LocalDateTime createdAt, User user) {
        this.originalUrl = originalUrl;
        this.shortUrl = shortUrl;
        this.clickCount = clickCount;
        this.createdAt = createdAt;
        this.user = user;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    // Specified foreign key link to user table
    private User user;

    @OneToMany(mappedBy = "urlMapping")
    private List<ClickEvent> clickEvents;
}
