import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CuestionarioService, IPregunta } from '../servicios/cuestionario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public servicioCuestionario: CuestionarioService, public alertController: AlertController) {this.servicioCuestionario.cargarDatos();}

  // input Alert
  async presentAlertPrompt(item: IPregunta) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Pregunta',
      message: item.pregunta,
      inputs: [
        {
          name: 'respuesta',
          id: 'cero',
          type: 'text',
          placeholder: 'Atención a la ortografía'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Enviar',
          handler: (data) => {
            let index: number = this.servicioCuestionario.arrayPreguntas.indexOf(item);
           // console.log(data.respuesta);
            if (data.respuesta == item.respuesta) {
              this.servicioCuestionario.arrayPreguntas[index].resuelta = 1;
            } else {
              this.servicioCuestionario.arrayPreguntas[index].resuelta = this.servicioCuestionario.arrayPreguntas[index].resuelta - 1;
            }
            console.log(this.servicioCuestionario.arrayPreguntas);
          }
        }
      ]
    });

    await alert.present();
  }


}

