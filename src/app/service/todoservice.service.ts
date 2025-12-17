

import { Injectable } from '@angular/core';
import { Itodo } from '../model/todo';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Todoservice {

  todosArr: Itodo[] = [
    { todoItem: "Learn Angular", todoId: '123' },
    { todoItem: "Practice Typescript", todoId: '125' }
  ];

  editTodo$: Subject<Itodo> = new Subject<Itodo>();

  constructor() {}

  fetchAllTodos(): Observable<Itodo[]> {
    return of(this.todosArr);
  }

  createTodo(todo: Itodo): Observable<Itodo> {
    this.todosArr.push(todo);
    return of(todo);
  }

  removeTodo(id: string): Observable<string> {
    let getIndex = this.todosArr.findIndex(t => t.todoId === id);
    if (getIndex > -1) {
      this.todosArr.splice(getIndex, 1);
    }
    return of(id);
  }

  onUpdateTodo(updatedObj: Itodo): Observable<Itodo> {
    let getIndex = this.todosArr.findIndex(t => t.todoId === updatedObj.todoId);
    if (getIndex > -1) {
      this.todosArr[getIndex] = updatedObj;
    }
    return of(updatedObj);
  }
}
