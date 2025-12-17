import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private  _SnackBar : MatSnackBar) { }

    OpenSnackBar(msg : string){
      this._SnackBar.open(msg,"close",{
       horizontalPosition :'left',
       verticalPosition :'top'
      })
    }
}
