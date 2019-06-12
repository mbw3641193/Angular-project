import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//rxjs包
import {tap,catchError} from 'rxjs/operators';
import {Observable,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//在angular中，service是由注入的时候，由框架帮忙创建的。
//无论你怎么做，全局中该对象是单例的，即只有一个实例。所以里面的属性可以作为共享数据来使用
export class TeacherService {
  private isLogin:boolean = false;
  private baseURL:string = 'https://tcc.taobao.com/cc/json/';
  private userInfo:Object = {};


  //提供公共的访问方式

  public getIsLogin(){
    return this.isLogin;
  }
  public getUserInfo(){
    return this.userInfo;
  }
  private setIsLogin(isLogin){
    this.isLogin = isLogin;
  }

  constructor(private http:HttpClient) { 
  }
  /**1:使用Observable
   * doLogin
   * 此处的Observable已经被封装好了，并不能针对其中间进行一些行为
   */
  // public doLogin() {
  //   return this.http.get('http://www.sinya.online/api/getlunbo')
  // }

  /**2：使用rxjs
   * doLogin
   * 
   */
  private errorHandler(error:any):Observable<any>{
    console.error(error);
    return of(''); //返回一个obserable对象
  }


  public doLogin(data:Object,options?:Object) {   // ?:可选的意思
    return this.http.post(this.baseURL + 'mobile_tel_segment.htm',data,options).pipe(
      tap( (res)=>{
        console.log(res);
      } ),
      catchError( this.errorHandler )
    );
  }

  //保存用户数据 并 变更登录状态
  /**
   * saveUser
   */
  public saveUser(u:Object) {
    this.setIsLogin(true);
    this.userInfo = {...u};

  }
}
