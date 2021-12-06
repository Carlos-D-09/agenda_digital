import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../api/dataService/data.service';

@Component({
  selector: 'app-nuevocontacto',
  templateUrl: './nuevocontacto.page.html',
  styleUrls: ['./nuevocontacto.page.scss'],
})
export class NuevocontactoPage implements OnInit {
  idUsuario:string;
  nombre:string;
  imagen:string;
  correo_electronico:string;
  celular: string;
  facebook: string = ""; 
  twitter: string = "";
  instagram: string = "";
  resultado: any;

  constructor(private insertarContacto: DataService,
    private activateRoute: ActivatedRoute, private alertCtrl:AlertController,
    private router:Router) {}

  ngOnInit() {
    let provisional = this.activateRoute.snapshot.paramMap.get("idUsuario");
    if(provisional[0] == ":"){
      provisional = provisional.slice(1,provisional.length);
    }
    this.idUsuario = provisional;
  }
  
  onInsertar(){
    let contacto = {
      "nombre": this.nombre,
      "imagen": this.imagen,
      "correo_electronico": this.correo_electronico,
      "telefono": this.celular,
      "facebook": this.facebook,
      "twitter" : this.twitter,
      "instagram": this.instagram,
      "id_usuario": this.idUsuario
    }
    this.insertarContacto.insertarContacto(this.idUsuario, contacto);
    this.insertarContacto.resultadoNuevoContacto.subscribe(data => {
      this.resultado = data;
      if(this.resultado.code == "existe"){
        this.presentExistencia();
      }
      else if(this.resultado.code == "input error"){
        this.presentFail();
      }
      else if(this.resultado.code == "ok"){
        this.presentExito();
        this.router.navigateByUrl('/home/:' + this.idUsuario);
      }
    })
  }
  async presentFail() {
    let alert = await this.alertCtrl.create({
      header: 'Fail',
      message: 'Datos incompletos',
      buttons: [{
        text: 'Dismiss',
        role: "cancel"
      }]
    });
    alert.present();
  }
  async presentExistencia() {
    let alert = await this.alertCtrl.create({
      header: 'Fail',
      message: 'Contacto ya registrado con el correo electronico',
      buttons: [{
        text: 'Dismiss',
        role: "cancel"
      }]
    });
    alert.present();
  }
  async presentExito() {
    let alert = await this.alertCtrl.create({
      header: 'Succesful',
      message: 'Contacto creado exitosamente',
      buttons: [{
        text: 'Dismiss',
        role: "cancel"
      }]
    });
    alert.present();
  }

}
