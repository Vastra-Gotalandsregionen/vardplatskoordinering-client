import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../domain/User';
import { EditUserDialogComponent } from '../../elements/edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  private usernameFilter = '%';

  pageContent: User[] = [];

  pageIndex: number = 0;

  constructor(private http: HttpClient, public dialog: MatDialog) {

  }

  ngOnInit() {
    const todaysRegistreringarObservable = this.http.get('/api/user?username=' + this.usernameFilter + '&page=' + this.pageIndex);
    todaysRegistreringarObservable.subscribe(o => {
      console.log('Found', o);
      this.pageContent = o;
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: {user}
    });

    dialogRef.componentInstance.save.subscribe((result: User) => {
      if (result) {
        this.http.put('/api/user', result).subscribe(() => this.ngOnInit());
      }
    });
  }

  editNewUser() {
    const user = new User();
    this.editUser(user);
  }

}
