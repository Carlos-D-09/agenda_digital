import { Component, OnInit } from '@angular/core';
import { Usuario } from '../api/usuario';
import { DataService } from '../api/dataService/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage{
  nombres: string;
  apellidos: string;
  correo_electronico: string;
  celular: string;
  user_key: string;
  resultado:any;

  constructor(private registrarUsuario: DataService, public alertCtrl: AlertController) { }

  onRegistrar(){
    let usuario = new Usuario(this.nombres, this.apellidos, this.correo_electronico, Number(this.celular), this.user_key)
    console.log(usuario)
    this.registrarUsuario.registrarUsuario(usuario);
    this.registrarUsuario.resultadoRegistro.subscribe(resultado => {
      this.resultado = resultado;
      if(this.resultado.code == 'ok'){
        this.presentConfirm();
        console.log(this.resultado);
      }
      if (this.resultado.code == "existe"){
        this.presentExistencia();
        console.log(this.resultado);
      }
      if(this.resultado.code == "input error"){
        this.presentFail();
        console.log(this.resultado);
      }
    })
  }
  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      header: 'Succesful',
      message: 'Usuario creado correctamente',
      buttons: [{
        text: 'Dismiss',
        role: "cancel"
      }]
    });
    alert.present();
    this.limpiarInputs();
  }
  
 async presentExistencia() {
    let alert = await this.alertCtrl.create({
      header: 'Fail',
      message: 'Usuario ya registrado',
      buttons: [{
        text: 'Dismiss',
        role: "cancel"
      }]
    });
    alert.present();
    this.limpiarInputs();
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
    this.limpiarInputs();
  }
  limpiarInputs(){
    this.nombres = "";
    this.apellidos = "";
    this.correo_electronico = "";
    this.celular = "";
    this.user_key = "";
  }
}
