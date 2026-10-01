package com.taskflow.task;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/** Unit test: pure Java, no Spring, runs in milliseconds. */
class TaskTest {

    @Test
    void newTaskStartsAsTodo() {
        Task task = new Task("Write tests", null);

        assertThat(task.getStatus()).isEqualTo(TaskStatus.TODO);
    }

    @Test
    void canMoveFromTodoToDone() {
        Task task = new Task("Write tests", null);

        task.changeStatus(TaskStatus.DONE);

        assertThat(task.getStatus()).isEqualTo(TaskStatus.DONE);
    }

    @Test
    void finishedTaskCannotGoBackToTodo() {
        Task task = new Task("Write tests", null);
        task.changeStatus(TaskStatus.DONE);

        assertThatThrownBy(() -> task.changeStatus(TaskStatus.TODO))
                .isInstanceOf(IllegalStateException.class);
    }
}
