import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private storage: StorageService,
  ) {
  }
}
