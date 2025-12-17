import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Itodo } from 'src/app/model/todo';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { Todoservice } from 'src/app/service/todoservice.service';
import { UuidService } from 'src/app/service/uuid.service';

@Component({
  selector: 'app-todo-form1',
  templateUrl: './todo-form1.component.html',
  styleUrls: ['./todo-form1.component.scss'],
  
})
export class TodoForm1Component implements OnInit {
@ViewChild('todoForm') todoForm!: NgForm;
  
  isinEditMode = false;
  editObj!: string;


  private _todoService = inject(Todoservice);
  private _uuidService = inject(UuidService);
  private _SnackBarService = inject(SnackBarService);

  ngOnInit(): void {
    this._todoService.editTodo$
      .subscribe(res => {
        this.isinEditMode = true;
        this.editObj = res.todoId;
        this.todoForm.form.patchValue(res);
      });
  }

  onTodoAdd() {
    if (this.todoForm.valid) {
      const obj: Itodo = {
        ...this.todoForm.value,
        todoId: this._uuidService.uuid()
      };

      this._todoService.createTodo(obj);
      this.todoForm.reset();
    }
  }

  onUpdateTodo() {
    if (this.todoForm.valid) {
      const UPDATED_OBJ: Itodo = {
        ...this.todoForm.value,
        todoId: this.editObj
      };

      this._todoService.onUpdateTodo(UPDATED_OBJ).subscribe({
        next: () => {
          this.todoForm.reset();
          this.isinEditMode = false;
          this._SnackBarService.OpenSnackBar(
            `Todo ${UPDATED_OBJ.todoId} updated successfully`
          );
        },
        error: err => this._SnackBarService.OpenSnackBar(err)
      });
    }
  }
}

