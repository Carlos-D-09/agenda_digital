import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../api/dataService/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  contactos = [];
  usuarioLoggeado: any;
  resultadoLoggin:string;
  constructor(private cargarContactos: DataService, 
    private activateRoute: ActivatedRoute, private router:Router) {}

  ngOnInit(){
    let provisional = this.activateRoute.snapshot.paramMap.get("id");
    console.log(provisional);
    if(provisional[0] == ":"){
      provisional = provisional.slice(1,provisional.length);
    }
    console.log(provisional);
    this.resultadoLoggin = provisional;
    this.cargarContactos.recuperarUsuario(this.resultadoLoggin);
    this.cargarContactos.usuario.subscribe(usuario => {
      this.usuarioLoggeado = usuario;
      this.mostrarContactos();
    });
  }
  
  mostrarContactos(){
    this.cargarContactos.getContactos(this.resultadoLoggin);
    this.cargarContactos.contactos.subscribe(contactos => {
      this.contactos = contactos;
    });
  }

}
