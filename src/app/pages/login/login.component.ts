import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  permission = false;
  constructor(private service: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe(param => {
      this.permission = param['type'] == 'login'? true : false;
    });
  }

  async submitEvent(event: Event) {

    event.preventDefault();
    const el: HTMLFormElement = event.target as HTMLFormElement;

    if(el.method == 'get') {
      const userDatas: Array<HTMLInputElement> = Array.from(el.querySelectorAll('input'));
      const formData = new FormData();
      console.log(userDatas);
      userDatas.forEach((data) => {
        formData.append(data.name, data.value);
      })

      await this.service.getUser({ token: '',
                                   email: formData.get('email') as string,
                                   password: formData.get('password') as string });

    } else if(el.method == 'post') {
      this.register(el);
    }

  }

  async register(el: HTMLFormElement) {

    const userDatas: Array<HTMLInputElement> = Array.from(el.querySelectorAll('input'));
    const formData = new FormData();
    let canRegister: Boolean = true;

    userDatas.forEach((data) => {
      formData.append(data.name, data.value);
      if(data.classList.contains('error')) {
        data.classList.remove('error');
      }
      canRegister = this.findError(data);

    });

    if(formData.get('password') != formData.get('confirm-password')) {
      userDatas.forEach((element) => {
        if(element.name == 'confirm-password') {
          element.classList.add('error');
          this.erroMsgEvent(element);
        }
      })
    }


    if(canRegister) {

      await this.service.registerUser({ name: formData.get('name') as String,
                                      password: formData.get('password') as String,
                                      email: formData.get('email') as String });

    }

  }

  findError(input: HTMLInputElement): Boolean {

    let register = true;

    if(input.name == 'name') {
      if(!input.value) {
        input.classList.add('error');
        this.erroMsgEvent(input);
        register = false;
      }
    }

    if(input.name == 'password') {
      if(input.value.length < 6) {
        input.classList.add('error');
        console.log(input)
        this.erroMsgEvent(input);
        register = false;
      }
    }

    if(input.name == 'email') {
      if(!input.value) {
        input.classList.add('error');
        this.erroMsgEvent(input);
        register = false;
      }
    }

    return register;

  }

  erroMsgEvent(data: HTMLElement) {
    const error: HTMLElement = data.nextElementSibling as HTMLElement;

    data.addEventListener('mousemove', () => {
      error.style.display = 'inline';
    });
    data.addEventListener('mouseleave', () => {
      error.style.display = 'none';
    })
  }

}
