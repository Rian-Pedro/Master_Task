import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  permission: Boolean = false;
  tasks: Task = {title: '', dt_start: '', dt_to_end: '', id_maker: ''};

  constructor(private service: UserService) {
    localStorage.setItem('token', '');
    if(localStorage.getItem('token')) {
      service.getUser({ token: localStorage.getItem('token') as string || '',
                        email: '',
                        password: '' }).subscribe((data) => {
                          const { permission, userData } = data as {permission: Boolean, userData: { name: string, id: string }};
                          if(permission) {
                            localStorage.setItem('userName', userData.name);
                            localStorage.setItem('userId', userData.id);
                            this.permission = permission;
                          } else {
                            console.log(permission);
                          }
                        });
      // service.postTask({ title: 'TESTE4', dt_start: '15/04/23', dt_to_end: '19/05/23', id_maker: localStorage.getItem('userId') as string }).subscribe((data) => {
      //   console.log(data)
      // })
      // service.getTasks(localStorage.getItem('token') as string).subscribe((data) => {
      //   console.log(data);
      // })
    }
    console.log(typeof localStorage.getItem('permission'));
  }
}
