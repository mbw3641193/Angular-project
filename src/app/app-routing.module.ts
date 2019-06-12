import { NgModule, Injectable } from '@angular/core';
//1.引入router模块，并导出给app
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TeacherService } from './teacher.service';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { ListComponent } from './list/list.component';




//路由钩子
@Injectable()
class checkLogin implements CanActivate {
  constructor(private router: Router, private teacherService: TeacherService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(route);
    console.log(state);  //state.root 就是路由信息对象

    if (state.url !== '/signin') {  //所有不是signin的页面
      if (this.teacherService.getIsLogin()) {
        return true;  //判断登录状态，如果登录了，放行
      }
      this.router.navigateByUrl('/signin') //判断登录状态，如果没有登录，前往signin页面
    }
    return true; //signin页面放行
  }
}

//2.创建路由对象
const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent },
    ],
    canActivate: [checkLogin]
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [checkLogin]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [checkLogin]
})
export class AppRoutingModule { }
