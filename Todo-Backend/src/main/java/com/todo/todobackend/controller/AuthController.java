package com.todo.todobackend.controller;

import com.todo.todobackend.DTO.Api;
import com.todo.todobackend.model.MyUser;
import com.todo.todobackend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;


    // check if user is logged in
    @GetMapping("/check")
    public ResponseEntity<Api> check(){
        return ResponseEntity.status(HttpStatus.OK).body(new Api("You are logged in",200));
    }
    @GetMapping("/users")
    public ResponseEntity<?> getUsers(@AuthenticationPrincipal MyUser myUser){
        if (!myUser.getRole().equals("ADMIN")){
            return ResponseEntity.status(401).body(new Api("Only admin can get the users list",401));
        }
        return ResponseEntity.status(HttpStatus.OK).body(authService.getUsers());
    }
    @PostMapping("/login")
    public ResponseEntity<Api> login(){

        return ResponseEntity.status(HttpStatus.OK).body(new Api("Welcome back",200));
    }

    @PostMapping("/register")
    public ResponseEntity<Api> register(@RequestBody @Valid MyUser myUser){
        authService.register(myUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(new Api("User registered",201));
    }
    @DeleteMapping("/delete/{id}")
public ResponseEntity<Api> deleteUser(@PathVariable String id){
        authService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(new Api("User deleted",200));
    }

}
