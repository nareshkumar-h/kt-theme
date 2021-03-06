import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) {
    //console.log('HeaderComponent constructor', this.user);
  }

  @Input()
  users: any;

  isMentor = false;
  selectedUser: any;
  searchUser: string;
  loggedInUsername: any;
  ngOnInit(): void {
    //console.log("Menus:" , this.menus);
    //console.log("BgColor", this.bgColor);
    this.bgColor = this.bgColor || '#2b3643';
    this.loggedInUsername = JSON.parse(
      localStorage.getItem('LOGGED_IN_USER')
    ).username;
    this.selectedUser = this.getSelectedUser();
    this.isMentor = this.user ? this.user.roles.indexOf('T') != -1 : false;
  }

  switchUser(selectedUser) {
    console.log(selectedUser);
    console.log('search user', this.searchUser);
    this.selectedUser = selectedUser;
    if (selectedUser) {
      let cfm = confirm(
        'Do you want to switch user - ' + this.selectedUser + ' ?'
      );
      if (cfm) {
        this.setSelectedUser(this.selectedUser);
        //window.location.reload();
        this.router.navigate(['/']);
      }
    } else {
      this.clearUser();
    }
  }

  clearUser() {
    console.log(this.loggedInUsername);
    this.setSelectedUser(this.loggedInUsername);
    window.location.reload();
  }

  isExists(user) {
    console.log('user', user);
    return this.users.indexOf(user) != -1;
  }

  clearSwitchUser() {
    var selectedUsername = prompt('Enter username');

    if (selectedUsername && selectedUsername.length > 0) {
      this.selectedUser = selectedUsername;
      this.setSelectedUser(selectedUsername);
      window.location.reload();
    } else {
      this.setSelectedUser(this.loggedInUsername);
      window.location.reload();
    }
  }

  switchUserDialog(userId) {
    // const dialogRef = this.dialog.open(SwitchUserComponent, {
    //   width: '800px',
    //   height: 'fit-content',
    //   data: { userId: userId },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   //this.refresh();
    // });
  }

  @Input()
  navbrand: string;

  @Input()
  user: any;

  logout() {
    console.log('logout');
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/auth/login';
    //this.router.navigate(['auth/login']);
  }

  @Input()
  menus: any;

  @Input()
  rightMenus: any;

  @Input()
  bgColor: any;

  setSelectedUser(username) {
    localStorage.setItem('SELECTED_USER', username);
  }

  getSelectedUser() {
    return localStorage.getItem('SELECTED_USER');
  }
}
