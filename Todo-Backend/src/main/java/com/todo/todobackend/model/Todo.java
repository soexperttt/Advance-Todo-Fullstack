package com.todo.todobackend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Todo {

    @Id
    private String id = UUID.randomUUID().toString().toUpperCase();

    @NotNull(message = "Title is required")
    @Column(name = "todo_title", nullable = false)
    private String title;


    @NotNull(message = "Priority is required, High, Medium or Low")
    @Pattern(regexp = ("High|Medium|Low"), message = "Priority is required, High, Medium or Low")
    @Column(name = "todo_priority", nullable = false)
    private String priority;


    private String userId;
}
