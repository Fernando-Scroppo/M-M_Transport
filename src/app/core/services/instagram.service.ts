import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  private readonly instagramProfile = 'https://www.instagram.com/sergiomaidanatransfers/?hl=es-la';
  private readonly defaultMessage = `¡Hola!
Gracias por comunicarte con M&M Servicios de Traslados Ejecutivos.

Es un placer ayudarte con tu traslado.

Para brindarte una atención más rápida, por favor indicanos:
• Fecha y horario del viaje
• Dirección de origen y destino
• Cantidad de pasajeros
• Si necesitás algún servicio especial o amenities adicionales

Te responderemos a la brevedad con toda la información.
¡Gracias por elegir viajar con confort, puntualidad y confianza!`;

  constructor() {}

  /**
   * Copia el mensaje al portapapeles y abre el perfil de Instagram
   */
  openInstagram(): void {
    // Copiar mensaje al portapapeles
    navigator.clipboard.writeText(this.defaultMessage).then(() => {
      // Abrir el perfil de Instagram
      window.open(this.instagramProfile, '_blank');
    }).catch(() => {
      // Si falla la copia, solo abre Instagram
      window.open(this.instagramProfile, '_blank');
    });
  }

  /**
   * Obtiene la URL del perfil de Instagram
   */
  getInstagramProfile(): string {
    return this.instagramProfile;
  }

  /**
   * Obtiene el mensaje predefinido
   */
  getDefaultMessage(): string {
    return this.defaultMessage;
  }
}
