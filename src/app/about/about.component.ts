import { Component } from '@angular/core';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
    <section class="t4-about">
      <div class="container">
        <div class="about-header">
          <div class="section-tag">
            <span class="tag-line"></span>
            <span>Nosotros</span>
          </div>
          <h2 class="section-title">
            Más de una década conectando<br>
            <span class="highlight">empresas con el mundo</span>
          </h2>
          <p class="section-desc">
            Somos una empresa de transporte ejecutivo fundada con la misión de brindar traslados
            de alta calidad para directivos, ejecutivos y empresas que exigen excelencia, puntualidad
            y absoluta discreción en cada trayecto.
          </p>
        </div>
    
        <div class="about-values">
          @for (v of values; track v) {
            <div class="value-item">
              <div class="value-icon">
                <span [innerHTML]="v.icon"></span>
              </div>
              <div>
                <h4>{{v.title}}</h4>
                <p>{{v.desc}}</p>
              </div>
            </div>
          }
        </div>
    
        <div class="services-title-row">
          <div class="section-tag">
            <span class="tag-line"></span>
            <span>Nuestros Servicios</span>
          </div>
        </div>
    
        <div class="services-grid">
          @for (s of services; track s) {
            <div class="service-card">
              <div class="card-accent"></div>
              <div class="card-icon" [innerHTML]="s.icon"></div>
              <h3>{{s.title}}</h3>
              <p>{{s.desc}}</p>
              <div class="card-features">
                @for (f of s.features; track f) {
                  <span>{{f}}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
    `,
  styles: [`
    .t4-about {
      background: #f8f4e8;
      padding: 100px 40px;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .about-header {
      max-width: 700px;
      margin-bottom: 60px;
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

    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px, 4vw, 54px);
      font-weight: 400;
      color: #060606;
      line-height: 1.15;
      margin-bottom: 24px;
    }

    .highlight {
      color: #d4af37;
      font-style: italic;
    }

    .section-desc {
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      font-weight: 300;
      line-height: 1.85;
      color: #4a5568;
    }

    .about-values {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      margin-bottom: 80px;
      padding: 40px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 30px rgba(6,6,6,0.08);
      border-left: 4px solid #d4af37;
    }

    .value-item {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .value-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, rgba(212,175,55,0.1), rgba(240,208,96,0.1));
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 20px;
      border: 1px solid rgba(212,175,55,0.2);
    }

    .value-item h4 {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #060606;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }

    .value-item p {
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 300;
      color: #4a5568;
      line-height: 1.7;
    }

    .services-title-row {
      margin-bottom: 32px;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 24px;
    }

    .service-card {
      background: #fff;
      border-radius: 10px;
      padding: 36px 32px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(6,6,6,0.06);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border-bottom: 3px solid transparent;

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 40px rgba(6,6,6,0.12);
        border-bottom-color: #d4af37;
      }

      &:hover .card-accent { width: 100%; }
    }

    .card-accent {
      position: absolute;
      top: 0;
      left: 0;
      height: 3px;
      width: 0;
      background: linear-gradient(90deg, #d4af37, #f0d060);
      transition: width 0.4s ease;
    }

    .card-icon {
      font-size: 32px;
      margin-bottom: 16px;
    }

    .service-card h3 {
      font-family: 'Montserrat', sans-serif;
      font-size: 18px;
      font-weight: 600;
      color: #060606;
      margin-bottom: 12px;
      letter-spacing: 0.5px;
    }

    .service-card p {
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 300;
      color: #4a5568;
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .card-features {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .card-features span {
      display: inline-block;
      background: linear-gradient(135deg, rgba(212,175,55,0.05), rgba(240,208,96,0.05));
      color: #d4af37;
      padding: 6px 16px;
      border-radius: 20px;
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
      border: 1px solid rgba(212,175,55,0.2);
    }

    @media (max-width: 1024px) {
      .t4-about { padding: 80px 30px; }
      .about-values { grid-template-columns: repeat(2, 1fr); gap: 24px; padding: 30px; }
      .services-grid { gap: 20px; }
    }

    @media (max-width: 768px) {
      .t4-about { padding: 60px 20px; }
      .about-header { margin-bottom: 40px; }
      .section-title { margin-bottom: 16px; }
      .about-values { grid-template-columns: 1fr; gap: 16px; padding: 24px; margin-bottom: 50px; }
      .services-grid { grid-template-columns: 1fr; gap: 16px; }
      .services-title-row { margin-bottom: 24px; }
    }

    @media (max-width: 480px) {
      .t4-about { padding: 40px 16px; }
      .about-header { margin-bottom: 32px; }
      .section-title { font-size: clamp(24px, 5vw, 36px); }
      .about-values { gap: 12px; padding: 16px; margin-bottom: 40px; border-left-width: 2px; }
      .value-icon { width: 40px; height: 40px; font-size: 16px; }
      .value-item h4 { font-size: 13px; }
      .value-item p { font-size: 12px; }
      .service-card { padding: 24px 20px; }
      .service-card h3 { font-size: 16px; }
      .service-card p { font-size: 13px; }
    }
  `]
})
export class AboutComponent {
  values = [
    {
      icon: '⚡',
      title: 'Puntualidad',
      desc: 'Llegamos siempre a tiempo. Tu agenda es nuestra prioridad.'
    },
    {
      icon: '🔒',
      title: 'Discreción',
      desc: 'Confidencialidad garantizada en cada viaje y transacción.'
    },
    {
      icon: '✨',
      title: 'Excelencia',
      desc: 'Estándares Premium en servicio y experiencia del cliente.'
    }
  ];

  services = [
    {
      icon: '🏢',
      title: 'Traslados Ejecutivos',
      desc: 'Viajes corporativos con máxima comodidad y profesionalismo.',
      features: ['Vehículos Premium', 'Chofer Profesional', '24/7']
    },
    {
      icon: '✈️',
      title: 'Transfers Aeroportuario',
      desc: 'Conexión perfecta a/desde aeropuerto con puntualidad garantizada.',
      features: ['Monitoreo vuelos', 'Horarios flexibles', 'Tracking']
    },
    {
      icon: '🎯',
      title: 'Eventos Corporativos',
      desc: 'Transporte coordinado para delegaciones y asistentes de eventos.',
      features: ['Flota disponible', 'Itinerarios', 'Servicio integral']
    },
    {
      icon: '🌐',
      title: 'Viajes VIP',
      desc: 'Experiencia de lujo con protección y servicios personalizados.',
      features: ['Discreción total', 'Confort máximo', 'Servicio premium']
    }
  ];
}
