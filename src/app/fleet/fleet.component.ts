import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Vehicle {
  id: string;
  name: string;
  image: string;
  passengers: number;
  luggage: number;
  features: string[];
}

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="t4-fleet">
      <div class="container">
        <div class="fleet-header">
          <div class="section-tag">
            <span class="tag-line"></span>
            <span>{{ translations.fleet.sectionTag }}</span>
          </div>
          <h2 class="section-title">
            {{ translations.fleet.title }}<br>
            <span class="highlight">{{ translations.fleet.titleHighlight }}</span>
          </h2>
          <p class="section-desc">
            {{ translations.fleet.description }}
          </p>
        </div>

        <div class="fleet-grid">
          @for (vehicle of vehicles; track vehicle.id) {
            <div class="vehicle-card">
              <div class="card-accent"></div>
              
              <div class="vehicle-image">
                <img [src]="vehicle.image" [alt]="vehicle.name" />
              </div>

              <div class="vehicle-info">
                <h3 class="vehicle-name">{{ vehicle.name }}</h3>
                
                <div class="vehicle-features">
                  <div class="feature">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    <span>{{ vehicle.passengers }} {{ translations.fleet.passengers }}</span>
                  </div>
                  
                  <div class="feature">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M6 9h12M6 9l-1 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l-1-10M6 9h12M9 5h6M9 5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                    <span>{{ vehicle.luggage }} {{ translations.fleet.luggage }}</span>
                  </div>
                  
                  <div class="feature">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M6 10h12M6 10l.5-2h11l.5 2M6 10v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4"/>
                    </svg>
                    <span>{{ translations.fleet.airConditioning }}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .t4-fleet {
      background: var(--black);
      padding: 100px 40px;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .fleet-header {
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
      color: var(--gold);
      margin-bottom: 20px;
    }

    .tag-line {
      display: block;
      width: 28px;
      height: 1px;
      background: var(--gold);
    }

    .section-title {
      //font-size: 42px;
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px, 4vw, 54px);
      font-weight: 400;
      line-height: 1.15;
      margin-bottom: 24px;
      color: var(--gold);
      //letter-spacing: -0.5px;

      .highlight {
        color: var(--gold);
        font-style: italic;
      }
    }

    .section-desc {
      font-family: 'Montserrat', sans-serif;
      font-size: 15px;
      line-height: 1.85;
      color: rgba(255,255,255,0.7);
      font-weight: 300;
    }

    .fleet-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      margin-top: 60px;
    }

    .vehicle-card {
      position: relative;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(212,175,55,0.2);
      border-radius: 12px;
      padding: 30px;
      transition: all 0.3s ease;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at top right, rgba(212,175,55,0.1), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }

      &:hover {
        border-color: rgba(212,175,55,0.5);
        background: rgba(255,255,255,0.04);
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(212,175,55,0.1);

        &::before {
          opacity: 1;
        }

        .card-accent {
          opacity: 1;
        }
      }
    }

    .card-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--gold), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .vehicle-image {
      margin-bottom: 30px;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(212,175,55,0.1), rgba(0,0,0,0.3));
      border-radius: 8px;
      overflow: hidden;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        filter: brightness(1.1) contrast(1.05);
      }
    }

    .vehicle-info {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .vehicle-name {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 24px;
      color: var(--white);
    }

    .vehicle-features {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .feature {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.5px;
      color: rgba(255,255,255,0.8);

      svg {
        color: var(--gold);
        flex-shrink: 0;
      }
    }

    @media (max-width: 1024px) {
      .t4-fleet {
        padding: 80px 30px;
      }

      .fleet-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
      }

      .section-title {
        font-size: 36px;
      }

      .vehicle-card {
        padding: 24px;
      }

      .vehicle-image {
        height: 180px;
        margin-bottom: 20px;
      }
    }

    @media (max-width: 768px) {
      .t4-fleet {
        padding: 60px 20px;
      }

      .fleet-header {
        margin-bottom: 60px;
      }

      .fleet-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .section-title {
        font-size: 28px;
      }

      .section-tag {
        justify-content: center;
      }

      .vehicle-card {
        padding: 20px;
      }

      .vehicle-image {
        height: 160px;
        margin-bottom: 16px;
      }

      .vehicle-name {
        font-size: 16px;
      }

      .feature {
        font-size: 12px;
      }
    }

    @media (max-width: 480px) {
      .t4-fleet {
        padding: 40px 16px;
      }

      .fleet-header {
        margin-bottom: 40px;
      }

      .section-title {
        font-size: 24px;
        line-height: 1.2;
      }

      .section-desc {
        font-size: 14px;
      }

      .vehicle-card {
        padding: 16px;
        border-radius: 8px;
      }

      .vehicle-image {
        height: 140px;
        margin-bottom: 14px;
        border-radius: 6px;
      }

      .vehicle-name {
        font-size: 14px;
        margin-bottom: 16px;
      }

      .vehicle-features {
        gap: 10px;
      }

      .feature {
        font-size: 11px;
        gap: 10px;
      }

      .feature svg {
        width: 16px;
        height: 16px;
      }
    }
  `]
})
export class FleetComponent implements OnInit, OnDestroy {
  translations: any = {};
  vehicles: Vehicle[] = [];
  private destroy$ = new Subject<void>();

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translations = this.translationService.getCurrentTranslations();
    this.updateVehicles();

    this.translationService.currentTranslations$
      .pipe(takeUntil(this.destroy$))
      .subscribe(translations => {
        this.translations = translations;
        this.updateVehicles();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateVehicles(): void {
    const t = this.translations.fleet?.vehicles;
    if (!t) return;

    this.vehicles = [
      {
        id: 'peugeot-408',
        name: t.peugeot408.name,
        image: 'assets/images/vehicles/peugeot-408.png',
        passengers: 2,
        luggage: 3,
        features: t.peugeot408.features
      },
      {
        id: 'honda-civic',
        name: t.hondaCivic.name,
        image: 'assets/images/vehicles/honda-civic.png',
        passengers: 2,
        luggage: 3,
        features: t.hondaCivic.features
      },
      {
        id: 'toyota-corolla',
        name: t.toyotaCorolla.name,
        image: 'assets/images/vehicles/toyota-corolla.png',
        passengers: 2,
        luggage: 2,
        features: t.toyotaCorolla.features
      },
      {
        id: 'toyota-hiace-wagon',
        name: t.toyotaHiace.name,
        image: 'assets/images/vehicles/toyota-hiace-wagon.png',
        passengers: 4,
        luggage: 4,
        features: t.toyotaHiace.features
      }
    ];
  }
}
