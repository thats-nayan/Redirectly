package com.url.shortener.exceptions;

import lombok.NoArgsConstructor;


@NoArgsConstructor
public class UserAlreadyExistsException extends RuntimeException {
    String field;
    String fieldValue;

    public UserAlreadyExistsException(String field, String fieldValue) {
        super(buildMessage(field, fieldValue));
        this.field = field;
        this.fieldValue = fieldValue;
    }
    private static String buildMessage(String field, String fieldValue) {
        if ("username".equalsIgnoreCase(field)) {
            return String.format("Username '%s' already taken, try something else.", fieldValue);
        } else if ("email".equalsIgnoreCase(field)) {
            return String.format("Email '%s' already registered, login if you have an account.", fieldValue);
        }
        return String.format("%s already exists: %s", field, fieldValue);
    }
}
