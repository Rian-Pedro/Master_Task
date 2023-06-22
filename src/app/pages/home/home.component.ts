import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  permission: Boolean = false;
  tasks: any;

  constructor(private service: UserService, private router: Router) {}

  async ngOnInit() {

    if(!localStorage.getItem('token')) {
      this.router.navigate(['user/login']);
      return;
    }

    if(localStorage.getItem('token')) {
      this.permission = true;

      await this.service.getUser({ token: localStorage.getItem('token') as string, email: '', password: '' })
        .subscribe((data) => {

          const { permission, userData } = data as { permission: Boolean,
                                                      userData: { name: string,
                                                                  id: string }};

          if(permission) {
            localStorage.setItem('UserName', userData.name);
            localStorage.setItem('UserId', userData.id);
            this.permission = permission;
          } else {
            this.router.navigate(['/user/login']);
          }

        });

      await this.service.getTasks(localStorage.getItem('UserId') as string)
        .subscribe((data) => {
          const taskList: any = data;
          this.tasks = taskList.tasks;
        });
    }
  }

  logout() {
    localStorage.clear();
  }

  async submitEvent(event: Event) {

    event.preventDefault();
    const el: HTMLElement = event.target as HTMLElement;
    const InputDatas = el.querySelectorAll('input');
    let validated: Boolean = true;
    const formData = new FormData();

    InputDatas.forEach((data) => {
        if(!data.value) {
          validated = false;
        }
    });

    if(validated) {
      InputDatas.forEach((data) => {
        if(data.name == 'dt_start' || data.name == 'dt_to_end') {
          const dataSplit = data.value.split('-');
          formData.append(data.name, dataSplit[2] + '/' + dataSplit[1] + '/' + dataSplit[0]);
        } else {
          formData.append(data.name, data.value);
        }
      });

      await this.service.postTask({ title: formData.get('title') as string,
                                    dt_start: formData.get('dt_start') as string,
                                    dt_to_end: formData.get('dt_to_end') as string,
                                    id_maker: localStorage.getItem('UserId') as string })
        .subscribe((data) => {
          alert("Task postada com sucesso");
          location.reload();
        });

    } else {
      console.log("erro");
    }

  }
}
