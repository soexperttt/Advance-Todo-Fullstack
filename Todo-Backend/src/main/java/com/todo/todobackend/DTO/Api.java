package com.todo.todobackend.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Api {
    private String message;
    private Integer status;
}
