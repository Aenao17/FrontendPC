import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {



  users: User[] = [];
  current_username: string = "";

  constructor(private auth: AuthService, public storage: StorageService) { }

  async ngOnInit() {
    console.log(3);
    this.current_username = await this.storage.get("username")
    this.auth.getAllUsers().then((users: User[]) => {
      this.users = users;
    })
  }

  onClick(role: string, id: string, event: MouseEvent) {
    console.log(role, id, event);
    this.auth.changeRole(id, role).then((result: User) => {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === id) {
          this.users[i].role = role;
        }
      }
      alert(`Noul rolul pentru utilizatorul cu id-ul ${id} este ${result.role}`);
    })
  }

  logout() {
    this.auth.logout();
  }

  onLogoClick($event: MouseEvent) {
    return;
  }
}
