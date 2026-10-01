package com.taskflow.task;

import com.taskflow.task.dto.CreateTaskRequest;
import com.taskflow.task.dto.TaskResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public Page<TaskResponse> list(TaskStatus status, Pageable pageable) {
        Page<Task> page = status == null
                ? repository.findAll(pageable)
                : repository.findByStatus(status, pageable);
        return page.map(TaskResponse::from);
    }

    public TaskResponse get(Long id) {
        return TaskResponse.from(find(id));
    }

    @Transactional
    public TaskResponse create(CreateTaskRequest request) {
        Task task = repository.save(new Task(request.title(), request.description()));
        return TaskResponse.from(task);
    }

    @Transactional
    public TaskResponse changeStatus(Long id, TaskStatus status) {
        Task task = find(id);
        task.changeStatus(status);
        return TaskResponse.from(repository.saveAndFlush(task));
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(find(id));
    }

    private Task find(Long id) {
        return repository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    }
}
