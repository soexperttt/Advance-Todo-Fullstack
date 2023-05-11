package com.todo.todobackend.controller;

import com.todo.todobackend.DTO.Api;
import com.todo.todobackend.model.MyUser;
import com.todo.todobackend.model.Todo;
import com.todo.todobackend.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/v1/todo")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;


    @GetMapping
    public ResponseEntity<List<Todo>> getTodo(@AuthenticationPrincipal MyUser user){
        return ResponseEntity.status(HttpStatus.OK).body(todoService.getTodoByUserId(user.getId()));
    }
    @GetMapping("/{todoId}")
    public ResponseEntity<Todo> getTodoById(@AuthenticationPrincipal MyUser user,@PathVariable String todoId){
        return ResponseEntity.status(HttpStatus.OK).body(todoService.getTodoById(user.getId(),todoId));
    }

    @PostMapping
    public ResponseEntity<Api> addTodo(@AuthenticationPrincipal MyUser user, @RequestBody @Valid Todo todo){
        todoService.addTodo(user,todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(new Api("Todo added: "+todo.getTitle(),201));
    }

    @PutMapping("update/{todoId}")
    public ResponseEntity<Api> updateTodo(@AuthenticationPrincipal MyUser user,@PathVariable String todoId,@RequestBody @Valid Todo todo){
        todoService.updateTodo(user.getId(),todoId,todo);
        return ResponseEntity.status(HttpStatus.OK).body(new Api("Todo updated",200));
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<Api> deleteTodo(@AuthenticationPrincipal MyUser user,@PathVariable String todoId){
        todoService.deleteTodo(user.getId(),todoId);
        return ResponseEntity.status(HttpStatus.OK).body(new Api("Todo deleted",200));
    }

}


