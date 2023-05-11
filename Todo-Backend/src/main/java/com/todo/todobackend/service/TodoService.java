package com.todo.todobackend.service;

import com.todo.todobackend.exception.ApiException;
import com.todo.todobackend.model.MyUser;
import com.todo.todobackend.model.Todo;
import com.todo.todobackend.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class TodoService {
    private final TodoRepository todoRepository;

    public void addTodo(MyUser user, Todo todo) {
        todo.setUserId(user.getId());
        todoRepository.save(todo);
    }

    public void updateTodo(String userId, String todoId, Todo todo) {
        Todo updateTodo = todoRepository.findById(todoId).orElseThrow(()->new ApiException("There is not Todo with this id"));
        if(!updateTodo.getUserId().equals(userId)){
            throw new ApiException("You don't own this todo to update it!");
        }
        updateTodo.setTitle(todo.getTitle());
         updateTodo.setPriority(todo.getPriority());
        todoRepository.save(updateTodo);
    }

    public void deleteTodo(String userId, String todoId) {
        Todo deletedTodo = todoRepository.findById(todoId).orElseThrow(()->new ApiException("There is no Todo with this id!"));;
        if(!deletedTodo.getUserId().equals(userId)){
            throw new ApiException("You don't own this todo to delete it !");
        }
        todoRepository.delete(deletedTodo);
    }

    public List<Todo> getTodoByUserId(String userId) {

        List<Todo> todo = todoRepository.findAllByMyUser(userId);
        return todo;

    }

    public void deleteAllTodos(MyUser user) {
        todoRepository.deleteAllByUserId(user.getId());


    }

    public Todo getTodoById(String id, String todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(()->new ApiException("There is no Todo with this id!"));
        if(!todo.getUserId().equals(id)){
            throw new ApiException("You don't own this todo to get it !");
        }
        return todo;
    }
}
