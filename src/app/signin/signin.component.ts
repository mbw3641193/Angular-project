import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TeacherService} from '../teacher.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @Input() username:string;
  @Input() password:string;
  constructor( private teacherService:TeacherService,private router:Router) { }

  ngOnInit() {
  }
  login(e){
    e.preventDefault();
    //跟Promise有点相似，叫做 Observable
    // this.http.get('http://www.sinya.online/api/getlunbo').subscribe((res)=>{
    //   console.log(res);
    // },(err)=>{
    //   console.log(err);
    // })
    console.log(this.username,this.password);
    this.router.navigateByUrl('/home');

    //使用rxjs后，异常由公共方式处理
    this.teacherService.doLogin({
      username:this.username,
      password:this.password
    }).subscribe((res)=>{
      console.log(res);
      if(res.user){
        this.teacherService.saveUser(res.user);
        //页面跳转
        this.router.navigateByUrl('/home');
      }
    });
  }

}
