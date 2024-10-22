import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ServiceLcService {

  constructor(private http : HttpClient) { }

  crudpost1(data:any){
    return this.http.post("https://localhost:7238/api/Address",data,{responseType:'text'})
  }

  crudpost2(data1:any){
    return this.http.post("https://localhost:7238/api/Generalcls",data1,{responseType:'text'})
  }

  Tpost(task:any){
    return this.http.post("http://cbe.themaestro.in:8021/api_mcharge_v2/charge_booking",task,{responseType:'text'})
  }
}
