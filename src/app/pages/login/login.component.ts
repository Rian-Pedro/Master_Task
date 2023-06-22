import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loader = true;
  permission = false;
  constructor(private service: UserService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(param => {
      this.permission = param['type'] == 'login'? true : false;
    });
  }

  async submitEvent(event: Event) {

    event.preventDefault();
    const el: HTMLFormElement = event.target as HTMLFormElement;

    el.classList.replace('visible', 'invisible');
    el.nextElementSibling?.classList.replace('invisible', 'visible');

    if(el.method == 'get') {
      const userDatas: Array<HTMLInputElement> = Array.from(el.querySelectorAll('input'));
      const formData = new FormData();
      console.log(userDatas);
      userDatas.forEach((data) => {
        formData.append(data.name, data.value);
      })

      if(formData.get('email') && formData.get('password')) {
        this.service.getUser({ token: '', email: formData.get('email') as string, password: formData.get('password') as string })
        .subscribe((data: any) => {
          if(!data.errors) {
            for(let key in data) {
              if(typeof data[key] == 'object') {
                localStorage.setItem('UserName', data[key].name);
                localStorage.setItem('UserId', data[key].id);
              } else {
                localStorage.setItem(key, data[key]);
              }
            }
            this.router.navigate(['/']);
          } else {
            console.log("erro\n", data);
          }
        });
      } else {
        alert('preencha todos os campos');
        el.classList.replace('invisible', 'visible');
        el.nextElementSibling?.classList.replace('visible', 'invisible');
      }


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
      if (data.classList.contains('error')) {
        data.classList.remove('error');
      }
    });

    for(let data of userDatas) {
      canRegister = this.findError(data);
      console.log(canRegister);
      if(!canRegister) {
        el.classList.replace('invisible', 'visible');
        el.nextElementSibling?.classList.replace('visible', 'invisible');
        break;
      }
    }

    if (formData.get('password') !== formData.get('confirm-password')) {
      userDatas.forEach((element) => {
        if (element.name === 'confirm-password') {
          element.classList.add('error');
          this.erroMsgEvent(element);
        }
      });
      console.log("teste password");
      canRegister = false;
    }

    if (canRegister) {
      this.service.registerUser({ name: formData.get('name') as String, email: formData.get('email') as String, password: formData.get('password') as String }).subscribe((data: any) => {
        if(!data.errors) {
          alert("Registro feito com sucesso!");
          this.router.navigate(['/user/login']);
        }
      });
    }
  }


  findError(input: HTMLInputElement): Boolean {

    let register = true;

    if(input.name == 'name') {
      if(!input.value) {
        input.classList.add('error');
        this.erroMsgEvent(input);
        return false;
      }
    }

    if(input.name == 'password') {
      if(input.value.length < 6) {
        input.classList.add('error');
        this.erroMsgEvent(input);
        return false;
      }
    }

    if(input.name == 'email') {
      if(!input.value) {
        input.classList.add('error');
        this.erroMsgEvent(input);
        return false;
      }
    }

    if(input.name == 'confirm-password') {
      if(!input.value) {
        console.log("confirma");
        input.classList.add("error");
        this.erroMsgEvent(input);
        return false;
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
