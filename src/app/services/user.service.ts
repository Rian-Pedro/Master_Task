import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import axios from 'axios';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }



  getUser(userDatas: User) {
    return this.http.get(`https://api-task-aplication.onrender.com/login/?email=${userDatas.email}&password=${userDatas.password}&token=${userDatas.token}`)
  }

  registerUser(userDatas: {name: String, password: String, email: String}) {
    return this.http.post('https://api-task-aplication.onrender.com/register', userDatas);
  }

  deleteTask(id_task: string) {
    return this.http.delete(`https://api-task-aplication.onrender.com/deleteTask/?id_task=${id_task}`);
  }

  getTasks(id_maker: string) {
    return this.http.get(`https://api-task-aplication.onrender.com/getTasks/?id_maker=${id_maker}`);
  }

  postTask(task: Task) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`https://api-task-aplication.onrender.com/postTask`, task);
  }

}
