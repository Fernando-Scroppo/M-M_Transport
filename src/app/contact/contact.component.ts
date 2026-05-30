import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WhatsAppService } from '../core/services/whatsapp.service';
import { InstagramService } from '../core/services/instagram.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="t4-contact">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <div class="section-tag">
              <span class="tag-line"></span>
              <span>Contacto</span>
            </div>
            <h2>Hablemos de su<br><span class="highlight">próximo viaje</span></h2>
            <p class="info-desc">
              Nuestro equipo está disponible las 24 horas para coordinar su traslado
              ejecutivo. Contáctenos por el canal de su preferencia.
            </p>

            <div class="social-links">
              <a href="#" class="social-btn whatsapp" aria-label="WhatsApp" (click)="onWhatsAppClick($event)">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
              <a href="#" class="social-btn instagram" aria-label="Instagram" (click)="onInstagramClick($event)">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <div class="contact-form-wrap">
            <div class="form-card">
              <h3>Solicitar información</h3>
              <p class="form-subtitle">Completá el formulario y nos comunicamos a la brevedad</p>

              <div class="form-group">
                <label for="t4-name">Nombre completo</label>
                <input id="t4-name" type="text" [(ngModel)]="form.name" placeholder="Juan García">
              </div>

              <div class="form-group">
                <label for="t4-email">Correo electrónico</label>
                <input id="t4-email" type="email" [(ngModel)]="form.email" placeholder="juan@empresa.com">
              </div>

              <div class="form-group">
                <label for="t4-phone">Teléfono (opcional)</label>
                <input id="t4-phone" type="tel" [(ngModel)]="form.phone" placeholder="+54 11 ????-????">
              </div>

              <div class="form-group">
                <label for="t4-msg">Mensaje</label>
                <textarea id="t4-msg" [(ngModel)]="form.message" rows="4" placeholder="Detalle su consulta o solicitud..."></textarea>
              </div>

              <button class="submit-btn" (click)="onSubmit()">
                <span>Enviar Consulta</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>

              <p class="form-note">
                ⚡ Respondemos en menos de 2 horas hábiles
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer class="t4-footer">
        <div class="footer-inner">
          <div class="footer-logo">
            <img src="assets/images/Logo.png" alt="M&M Logo" class="footer-logo-img">
            <span>M&M</span>
          </div>
          <p class="footer-tagline">Excelencia en cada trayecto desde 2012</p>
          <p class="footer-copy">© 2026 M&M. Todos los derechos reservados.</p>
        </div>
      </footer>
    </section>
  `,
  styles: [`
    .t4-contact {
      background: linear-gradient(180deg, #060606 0%, #0a0a0a 100%);
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 100px 40px;
    }

    @media (max-width: 1024px) {
      .container { padding: 80px 30px; }
    }

    @media (max-width: 768px) {
      .container { padding: 60px 20px; }
    }

    @media (max-width: 480px) {
      .container { padding: 40px 16px; }
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: start;
      margin-bottom: 100px;
    }

    @media (max-width: 1024px) {
      .contact-grid { gap: 60px; }
    }

    @media (max-width: 768px) {
      .contact-grid { grid-template-columns: 1fr; gap: 40px; margin-bottom: 60px; }
    }

    .section-tag {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #d4af37;
      margin-bottom: 20px;
    }

    .tag-line {
      display: block;
      width: 28px;
      height: 1px;
      background: #d4af37;
    }

    .contact-info h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px, 3.5vw, 52px);
      font-weight: 300;
      color: #fff;
      line-height: 1.15;
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      .contact-info h2 { font-size: clamp(28px, 5vw, 40px); }
    }

    @media (max-width: 480px) {
      .contact-info h2 { font-size: clamp(24px, 6vw, 32px); margin-bottom: 16px; }
    }

    .highlight {
      color: #d4af37;
      font-style: italic;
    }

    .info-desc {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 300;
      line-height: 1.9;
      color: rgba(255,255,255,0.5);
      margin-bottom: 40px;
    }

    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 40px;
    }

    @media (max-width: 480px) {
      .contact-details { margin-bottom: 30px; gap: 16px; }
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .detail-icon {
      font-size: 20px;
    }

    .detail-label {
      display: block;
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #d4af37;
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .detail-value {
      display: block;
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      font-weight: 300;
      color: rgba(255,255,255,0.7);
    }

    .social-links {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      padding-top: 40px;
      border-top: 1px solid rgba(212,175,55,0.15);
    }

    @media (max-width: 768px) {
      .social-links { padding-top: 30px; gap: 10px; }
    }

    @media (max-width: 480px) {
      .social-links { flex-direction: column; gap: 8px; padding-top: 24px; }
      .social-btn { width: 100%; justify-content: center; }
    }

    .social-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 4px;
      background: rgba(212,175,55,0.1);
      border: 1px solid rgba(212,175,55,0.3);
      color: #d4af37;
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: all 0.3s ease;

      &:hover {
        background: #d4af37;
        color: #060606;
        border-color: #d4af37;
      }

      svg { transition: transform 0.3s ease; }
      &:hover svg { transform: scale(1.2); }
    }

    .contact-form-wrap {
      display: flex;
    }

    .form-card {
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(212,175,55,0.2);
      border-radius: 12px;
      padding: 40px;
      width: 100%;
    }

    @media (max-width: 768px) {
      .form-card { padding: 30px; }
    }

    @media (max-width: 480px) {
      .form-card { padding: 20px; }
    }

    .form-card h3 {
      font-family: 'Montserrat', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }

    .form-subtitle {
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      font-weight: 300;
      color: rgba(255,255,255,0.4);
      margin-bottom: 28px;
      letter-spacing: 0.5px;
    }

    .form-group {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #d4af37;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .form-group input,
    .form-group textarea {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(212,175,55,0.2);
      border-radius: 4px;
      padding: 12px 16px;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      color: #fff;
      transition: all 0.3s ease;

      &::placeholder {
        color: rgba(255,255,255,0.25);
      }

      &:focus {
        outline: none;
        border-color: #d4af37;
        background: rgba(212,175,55,0.05);
      }
    }

    .submit-btn {
      background: linear-gradient(135deg, #d4af37, #f0d060);
      color: #060606;
      padding: 12px 28px;
      border-radius: 4px;
      border: none;
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      width: 100%;
      justify-content: center;
      margin-top: 8px;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(212,175,55,0.4);
      }
    }

    .form-note {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      color: rgba(212,175,55,0.6);
      margin-top: 12px;
      text-align: center;
    }

    .t4-footer {
      background: rgba(0,0,0,0.3);
      border-top: 1px solid rgba(212,175,55,0.1);
      padding: 40px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .t4-footer { padding: 30px 20px; }
    }

    @media (max-width: 480px) {
      .t4-footer { padding: 20px 16px; }
      .logo-icon { width: 28px; height: 28px; font-size: 10px; }
      .footer-logo span:last-child { font-size: 12px; }
      .footer-tagline { font-size: 11px; }
      .footer-copy { font-size: 9px; }
    }

    .footer-inner {
      max-width: 1280px;
      margin: 0 auto;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #d4af37, #f0d060);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 800;
      color: #060606;
    }

    .footer-logo span:last-child {
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      letter-spacing: 1px;
    }

    .footer-tagline {
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      color: #d4af37;
      margin-bottom: 8px;
    }

    .footer-copy {
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      color: rgba(255,255,255,0.25);
      letter-spacing: 0.5px;
    }

    .footer-logo-img {
      height: 100px;   /* un poco más chico que el del nav */
      width: auto;
      object-fit: contain;
      /*filter: brightness(0) invert(1); si necesitás que sea blanco */
    }

    @media (max-width: 768px) {
      .container { padding: 60px 20px; }
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .form-card { padding: 24px; }
    }
  `]
})
export class ContactComponent {
  form = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(
    private whatsAppService: WhatsAppService,
    private instagramService: InstagramService
  ) {}

  onSubmit() {
    if (this.form.name.trim() || this.form.email.trim()) {
      this.whatsAppService.openWhatsApp();
      this.form = { name: '', email: '', phone: '', message: '' };
    } else {
      alert('Por favor, ingrese su nombre o correo electrónico.');
    }
  }

  onWhatsAppClick(event: Event) {
    event.preventDefault();
    this.whatsAppService.openWhatsApp();
  }

  onInstagramClick(event: Event) {
    event.preventDefault();
    this.instagramService.openInstagram();
  }
}
