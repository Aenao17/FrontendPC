import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TaskInterface } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

      private apiUrl = `${environment.apiUrl}/tasks`;
  
      constructor(private http: HttpClient, private authService: AuthService) { }

      public getAllAvailableTask(eventId: Number) {
        return lastValueFrom(this.http.get<TaskInterface[]>(this.apiUrl + `/${eventId}`));
      }

      public changeStatusTask(taskName: string, newStatus: string) {
        return lastValueFrom(this.http.put<TaskInterface>(this.apiUrl, {name: taskName, status: newStatus}));
      }

      public createTask(task: TaskInterface) {
        return lastValueFrom(this.http.post<TaskInterface>(this.apiUrl, task));
      }
  
}
