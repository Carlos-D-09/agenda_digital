import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../api/dataService/data.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  idContacto:string;
  idUsuario:string;
  nombre:string;
  correo_electronico:string;
  telefono:string;
  facebook:string;
  twitter:string;
  instagram:string;
  imagen:string;

  constructor(private cargarContacto: DataService, 
    private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    let provisional1 = this.activateRoute.snapshot.paramMap.get("idUsuario");
    let provisional2 = this.activateRoute.snapshot.paramMap.get("idContacto");
    this.idUsuario = provisional1;
    this.idContacto = provisional2;
    this.cargarContacto.getContacto(this.idUsuario, this.idContacto);
    this.cargarContacto.contacto.subscribe(contacto =>{
      this.nombre = contacto.nombre;
      this.correo_electronico = contacto.correo_electronico;
      this.telefono = contacto.telefono;
      this.facebook = contacto.facebook;
      this.twitter = contacto.twitter;
      this.instagram = contacto.instagram;
      this.imagen = contacto.imagen;
    });
  }

}
