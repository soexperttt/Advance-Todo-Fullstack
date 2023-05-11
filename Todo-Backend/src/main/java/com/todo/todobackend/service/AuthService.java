package com.todo.todobackend.service;

import com.todo.todobackend.model.MyUser;
import com.todo.todobackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public List<MyUser> getUsers(){
        return userRepository.findAll();
    }

    public void register(MyUser myUser){
        String hashedPassword= new BCryptPasswordEncoder().encode(myUser.getPassword());
        myUser.setPassword(hashedPassword);
        userRepository.save(myUser);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }


}
