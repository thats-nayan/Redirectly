package com.url.shortener.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class IncorrectCredentialException extends RuntimeException{
    public IncorrectCredentialException(String message) {
        super(message);
    }
}
