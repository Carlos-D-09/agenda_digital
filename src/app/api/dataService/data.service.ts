import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  contactos = new Subject<any[]>();
  contacto = new Subject<any>();
  usuario = new Subject<any>();
  resultadoRegistro = new Subject<any>();
  resultadoSesion = new Subject<any>();
  resultadoNuevoContacto = new Subject<any>();

  constructor(private http: HttpClient) { 
  }

  getContactos(id:string){
    this.http.get<any[]>("/api/usuarios/" + id + "/contactos")
    .subscribe(data => {
        this.contactos.next(data);
      })
  }
  getContacto(idUsuario:string, idContacto:string){
    this.http.get<any>("/api/usuarios/" + idUsuario +"/contactos/" + idContacto).subscribe(data => {
      this.contacto.next(data);
    })
  }
  registrarUsuario(usuario: Usuario){
    this.resultadoRegistro = new Subject<any>();
    this.http.post<any>("/api/signin", usuario).subscribe(data => {
      this.resultadoRegistro.next(data);
    })
  }
  iniciarSesion(usuario:any){
    this.resultadoSesion = new Subject<any>();
    this.http.post<any>("/api/login", usuario).subscribe(data => {
      this.resultadoSesion.next(data);
    })
  }
  recuperarUsuario(id:string){
    this.usuario = new Subject<any>();
    this.http.get<any>("api/usuario/" + id).subscribe(data => {
      this.usuario.next(data);
    })
  }
  insertarContacto(id:string, contacto:any){
    this.resultadoNuevoContacto = new Subject<any>();
    this.http.post<any>("api/usuarios/" + id + "/nuevoContacto", contacto).subscribe(data =>{
      this.resultadoNuevoContacto.next(data);
    })
  }
}
