import { Component } from '@angular/core';
import { WhatsAppService } from '../core/services/whatsapp.service';
import { TranslationService } from '../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section class="t4-hero">
      <div class="hero-bg">
        <div class="hero-overlay"></div>
        <div class="hero-grid"></div>
      </div>

      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-line"></span>
          <span>{{ translations.hero.badge }}</span>
          <span class="badge-line"></span>
        </div>

        <h1 class="hero-title">
          {{ translations.hero.title }}<br>
          <em>{{ translations.hero.titleItalic }}</em>
        </h1>

        <p class="hero-description">
          {{ translations.hero.description }}
        </p>

        <div class="hero-actions">
          <button class="btn-primary" (click)="scrollToAndOpenWhatsApp('contacto')">
            <span>{{ translations.hero.btnRequest }}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button class="btn-secondary" (click)="scrollTo('nosotros')">
            {{ translations.hero.btnLearnMore }}
          </button>
        </div>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">12+</span>
            <span class="stat-label"> {{ translations.hero.statsExperience }}</span>
          </div>

          <div class="stat">
            <span class="stat-num">100%</span>
            <span class="stat-label">{{ translations.hero.statsSatisfaction }}</span>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="car-placeholder">
          <img
            [src]="cars[currentCarIndex].src"
            [alt]="cars[currentCarIndex].alt"
            class="car-image"
            [class.car-image-visible]="isCarVisible">
          <div class="city-skyline">
            <svg viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="40" width="30" height="60" fill="rgba(212,175,55,0.15)" rx="2"/>
              <rect x="35" y="20" width="20" height="80" fill="rgba(212,175,55,0.1)" rx="2"/>
              <rect x="60" y="50" width="40" height="50" fill="rgba(212,175,55,0.12)" rx="2"/>
              <rect x="105" y="30" width="25" height="70" fill="rgba(212,175,55,0.08)" rx="2"/>
              <rect x="135" y="10" width="15" height="90" fill="rgba(212,175,55,0.15)" rx="2"/>
              <rect x="155" y="35" width="35" height="65" fill="rgba(212,175,55,0.1)" rx="2"/>
              <rect x="450" y="25" width="30" height="75" fill="rgba(212,175,55,0.12)" rx="2"/>
              <rect x="485" y="40" width="45" height="60" fill="rgba(212,175,55,0.08)" rx="2"/>
              <rect x="535" y="15" width="25" height="85" fill="rgba(212,175,55,0.15)" rx="2"/>
              <rect x="565" y="45" width="35" height="55" fill="rgba(212,175,55,0.1)" rx="2"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="scroll-line"></div>
        <span>{{ translations.hero.scroll }}</span>
      </div>
    </section>
  `,
  styles: [`
    .t4-hero {
      min-height: 100vh;
      background: linear-gradient(135deg, #060606 0%, #0d0d0d 40%, #0a0a0a 70%, #050505 100%);
      position: relative;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding: 120px 100px 80px;
    }

    @media (max-width: 1024px) {
      .t4-hero { padding: 100px 60px 60px; }
    }

    @media (max-width: 768px) {
      .t4-hero { padding: 80px 30px 50px; min-height: auto; flex-direction: column; }
    }

    @media (max-width: 480px) {
      .t4-hero { padding: 70px 20px 40px; }
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 70% 50%, rgba(212,175,55,0.12) 0%, transparent 60%),
                  radial-gradient(ellipse at 10% 80%, rgba(6,6,6,0.8) 0%, transparent 50%);
    }

    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(212,175,55,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(212,175,55,0.06) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 1280px;
      margin: 0 auto;
      width: 100%;
      flex: 1;
    }

    .hero-badge {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 32px;
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(212,175,55,0.9);
    }

    .badge-line {
      display: block;
      height: 1px;
      width: 32px;
      background: rgba(212,175,55,0.5);
    }

    .hero-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(52px, 7vw, 96px);
      font-weight: 300;
      color: #fff;
      line-height: 1.05;
      margin-bottom: 28px;
      max-width: 700px;

      em {
        font-style: italic;
        background: linear-gradient(135deg, #d4af37, #f0d060);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }

    @media (max-width: 768px) {
      .hero-title { font-size: clamp(36px, 5.5vw, 52px); margin-bottom: 20px; }
    }

    @media (max-width: 480px) {
      .hero-title { font-size: clamp(28px, 6vw, 40px); line-height: 1.1; }
    }

    .hero-description {
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-weight: 300;
      line-height: 1.8;
      color: rgba(255,255,255,0.6);
      max-width: 500px;
      margin-bottom: 44px;
    }

    @media (max-width: 768px) {
      .hero-description { font-size: 15px; margin-bottom: 32px; }
    }

    @media (max-width: 480px) {
      .hero-description { font-size: 14px; line-height: 1.7; margin-bottom: 24px; }
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 80px;
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      .hero-actions { gap: 12px; margin-bottom: 60px; }
    }

    @media (max-width: 480px) {
      .hero-actions { flex-direction: column; gap: 10px; margin-bottom: 40px; }
    }

    .btn-primary, .btn-secondary {
      font-family: 'Montserrat', sans-serif;
      padding: 14px 32px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      border: none;
    }

    @media (max-width: 480px) {
      .btn-primary, .btn-secondary { padding: 12px 24px; font-size: 12px; width: 100%; justify-content: center; }
    }

    .btn-primary {
      background: linear-gradient(135deg, #d4af37, #f0d060);
      color: #060606;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 32px rgba(212,175,55,0.4);
      }
    }

    .btn-secondary {
      background: transparent;
      border: 1px solid rgba(212,175,55,0.6);
      color: #d4af37;

      &:hover {
        background: rgba(212,175,55,0.1);
        border-color: #d4af37;
      }
    }

    .hero-stats {
      display: flex;
      align-items: center;
      gap: 48px;
      padding-top: 40px;
      border-top: 1px solid rgba(212,175,55,0.15);
    }

    @media (max-width: 768px) {
      .hero-stats { gap: 32px; padding-top: 30px; }
    }

    @media (max-width: 480px) {
      .hero-stats { gap: 24px; padding-top: 24px; }
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat-num {
      font-family: 'Montserrat', sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: #d4af37;
    }

    @media (max-width: 480px) {
      .stat-num { font-size: 24px; }
    }

    .stat-label {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 1px;
      color: rgba(255,255,255,0.35);
      text-transform: uppercase;
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background: rgba(212,175,55,0.1);
    }

    /* Original estilo del automovil y skyline, comentado para probar nueva imagen
    .hero-visual {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 50%;
      height: 100%;
      opacity: 0.8;
      pointer-events: none;
    }

    .car-placeholder {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }

    .car-image {
      width: 90%;
      height: 90%;
      object-fit: contain;
      object-position: bottom right;
      filter: drop-shadow(0 20px 60px rgba(212,175,55,0.15));
    }

    .city-skyline {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 30%;
      opacity: 0.6;
    }
    */ 


    .scroll-indicator {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      opacity: 0.4;
      animation: scroll-pulse 2s infinite;
    }

    @media (max-width: 768px) {
      .scroll-indicator { display: none; }
    }

    .scroll-line {
      width: 1px;
      height: 24px;
      background: linear-gradient(180deg, #d4af37, transparent);
    }

    .scroll-indicator span {
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #d4af37;
    }

    /* Hero Visual - Auto del hero */
    .hero-visual {
      position: relative;
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .car-placeholder {
      position: relative;
      width: 60%;
      height: 760px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Glow dorado detrás del auto */
    .car-placeholder::before {
      content: "";
      position: absolute;
      width: 1000px;
      height: 1000px;
      background: radial-gradient(
        circle,
        rgba(212, 175, 55, 0.20) 0%,
        rgba(212, 175, 55, 0.08) 40%,
        transparent 72%
      );
      filter: blur(45px);
      z-index: 1;
    }

    /* Imagen del auto */
    .car-image {
      position: relative;
      width: 145%;
      max-width: none;
      transform: translateX(80px);
      object-fit: contain;
      object-position: center;
      z-index: 2;
      filter:
          drop-shadow(0 35px 70px rgba(0,0,0,0.7))
          drop-shadow(0 0 35px rgba(212,175,55,0.10))
          brightness(0.96)
          contrast(1.04);
      animation: floatCar 6s ease-in-out infinite;

      /* Transición de cruce (fade) al cambiar de auto */
      opacity: 0;
      transition: opacity 1.2s ease-in-out;
    }

    .car-image-visible {
      opacity: 1;
    }

    /* Skyline */
    .city-skyline {
      position: absolute;
      bottom: 20px;
      width: 100%;
      opacity: 0.45;
      z-index: 0;
    }

    /* Movimiento suave premium */
    @keyframes floatCar {
      0% { transform: translateX(80px) translateY(0px); }
      50% { transform: translateX(80px) translateY(-10px); }
      100% { transform: translateX(80px) translateY(0px); }
    }

    .hero {
      background:
      radial-gradient(circle at 70% 40%,
      rgba(212,175,55,0.08),
      transparent 35%),
      #050505;
    }

    .car-image {
      width: 145%;
      margin-top: 40px;
    }

    @keyframes scroll-pulse {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(8px); }
    }

    /* Media Queries Responsive */
    @media (max-width: 1024px) {
      .hero-visual { width: 40%; opacity: 0.5; }
      .hero-content { max-width: 100%; }
      .car-placeholder { height: 600px; }
      .car-image { width: 130%; }
    }

    @media (max-width: 768px) {
      .t4-hero {
        padding: 100px 20px 60px;
        flex-direction: column;
      }
      .hero-visual { display: none; }
      .hero-content { width: 100%; }
      .hero-title { font-size: clamp(36px, 5vw, 52px); }
      .hero-stats { display: flex; justify-content: center; }
      .stat-divider { display: none; }
    }

    @media (max-width: 480px) {
      .t4-hero { padding: 70px 20px 40px; }
      .hero-visual { display: none; }
      .hero-title { font-size: clamp(28px, 6vw, 40px); }
      .hero-stats { gap: 16px; }
    }
  `]
})
export class HomeComponent {

  translations: any = {};
  private destroy$ = new Subject<void>();

   // Listado de autos que rotan en el hero. Agregá/quitá entradas acá
  // y se reflejan automáticamente en el ciclo de cambio.
  cars = [
    { src: 'assets/images/peugeot-408.png', alt: 'Peugeot 408' },
    { src: 'assets/images/toyota-corolla.png', alt: 'Toyota Corolla' },
    { src: 'assets/images/honda-civic.png', alt: 'Honda Civic' },
    { src: 'assets/images/toyota-hiace-wagon.png', alt: 'Toyota Hiace Wagon' }
  ];

  currentCarIndex = 0;
  isCarVisible = false;
  private carRotationIntervalId?: ReturnType<typeof setInterval>;
  private readonly carRotationMs = 30000; // 30 segundos

  constructor(private whatsAppService: WhatsAppService,private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translations = this.translationService.getCurrentTranslations();
    this.translationService.currentTranslations$
      .pipe(takeUntil(this.destroy$))
      .subscribe(translations => {
        this.translations = translations;
      });

      this.startCarRotation();
  }

   ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.carRotationIntervalId) {
      clearInterval(this.carRotationIntervalId);
    }

  }

  private startCarRotation(): void {
    // Pequeño delay para que el fade-in inicial se note al cargar la sección
    setTimeout(() => this.isCarVisible = true, 50);

    this.carRotationIntervalId = setInterval(() => {
      this.changeCar();
    }, this.carRotationMs);
  }

  private changeCar(): void {
    // Fade out
    this.isCarVisible = false;

    // Espera a que termine la transición de opacidad (1.2s) antes de
    // cambiar la imagen y volver a hacer fade in
    setTimeout(() => {
      this.currentCarIndex = (this.currentCarIndex + 1) % this.cars.length;
      this.isCarVisible = true;
    }, 1200);
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToAndOpenWhatsApp(id: string) {
    this.scrollTo(id);
    setTimeout(() => {
      this.whatsAppService.openWhatsApp();
    }, 500);
  }
}
