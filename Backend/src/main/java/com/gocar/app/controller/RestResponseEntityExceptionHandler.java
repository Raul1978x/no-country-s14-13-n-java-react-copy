package com.gocar.app.controller;

import com.gocar.app.dtos.exception.ErrorResponseDto;
import com.gocar.app.exceptions.AgencyNotFoundException;
import com.gocar.app.exceptions.EmailOrPasswordIncorrectException;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.service.spi.ServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
public class RestResponseEntityExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handlerMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        var errors = ex.getFieldErrors().stream().map(ErrorResponseDto::new).toList();
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(EmailOrPasswordIncorrectException.class)
    public ResponseEntity<Object> handlerResourceNotFoundException(EmailOrPasswordIncorrectException ex) {
        return new ResponseEntity<>(new ErrorResponseDto("Email or password", ex.getMessage()),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handlerEntityNotFoundException(EntityNotFoundException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AgencyNotFoundException.class)
    public ResponseEntity<Object> handlerAgencyNotFoundException(AgencyNotFoundException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<Object> handlerServiceException(ServiceException e){
        return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<Object> SQLIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException ex, WebRequest request) {
        String originalMsg = ex.getMessage();
        String duplicateValue = ObtainDuplicateValue(originalMsg);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(duplicateValue + " is not available");
    }

    private String ObtainDuplicateValue(String msg) {
        String begin = "Duplicate entry '";
        String end = "' for key";
        int indexStart = msg.indexOf(begin) + begin.length();
        int indexEnd = msg.indexOf(end, indexStart);
        return msg.substring(indexStart, indexEnd);
    }


}
