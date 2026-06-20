import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FleetComponent } from './fleet/fleet.component';
import { TranslationService, Language } from './core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,HomeComponent, AboutComponent, FleetComponent, ContactComponent],
  template: `
    <div class="t4-wrapper">
      <nav class="t4-nav" [class.scrolled]="isScrolled" [class.menu-open]="menuOpen">
        <div class="nav-inner">
          <div class="nav-logo">
            <img src="assets/images/Logo.png" alt="M&M Logo" class="logo-img">
          </div>
          <ul class="nav-links">
            <li><a href="javascript:void(0)" (click)="scrollTo('inicio')">{{ translations.navbar.inicio }}</a></li>
            <li><a href="javascript:void(0)" (click)="scrollTo('nosotros')">{{ translations.navbar.nosotros }}</a></li>
            <li><a href="javascript:void(0)" (click)="scrollTo('flota')">{{ translations.navbar.flota }}</a></li>
            <li><a href="javascript:void(0)" (click)="scrollTo('contacto')">{{ translations.navbar.contacto }}</a></li>
          </ul>
          
          <div class="language-selector">
            <button 
              *ngFor="let lang of availableLanguages"
              [class.active]="currentLanguage === lang"
              (click)="changeLanguage(lang)"
              [title]="getLanguageName(lang)">
              {{ lang.toUpperCase() }}
            </button>
          </div>

          <button class="hamburger" (click)="toggleMenu()" [class.open]="menuOpen">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div class="mobile-menu" [class.open]="menuOpen">
          <a href="javascript:void(0)" (click)="scrollTo('inicio')">{{ translations.navbar.inicio }}</a>
          <a href="javascript:void(0)" (click)="scrollTo('nosotros')">{{ translations.navbar.nosotros }}</a>
          <a href="javascript:void(0)" (click)="scrollTo('flota')">{{ translations.navbar.flota }}</a>
          <a href="javascript:void(0)" (click)="scrollTo('contacto')">{{ translations.navbar.contacto }}</a>
          <div class="mobile-language-selector">
            <button 
              *ngFor="let lang of availableLanguages"
              [class.active]="currentLanguage === lang"
              (click)="changeLanguage(lang)">
              {{ getLanguageName(lang) }}
            </button>
          </div>
        </div>
      </nav>

      <app-home id="inicio"></app-home>
      <app-about id="nosotros"></app-about>
      <app-fleet id="flota"></app-fleet>
      <app-contact id="contacto"></app-contact>
    </div>
  `,
  styles: [`
    .t4-wrapper {
      --gold: #d4af37;
      --gold-light: #f0d060;
      --gold-dim: #a8882a;
      --black: #060606;
      --black-2: #0d0d0d;
      --white: #ffffff;
      --off-white: #f8f4e8;
      --gray-light: #e8ecf4;
      --gray-mid: #9aa3b8;
      --gray-dark: #4a5568;
      font-family: 'Montserrat', sans-serif;
    }

    .t4-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 20px 0;
      transition: all 0.4s ease;
      background: transparent;

      &.scrolled {
        background: rgba(6,6,6,0.97);
        padding: 14px 0;
        box-shadow: 0 4px 30px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
      }

      &.menu-open {
        background: rgba(6,6,6,0.99);
        box-shadow: 0 4px 30px rgba(0,0,0,0.3);
      }
    }

    .nav-inner {
      max-width: 1480px;
      margin: 0 auto;
      padding: 0 100px 0 40px;
      display: flex;
      align-items: center;
      gap: 40px;
      transform: translateX(-108px);
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }

    .logo-icon {
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, #d4af37, #f0d060);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 1px;
      color: #060606;
    }

    .logo-text {
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .nav-links {
      display: flex;
      gap: 36px;
      margin-left: auto;
      visibility: visible;
      opacity: 1;

      a {
        color: rgba(255,255,255,0.75);
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        transition: color 0.2s;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: #d4af37;
          transition: width 0.3s ease;
        }

        &:hover {
          color: #fff;
          &::after { width: 100%; }
        }
      }
    }

    .language-selector {
      display: flex;
      gap: 6px;
      margin-left: 20px;
      visibility: visible;
      opacity: 1;

      button {
        background: transparent;
        border: 1px solid rgba(212,175,55,0.3);
        color: rgba(255,255,255,0.7);
        padding: 6px 10px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          border-color: rgba(212,175,55,0.7);
          color: #fff;
        }

        &.active {
          background: #d4af37;
          border-color: #d4af37;
          color: #060606;
        }
      }
    }

    .nav-cta {
      background: linear-gradient(135deg, #d4af37, #f0d060);
      color: #060606;
      padding: 10px 24px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      transition: transform 0.2s, box-shadow 0.2s;
      white-space: nowrap;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(212,175,55,0.5);
      }
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      padding: 6px;
      background: none;
      border: none;
      cursor: pointer;
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1001;

      span {
        display: block;
        width: 24px;
        height: 2px;
        background: #fff;
        transition: all 0.3s ease;
      }

      &.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
      &.open span:nth-child(2) { opacity: 0; }
      &.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
    }

    .mobile-menu {
      display: none;
      flex-direction: column;
      background: rgba(6,6,6,0.98);
      padding: 0;
      gap: 16px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease, padding 0.4s ease;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 999;

      &.open {
        max-height: 400px;
        padding: 20px 40px;
      }

      a {
        color: rgba(255,255,255,0.8);
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        padding: 8px 0;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        text-decoration: none;
      }
    }

    .mobile-language-selector {
      display: flex;
      gap: 6px;
      padding-top: 12px;
      border-top: 1px solid rgba(255,255,255,0.1);

      button {
        flex: 1;
        background: transparent;
        border: 1px solid rgba(212,175,55,0.3);
        color: rgba(255,255,255,0.7);
        padding: 6px 8px;
        border-radius: 3px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          border-color: rgba(212,175,55,0.7);
          color: #fff;
        }

        &.active {
          background: #d4af37;
          border-color: #d4af37;
          color: #060606;
        }
      }
    }

    .back-btn-wrap {
      background: var(--black);
      text-align: center;
      padding: 20px;
    }

    .back-btn {
      color: rgba(255,255,255,0.4);
      font-size: 12px;
      letter-spacing: 1px;
      font-family: 'Montserrat', sans-serif;
      transition: color 0.2s;
      cursor: pointer;

      &:hover { color: rgba(255,255,255,0.8); }
    }

    .logo-img {
      height: 150px;
      width: auto;
      object-fit: contain;
    }

    @media (max-width: 1024px) {
      .logo-text { display: none; }
      .nav-links { gap: 20px; }
      .nav-inner { padding: 0 30px; }
      .language-selector { margin-left: 10px; }
    }

    @media (max-width: 768px) {
      .nav-links { 
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      .nav-cta { display: none !important; }
      .language-selector { 
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      .hamburger { display: flex; }
      .mobile-menu { display: flex; }
      .mobile-menu:not(.open) { display: flex; }
      .nav-inner { padding: 0 20px; gap: 20px; transform: none; }
      .logo-img { height: 60px; }
    }

    @media (max-width: 480px) {
      .t4-nav { padding: 16px 0; }
      .t4-nav.scrolled { padding: 12px 0; }
      .hamburger { gap: 4px; padding: 4px; top: 16px; right: 16px; }
      .hamburger span { width: 20px; height: 1.5px; }
      .mobile-menu { padding: 0; }
      .mobile-menu.open { padding: 16px 20px; }
      .mobile-language-selector { gap: 4px; }
      .logo-img { height: 50px; }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  isScrolled = false;
  menuOpen = false;
  
  translations: any = {};
  currentLanguage: Language = 'es';
  availableLanguages: Language[] = [];

  private destroy$ = new Subject<void>();

  constructor(private translationService: TranslationService) {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 1;
      });
    }
  }

  ngOnInit(): void {
    this.availableLanguages = this.translationService.getAvailableLanguages();
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.translations = this.translationService.getCurrentTranslations();

    this.translationService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLanguage = lang;
      });

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

  changeLanguage(language: Language): void {
    this.translationService.setLanguage(language);
    this.menuOpen = false;
  }

  getLanguageName(language: Language): string {
    const names: { [key in Language]: string } = {
      es: 'Español',
      en: 'English',
      pt: 'Português'
    };
    return names[language];
  }

  scrollTo(id: string) {
    this.menuOpen = false;
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        if (id === 'contacto') {
          setTimeout(() => {
            const nameInput = document.getElementById('t4-name');
            if (nameInput) {
              (nameInput as HTMLInputElement).focus();
            }
          }, 500);
        }
      }
    }, 100);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
