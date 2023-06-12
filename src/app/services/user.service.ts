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

  async registerUser(userDatas: {name: String, password: String, email: String}) {
    await axios.post(`https://api-task-aplication.onrender.com/register/?name=${userDatas.name}&email=${userDatas.email}&password=${userDatas.password}`)
          .then((response) => {
            console.log(response.data);
            if(response.data.errors.email) {
              alert('email já cadastrado')
            }
          })
          .catch((err) => {
            console.log(err);
          })
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
