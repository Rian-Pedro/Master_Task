import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {

  @Input() task = {title: '', dt_start: '', dt_to_end: '', id_maker: '', _id: ''};

  constructor(private service: UserService) {}

  option(event: Event) {

    const el: HTMLElement = event.target as HTMLElement;

    if(el.innerHTML == "Excluir") {
      this.service.deleteTask(this.task._id)
        .subscribe((data: any) => {
          alert(data.msg || data.error);
          el.closest('.task')?.remove();
        });
    }

  }

}
