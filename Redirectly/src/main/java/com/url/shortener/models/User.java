package com.url.shortener.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String username;
    private String password;
    private String role;

    public User(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = "ROLE_USER";
    }
}
