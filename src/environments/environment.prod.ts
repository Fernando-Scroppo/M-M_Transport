export const environment = {
  production: true,
  phoneNumber: import.meta.env['NG_APP_PHONE'],
  // Claves de emailjs
  publicKeyEmail: import.meta.env['NG_APP_PUBLIC_KEY_EMAIL'],
  serviceIdEmail: import.meta.env['NG_APP_SERVICE_ID'],
  templateIdEmail: import.meta.env['NG_APP_TEMPLATE_ID']
};