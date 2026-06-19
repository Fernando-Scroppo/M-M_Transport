import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly PHONE_NUMBER = environment.phoneNumber;
  private readonly SERVICE_ID = environment.serviceIdEmail;
  private readonly TEMPLATE_ID = environment.templateIdEmail;
  private readonly PUBLIC_KEY = environment.publicKeyEmail;
  
  constructor() {
    console.log('PhoneNumber: ', this.PHONE_NUMBER);
    console.log('PublicKey: ', this.PUBLIC_KEY);
    this.initializeEmailJS();
  }

  private initializeEmailJS() {
    try {
      emailjs.init(this.PUBLIC_KEY);
    } catch (error) {
      console.error('Error al inicializar EmailJS:', error);
    }
  }

  sendFeedback(feedbackData: {
    name: string;
    rating: number;
    reason: string;
    comment: string;
  }): Promise<any> {
    
    const serviceLabels: Record<string, string> = {
      ejecutivo: 'Traslado Ejecutivo',
      aeropuerto: 'Transfer Aeroportuario',
      evento: 'Evento Corporativo',
      vip: 'Viaje VIP',
      otro: 'Otro tipo de traslado'
    };

    const templateParams = {
      to_email: 'thecallofduty1995@gmail.com',
      from_name: feedbackData.name || 'Cliente Anónimo',
      rating: feedbackData.rating > 0 ? `${feedbackData.rating} estrellas` : 'No calificado',
      reason: serviceLabels[feedbackData.reason] || 'No especificado',
      comment: feedbackData.comment,
      date: new Date().toLocaleString('es-AR'),
      subject: `Nuevo Feedback - Calificación ${feedbackData.rating} de 5 ⭐`
    };

    return emailjs.send(
      this.SERVICE_ID,
      this.TEMPLATE_ID,
      templateParams
    );
  }
}
