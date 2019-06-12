import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../teacher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private teacherService:TeacherService ) { }

  ngOnInit() {
    console.log(this.teacherService.getUserInfo());
  }

}
