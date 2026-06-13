import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ES_TRANSLATIONS } from '../i18n/es';
import { EN_TRANSLATIONS } from '../i18n/en';
import { PT_TRANSLATIONS } from '../i18n/pt';
export type Language = 'es' | 'en' | 'pt';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'preferred-language';
  private readonly AVAILABLE_LANGUAGES: Language[] = ['es', 'en', 'pt'];
  private readonly DEFAULT_LANGUAGE: Language = 'es';

  private translations = {
    es: ES_TRANSLATIONS,
    en: EN_TRANSLATIONS,
    pt: PT_TRANSLATIONS
  };

  private currentLanguageSubject: BehaviorSubject<Language>;
  public currentLanguage$: Observable<Language>;

  private currentTranslationsSubject: BehaviorSubject<any>;
  public currentTranslations$: Observable<any>;

  constructor() {
    const savedLanguage = this.getSavedLanguage();
    this.currentLanguageSubject = new BehaviorSubject<Language>(savedLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();

    this.currentTranslationsSubject = new BehaviorSubject<any>(
      this.translations[savedLanguage]
    );
    this.currentTranslations$ = this.currentTranslationsSubject.asObservable();
  }

  /**
   * Get the currently active language
   */
  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  /**
   * Get the current translations object
   */
  getCurrentTranslations(): any {
    return this.currentTranslationsSubject.value;
  }

  /**
   * Get all available languages
   */
  getAvailableLanguages(): Language[] {
    return [...this.AVAILABLE_LANGUAGES];
  }

  /**
   * Change the current language
   */
  setLanguage(language: Language): void {
    if (!this.AVAILABLE_LANGUAGES.includes(language)) {
      console.warn(`Language "${language}" is not available.`);
      return;
    }

    this.currentLanguageSubject.next(language);
    this.currentTranslationsSubject.next(this.translations[language]);
    this.saveLanguage(language);
  }

  /**
   * Get a specific translation by key path (e.g., 'hero.title')
   */
  get(key: string, defaultValue: string = ''): string {
    const keys = key.split('.');
    let value = this.currentTranslationsSubject.value;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }

    return typeof value === 'string' ? value : defaultValue;
  }

  /**
   * Get translations for a specific section
   */
  getSection(section: string): any {
    const keys = section.split('.');
    let value = this.currentTranslationsSubject.value;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return null;
      }
    }

    return value;
  }

  /**
   * Add a new language (for future extensibility)
   */
  addLanguage(language: Language, translations: any): void {
    if (!this.AVAILABLE_LANGUAGES.includes(language)) {
      this.AVAILABLE_LANGUAGES.push(language);
    }
    this.translations[language] = translations;
  }

  /**
   * Save the language preference to localStorage
   */
  private saveLanguage(language: Language): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, language);
    } catch (error) {
      console.warn('Could not save language preference to localStorage', error);
    }
  }

  /**
   * Get the saved language from localStorage, or use default
   */
  private getSavedLanguage(): Language {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved && this.AVAILABLE_LANGUAGES.includes(saved as Language)) {
        return saved as Language;
      }
    } catch (error) {
      console.warn('Could not read language preference from localStorage', error);
    }
    return this.DEFAULT_LANGUAGE;
  }
}
