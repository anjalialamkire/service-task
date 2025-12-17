import { Component, OnInit } from '@angular/core';
import { Itodo } from 'src/app/model/todo';
import { Todoservice } from 'src/app/service/todoservice.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todosArr: Itodo[] = [];

  constructor(
    private _todoService: Todoservice,
    private _snackBar: SnackBarService
  ) {}

 
  ngOnInit(): void {
    this._todoService.fetchAllTodos().subscribe({
      next: (res) => {
        this.todosArr = res;
        console.log('Todos Loaded:', this.todosArr);
      },
      error: (err) => {
        console.log(err);
        this._snackBar.OpenSnackBar('Failed to load todos');
      }
    });
  }

 
  onRemove(todoId: string): void {
    this._todoService.removeTodo(todoId).subscribe({
      next: () => {
        this.todosArr = this.todosArr.filter(todo => todo.todoId !== todoId);
        this._snackBar.OpenSnackBar(`Todo item with id ${todoId} removed successfully!!!`);
      },
      error: (err) => {
        console.log(err);
        this._snackBar.OpenSnackBar('Failed to delete todo ');
      }
    });
  }

  
  onTodoEdit(todo: Itodo): void {
    this._todoService.editTodo$.next(todo);
   
  }
}
