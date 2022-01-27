import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GestionStorageService } from './gestion-storage.service';

 // interface de datos
export interface IPregunta {
  pregunta: string;
  respuesta: string;
  // 0: Sin responder, 1: Resuelta, <0: Número de fallos
  resuelta: number;
}

@Injectable({
  providedIn: 'root'
})

export class CuestionarioService {

  public arrayPreguntas: IPregunta[] = [];

  constructor(private leerFichero: HttpClient, public storageService: GestionStorageService) { }

  // Método que devolverá todas las preguntas del cuestionario en un array
  public getPreguntas() { }

  // Recupera las preguntas de Storage. Si no hay ninguna almacenada, las lee del fichero
  public async cargarDatos() {
      let datosPromesa = await this.storageService.getObject("0");
      // Cuando se obtiene una respuesta se comprueba que hay datos y se procesan
      if(datosPromesa) {
        this.arrayPreguntas.push(...datosPromesa);
      } else {
        this.cargarFichero("datos");
      }
    
   }

  // Lee los datos de un fichero y los almacena en un array CAMBIAR A PRIVATE.
  public cargarFichero(nombreFichero) {
    // Declaramos el Observable. Requerirá importar la clase
    let respuesta: Observable<IPregunta[]>
    // Llamamos a la función get del servicio HttpClient y le pasamos la ruta del fichero que queremos leer
    // Nos devolverá un observable que nos permitirá estar al tanto de cuando los nuevos datos están disponibles
    respuesta = this.leerFichero.get<IPregunta[]>("/assets/datos/" + nombreFichero + ".json");
    // Nos suscribimos al observable para indicar lo que queremos que ocurra cuando se produzca algún cambio
    // Le pasamos una función con el código que queremos que se ejecute
    respuesta.subscribe(resp => {
      this.arrayPreguntas = resp;
      for (let i = 0; i < this.arrayPreguntas.length; i++) {
        this.arrayPreguntas[i].resuelta = 0;
      }
      // console.log(this.arrayPreguntas);
    });
  }

  // Abre una alerta con el enunciado de la pregunta y comprueba la respuesta
  // En función de si es correcta o no, actualiza el valor del atributo "contestada"
  public async responder(pregunta) { }

  // Almacena el array de preguntas en Storage
  public guardar() {
    let key: string = "0";
    this.storageService.setObject(key, this.arrayPreguntas);
  }

}

// https://github.com/pmdm-birt/pmdm-parcial.git
