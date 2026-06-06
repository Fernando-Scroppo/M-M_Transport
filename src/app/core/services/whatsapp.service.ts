import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {
  private readonly phoneNumber = environment.phoneNumber;
  private readonly PUBLIC_KEY = environment.publicKeyEmail;
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
   * Genera la URL de WhatsApp con el mensaje predefinido
   */
  getWhatsAppUrl(): string {
    console.log('PublicKey desde whatsapp: ', this.PUBLIC_KEY);
    const encodedMessage = encodeURIComponent(this.defaultMessage);
    return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
  }

  /**
   * Abre WhatsApp en una nueva ventana/pestaña con el mensaje predefinido
   */
  openWhatsApp(): void {
    const url = this.getWhatsAppUrl();
    window.open(url, '_blank');
  }

  /**
   * Obtiene el número de teléfono configurado
   */
  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  /**
   * Obtiene el mensaje predefinido
   */
  getDefaultMessage(): string {
    return this.defaultMessage;
  }
}
