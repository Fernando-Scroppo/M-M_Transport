import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WhatsAppService } from '../core/services/whatsapp.service';
import { InstagramService } from '../core/services/instagram.service';
import { EmailService } from '../core/services/email.service';
import { TranslationService } from '../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <section class="t4-feedback">
      <div class="container">
        <div class="feedback-grid">
          <!-- Columna Izquierda -->
          <div class="feedback-info">
            <div class="section-tag">
              <span class="tag-line"></span>
              <span>{{ translations.contact.sectionTag }}</span>
            </div>
            <h2>{{ translations.contact.title }}<br><span class="highlight">{{ translations.contact.title2 }}</span></h2>
            <p class="info-desc">
              {{ translations.contact.description }}
            </p>

            <!-- Botones de Contacto Redesignados -->
            <div class="contact-buttons">
              

              <!-- Instagram - Secundario -->
              <button class="btn-secondary btn-instagram" (click)="onInstagramClick($event)" aria-label="Seguinos en Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>{{ translations.contact.contacts.instagram }}</span>
              </button>
            </div>
          </div>

          <!-- Columna Derecha - Formulario -->
          <div class="feedback-form-wrap">
            <div class="form-card">
              <h3>{{ translations.contact.form.title }}</h3>
              <p class="form-subtitle">{{ translations.contact.form.subtitle}}</p>

              <!-- Nombre (opcional) -->
              <div class="form-group">
                <label for="feedback-name">{{ translations.contact.form.name }} <span class="optional">{{translations.contact.optional}}</span></label>
                <input id="feedback-name" type="text" [(ngModel)]="feedback.name" [placeholder]="translations.contact.form.placeholder.name">
              </div>

              <!-- Calificación con Estrellas -->
              <div class="form-group">
                <label>{{ translations.contact.form.rating }}</label>
                <div class="rating-stars">
                  <button 
                    *ngFor="let i of [1,2,3,4,5]" 
                    type="button"
                    class="star"
                    [class.active]="i <= feedback.rating"
                    (click)="setRating(i)"
                    (mouseenter)="hoverRating = i"
                    (mouseleave)="hoverRating = 0"
                    [attr.aria-label]="'Calificar ' + i + ' estrellas'"
                  >
                    <span class="star-icon" [style.opacity]="i <= (hoverRating || feedback.rating) ? 1 : 0.3">★</span>
                  </button>
                </div>
                <span class="rating-text" *ngIf="feedback.rating > 0">{{ getRatingText() }}</span>
              </div>

              <!-- Motivo del traslado (opcional) -->
              <div class="form-group">
                <label for="feedback-reason">{{ translations.contact.form.service }} <span class="optional">{{translations.contact.optional}}</span></label>
                <select id="feedback-reason" [(ngModel)]="feedback.reason" class="select-field">
                  <option value="">{{ translations.contact.form.placeholder.service }}</option>
                  <option value="ejecutivo">{{ translations.contact.services.executive }}</option>
                  <option value="aeropuerto">{{ translations.contact.services.airport }}</option>
                  <option value="evento">{{ translations.contact.services.corporate }}</option>
                  <option value="vip">{{ translations.contact.services.vip }}</option>
                  <option value="otro">{{ translations.contact.services.other }}</option>
                </select>
              </div>

              <!-- Comentario/Experiencia -->
              <div class="form-group">
                <label for="feedback-comment">{{ translations.contact.form.message }}</label>
                <textarea 
                  id="feedback-comment" 
                  [(ngModel)]="feedback.comment" 
                  rows="5" 
                  [placeholder]="translations.contact.form.placeholder.message"
                  class="textarea-large"
                ></textarea>
              </div>

              <!-- Botón Principal -->
              <button class="submit-btn" (click)="onSubmit()" [disabled]="isSubmitting">
                <span>{{ isSubmitting ? translations.common.loading : translations.contact.form.submit }}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" *ngIf="!isSubmitting">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                <span class="spinner" *ngIf="isSubmitting"></span>
              </button>

              <!-- Mensaje de Respuesta -->
              <p class="submit-message" [class.error]="submitError" *ngIf="submitMessage">
                {{ submitMessage }}
              </p>

              <!-- Frase de Gratitud -->
              <p class="gratitude-msg">
                {{translations.contact.form.gratitude}}
              </p>
            </div>
          </div>
        </div>
        <!-- WhatsApp - Principal -->
              <button class="btn-primary btn-whatsapp" (click)="onWhatsAppClick($event)" aria-label="Reservar por WhatsApp">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div class="btn-content">
                  <span class="btn-label">{{ translations.buttons.requestService }}</span>
                  <span class="btn-hint">{{ translations.contact.contacts.whatsapp }}</span>
                </div>
              </button>
      </div>

      <!-- Footer -->
      <footer class="t4-footer">
        <div class="footer-inner">
          <div class="footer-logo">
            <img src="assets/images/Logo.png" alt="M&M Logo" class="footer-logo-img">
          </div>
          <p class="footer-tagline">{{ translations.contact.footer.tagline }}</p>
          <p class="footer-copy">{{ translations.contact.footer.copy }}</p>
        </div>
      </footer>
    </section>
  `,
  styles: [`
    .t4-feedback {
      background: #f8f4e8;
      padding-top: 100px;
      min-height: 100vh;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
    }

    @media (max-width: 1024px) {
      .t4-feedback { padding-top: 0;}
      .container { padding: 80px 30px; padding-bottom: 10px; }
    }

    @media (max-width: 768px) {
      .container { padding: 60px 20px; }
    }

    @media (max-width: 480px) {
      .container { padding: 40px 16px; }
    }

    /* Grid Layout */
    .feedback-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: start;
      margin-bottom: 100px;
      margin-left: 50px;
      margin-right: 50px;
    }

    @media (max-width: 1024px) {
      .feedback-grid { gap: 60px; }
    }

    @media (max-width: 768px) {
      .feedback-grid { grid-template-columns: 1fr; gap: 40px; margin-bottom: 60px; }
    }

    /* Section Tag */
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

    /* Left Column - Info */
    .feedback-info h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px, 3.5vw, 52px);
      font-weight: 300;
      color: #060606;
      line-height: 1.15;
      margin-bottom: 24px;
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
      color: #4a5568;
      margin-bottom: 50px;
    }

    /* Contact Buttons */
    .contact-buttons {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-top: 40px;
      border-top: 1px solid rgba(212,175,55,0.15);
    }

    @media (max-width: 480px) {
      .contact-buttons { gap: 12px; padding-top: 30px; }
    }

    /* Primary Button - WhatsApp */
    .btn-primary {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 24px;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #d4af37 0%, #f0d060 100%);
      color: #060606;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
      position: relative;
      overflow: hidden;
      justify-content: center;
    }

    .btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
      transition: left 0.4s ease;
    }

    .btn-primary:hover::before {
      left: 100%;
    }

    .btn-primary:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 40px rgba(212, 175, 55, 0.5);
    }

    .btn-primary svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }

    .btn-primary:hover svg {
      transform: scale(1.1);
    }

    .btn-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
    }

    .btn-label {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 1px;
      display: block;
    }

    .btn-hint {
      font-size: 11px;
      font-weight: 400;
      opacity: 0.8;
      display: block;
    }

    @media (max-width: 480px) {
      .btn-primary {
        width: 100%;
        justify-content: center;
        padding: 16px 20px;
      }
      .btn-content { align-items: center; }
    }

    /* WhatsApp Button - Centrado y más ancho */
    .btn-whatsapp {
      width: 60%;
      max-width: 600px;
      margin: 0 auto 80px;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .btn-whatsapp {
        width: 70%;
        margin: 0 auto 60px;
      }
    }

    @media (max-width: 480px) {
      .btn-whatsapp {
        width: 100%;
        margin: 0 auto 40px;
      }
    }

    /* Secondary Button - Instagram */
    .btn-secondary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 12px 20px;
      border-radius: 8px;
      border: 2px solid #d4af37;
      background: transparent;
      color: #060606;
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-secondary:hover {
      background: rgba(212, 175, 55, 0.1);
      transform: translateY(-2px);
    }

    .btn-secondary svg {
      width: 18px;
      height: 18px;
    }

    @media (max-width: 480px) {
      .btn-secondary { width: 100%; }
    }

    /* Form Card */
    .feedback-form-wrap {
      display: flex;
    }

    .form-card {
      background: #fff;
      backdrop-filter: blur(12px);
      border: 1px solid rgba(212,175,55,0.25);
      border-radius: 12px;
      padding: 48px;
      width: 100%;
      box-shadow: 0 4px 30px rgba(6,6,6,0.08);
    }

    @media (max-width: 768px) {
      .form-card { padding: 36px; }
    }

    @media (max-width: 480px) {
      .form-card { padding: 24px; }
    }

    .form-card h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px;
      font-weight: 300;
      color: #060606;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }

    .form-subtitle {
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 300;
      color: #4a5568;
      margin-bottom: 32px;
      letter-spacing: 0.5px;
    }

    /* Form Groups */
    .form-group {
      margin-bottom: 28px;
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
      margin-bottom: 10px;
    }

    .optional {
      font-size: 10px;
      font-weight: 400;
      color: rgba(212,175,55,0.7);
    }

    /* Text Inputs */
    input.form-group {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(212,175,55,0.2);
      border-radius: 6px;
      padding: 12px 16px;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      color: #fff;
      transition: all 0.3s ease;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      background: rgba(255,255,255,0.8);
      border: 1px solid rgba(212,175,55,0.3);
      border-radius: 6px;
      padding: 12px 16px;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      color: #060606;
      transition: all 0.3s ease;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: rgba(6,6,6,0.4);
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #d4af37;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    }

    /* Select Field */
    .select-field {
      background-color: rgba(255,255,255,0.8) !important;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23d4af37' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 36px;
      appearance: none;
      cursor: pointer;
    }

    .select-field option {
      background: #fff;
      color: #060606;
    }

    /* Textarea */
    .textarea-large {
      resize: vertical;
      min-height: 120px;
      font-family: 'Montserrat', sans-serif;
    }

    /* Rating Stars */
    .rating-stars {
      display: flex;
      gap: 12px;
      margin-bottom: 8px;
    }

    .star {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;
    }

    .star-icon {
      font-size: 28px;
      color: #d4af37;
      transition: opacity 0.2s ease;
    }

    .star:hover .star-icon {
      opacity: 1 !important;
    }

    .star:hover {
      transform: scale(1.15);
    }

    .rating-text {
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      color: #d4af37;
      font-weight: 500;
      display: block;
      margin-top: 6px;
    }

    /* Submit Button */
    .submit-btn {
      background: linear-gradient(135deg, #d4af37 0%, #f0d060 100%);
      color: #060606;
      padding: 14px 28px;
      border-radius: 6px;
      border: none;
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      width: 100%;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 4px 16px rgba(212,175,55,0.3);
      margin-top: 12px;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(212,175,55,0.4);
    }

    .submit-btn:active:not(:disabled) {
      transform: translateY(-1px);
    }

    .submit-btn:disabled {
      opacity: 0.8;
      cursor: not-allowed;
    }

    .submit-btn svg {
      transition: transform 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) svg {
      transform: translateX(2px);
    }

    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(6,6,6,0.3);
      border-top-color: #060606;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Submit Message */
    .submit-message {
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 500;
      margin-top: 14px;
      text-align: center;
      padding: 12px;
      border-radius: 6px;
      background: rgba(212, 175, 55, 0.1);
      color: #060606;
      border: 1px solid rgba(212, 175, 55, 0.3);
      animation: slideIn 0.3s ease-out;
    }

    .submit-message.error {
      background: rgba(220, 53, 69, 0.1);
      color: #dc3545;
      border-color: rgba(220, 53, 69, 0.3);
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Gratitude Message */
    .gratitude-msg {
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      color: #060606;
      margin-top: 20px;
      text-align: center;
      font-style: italic;
      line-height: 1.6;
    }

    /* Footer */
    .t4-footer {
      background: var(--black);
      border-top: 1px solid rgba(212,175,55,0.15);
      padding: 50px 40px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .t4-footer { padding: 40px 20px; }
    }

    @media (max-width: 480px) {
      .t4-footer { padding: 30px 16px; }
    }

    .footer-inner {
      max-width: 1280px;
      margin: 0 auto;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }

    .footer-logo-img {
      height: 160px;
      width: auto;
      object-fit: contain;
    }

    .footer-tagline {
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      color: #d4af37;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }

    .footer-copy {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      color: rgba(255,255,255,0.4);
      letter-spacing: 0.5px;
    }

    /* Responsive Adjustments */
    @media (max-width: 768px) {
      .feedback-info h2 { font-size: clamp(28px, 5vw, 40px); }
      .info-desc { margin-bottom: 35px; }
    }

    @media (max-width: 480px) {
      .feedback-info h2 { font-size: clamp(24px, 6vw, 32px); margin-bottom: 16px; }
      .info-desc { font-size: 13px; margin-bottom: 30px; }
      .form-card h3 { font-size: 22px; }
      .form-card { padding: 20px; }
      .rating-stars { gap: 8px; }
      .star-icon { font-size: 24px; }
    }
  `]
})
export class ContactComponent implements OnInit, OnDestroy {
  translations: any = {};
  private destroy$ = new Subject<void>();

  feedback = {
    name: '',
    rating: 0,
    reason: '',
    comment: ''
  };

  hoverRating = 0;
  isSubmitting = false;
  submitMessage = '';
  submitError = false;

  constructor(
    private whatsAppService: WhatsAppService,
    private instagramService: InstagramService,
    private emailService: EmailService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.translations = this.translationService.getCurrentTranslations();
    this.translationService.currentTranslations$
      .pipe(takeUntil(this.destroy$))
      .subscribe(translations => {
        this.translations = translations;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setRating(stars: number) {
    this.feedback.rating = stars;
  }

  getRatingText(): string {
    const rating = this.feedback.rating;
    if (!rating || !this.translations?.contact?.contacts?.ratingTexts) return '';
    return this.translations.contact.contacts.ratingTexts[String(rating) as '1'|'2'|'3'|'4'|'5'] || '';
  }

  onSubmit() {
    if (this.feedback.comment.trim()) {
      this.isSubmitting = true;
      this.submitMessage = '';
      this.submitError = false;

      this.emailService.sendFeedback(this.feedback).then(
        (response) => {
          this.isSubmitting = false;
          this.submitMessage = this.translations.contact.form.messageOK
          this.submitError = false;
          
          // Reset form después de 2 segundos
          setTimeout(() => {
            this.feedback = {
              name: '',
              rating: 0,
              reason: '',
              comment: ''
            };
            this.submitMessage = '';
          }, 2000);
        },
        (error) => {
          this.isSubmitting = false;
          this.submitMessage = this.translations.contact.messageError;
          this.submitError = true;
          console.error('Error al enviar feedback:', error);
        }
      );
    } else {
      alert('Por favor, cuéntenos su experiencia en el comentario.');
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
