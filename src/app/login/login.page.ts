import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { DataService } from '../api/dataService/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  resultado:any;
  correo: string;
  user_key: string;
  usuarioLog:any;

  constructor(private iniciarSesion:DataService, 
    private alertCtrl:AlertController, private router:Router) { }

  onEntrar(){
    let parametros = {
      "correo_electronico" : this.correo,
      "user_key" : this.user_key
    }
    this.iniciarSesion.iniciarSesion(parametros);
    this.iniciarSesion.resultadoSesion.subscribe(resultado => {
    this.resultado = resultado;
    if(this.resultado.code == "input error"){
      this.presentFail();
    }
    else if(this.resultado.code == "sin coincidencias"){
      this.presentInexistencia();
    }
    else{
      this.iniciarSesion.recuperarUsuario(this.resultado.id);
      this.iniciarSesion.usuario.subscribe(usuario => {
        this.usuarioLog = usuario;
        this.welcome(this.usuarioLog.nombres.toString());
        console.log(this.resultado.id.toString());
        this.router.navigateByUrl('/home/:' + this.usuarioLog.id.toString());
        this.limpiarInputs();
      });
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
    this.limpiarInputs();
  }
  async presentInexistencia() {
    let alert = await this.alertCtrl.create({
      header: 'Fail',
      message: 'Credenciales invalidas',
      buttons: [{
        text: 'Dismiss',
        role: "cancel"
      }]
    });
    alert.present();
    this.limpiarInputs();
  }
  async welcome(nombre:string) {
    let alert = await this.alertCtrl.create({
      header: 'Welcome',
      message: 'Bienvenido ' + nombre,
      buttons: [{
        text: 'Dismiss',
        role: "cancel"
      }]
    });
    alert.present();
  }

  limpiarInputs(){
    this.correo = "";
    this.user_key = "";
  }
}
