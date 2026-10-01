package com.taskflow.task.dto;

import com.taskflow.task.Task;
import com.taskflow.task.TaskStatus;

import java.time.Instant;

/** API contract. Never expose JPA entities directly: they leak the schema and lazy-loading issues. */
public record TaskResponse(
        Long id,
        String title,
        String description,
        TaskStatus status,
        Instant createdAt,
        Instant updatedAt
) {
    public static TaskResponse from(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt(),
                task.getUpdatedAt());
    }
}
