package com.url.shortener.exceptions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
// Handles all exceptions globally for the application
public class MyGlobalExceptionHandler {

    // Validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
     public ResponseEntity<Map<String,String>> methodArgumentNotValidException(MethodArgumentNotValidException e){
         Map<String,String> response = new HashMap<>();

         // Extracting field errors and adding them to the response map
         e.getBindingResult().getFieldErrors().forEach(error -> {
             String fieldName = error.getField();
             String message = error.getDefaultMessage();
             response.put(fieldName,message);
         });

         return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
     }

     // Resource not found errors
     @ExceptionHandler(ResourceNotFoundException.class)
     public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException e){
        String message = e.getMessage();
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
     }

     // User already exists errors
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException e){
        String message = e.getMessage();
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    // Incorrect credentials errors
    @ExceptionHandler(IncorrectCredentialException.class)
    public ResponseEntity<String> handleIncorrectCredentialException(IncorrectCredentialException e){
        String message = e.getMessage();
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
}
