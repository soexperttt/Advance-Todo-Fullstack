package com.todo.todobackend.repository;

import com.todo.todobackend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, String> {


    @Query("select c from Todo c where c.userId=?1")
    List<Todo> findAllByMyUser(String userId);
     Todo deleteAllByUserId(String userId);
}