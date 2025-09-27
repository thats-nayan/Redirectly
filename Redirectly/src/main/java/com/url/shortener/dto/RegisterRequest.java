package com.url.shortener.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.Set;

@Data
public class RegisterRequest {

    @NotBlank(message = "Username cannot be empty")
    @Pattern( regexp = "^[a-zA-Z0-9_]{3,20}$", message = "Username must be 3–20 characters, only letters, numbers, and underscores" )
    private String username;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    private String email;

    private Set<String> role;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 8, max = 64, message = "Password must be between 8 and 64 characters")
    @Pattern( regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,64}$", message = "Password must contain atleast one uppercase, lowercase, digit, and special character" )
    private String password;
}
