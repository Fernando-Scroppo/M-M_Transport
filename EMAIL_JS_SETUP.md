# Guía de Configuración - EmailJS para M&M Transportes

## Paso 1: Crear cuenta en EmailJS

1. Accede a https://www.emailjs.com/
2. Haz clic en **Sign Up** y registrate con email/GitHub/Google
3. Confirma tu email

## Paso 2: Obtener las Credenciales

### 2.1 Obtener Public Key
1. En el dashboard, ve a **Account > General**
2. Copia tu **Public Key**

### 2.2 Crear Servicio de Email (Gmail)
1. Ve a **Email Services**
2. Click en **Add New Service**
3. Selecciona **Gmail**
4. Nombre: `MM_MAIL_SERVICE`
5. En credenciales, usa tu email `thecallofduty1995@gmail.com`
6. **IMPORTANTE**: Necesitas generar una contraseña de aplicación en Gmail:
   - Ve a https://myaccount.google.com/
   - Seguridad > Contraseña de aplicación
   - Selecciona Mail y Windows
   - Google te genera una contraseña de 16 caracteres
   - Usa esa contraseña en EmailJS
7. Completa la configuración y guarda el **Service ID** (será similar a `service_executive_transport`)

### 2.3 Crear Template de Email
1. Ve a **Email Templates**
2. Click en **Create New Template**
3. Nombre: **Formulario de Feedback**
4. Configura:
   - **To Email**: `{{to_email}}`
   - **From Email**: Tu email o generic email
   - **Subject**: `{{subject}}`

5. En el template HTML, usa esto:
```html
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
      .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; }
      .header { border-bottom: 2px solid #d4af37; padding-bottom: 15px; margin-bottom: 20px; }
      .header h2 { color: #060606; margin: 0; }
      .field { margin: 15px 0; }
      .field-label { color: #d4af37; font-weight: bold; text-transform: uppercase; font-size: 12px; }
      .field-value { color: #060606; margin-top: 5px; }
      .rating { font-size: 24px; color: #d4af37; }
      .footer { border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #999; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>🎉 Nuevo Feedback Recibido</h2>
      </div>
      
      <div class="field">
        <div class="field-label">Cliente</div>
        <div class="field-value">{{from_name}}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Calificación</div>
        <div class="field-value rating">{{rating}}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Motivo del Traslado</div>
        <div class="field-value">{{reason}}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Comentario</div>
        <div class="field-value">{{comment}}</div>
      </div>
      
      <div class="field">
        <div class="field-label">Fecha</div>
        <div class="field-value">{{date}}</div>
      </div>
      
      <div class="footer">
        <p>Este email fue enviado desde el formulario de feedback de M&M Servicios de Traslados Ejecutivos.</p>
      </div>
    </div>
  </body>
</html>
```

6. Copia el **Template ID** (será similar a `template_feedback_form`)

## Paso 3: Configurar las Credenciales en la Aplicación

Abre el archivo `src/app/core/services/email.service.ts` y reemplaza:

```typescript
private readonly SERVICE_ID = 'service_executive_transport';      // Tu Service ID
private readonly TEMPLATE_ID = 'template_feedback_form';          // Tu Template ID
private readonly PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';             // Tu Public Key
```

Con tus valores reales:

```typescript
private readonly SERVICE_ID = 'service_abc123xyz';                 // Ej: Tu Service ID de EmailJS
private readonly TEMPLATE_ID = 'template_abc123xyz';               // Ej: Tu Template ID de EmailJS
private readonly PUBLIC_KEY = 'abc123xyz_public_key_123456';       // Tu Public Key
```

## Paso 4: Probar

1. Guarda los cambios
2. Abre `ng serve` en la terminal
3. Navega a la sección de Feedback
4. Completa el formulario y haz clic en "Enviar comentario"
5. El email debe llegar a `thecallofduty1995@gmail.com`

## Troubleshooting

### ❌ "Error al enviar el comentario"
- Verifica que el Public Key esté correcto
- Verifica que el Service ID esté correcto
- Verifica que el Template ID esté correcto
- Abre la consola del navegador (F12) para ver el error exacto

### ❌ Email no llega
- Verifica la contraseña de aplicación de Gmail
- Revisa que el email sea `thecallofduty1995@gmail.com`
- Revisa la carpeta de spam

### ✅ Todo funciona
- El email llegará con el feedback del cliente
- Se mostrará un mensaje de éxito en el formulario
- El formulario se limpiará automáticamente

## Variables de Template Disponibles

- `{{to_email}}`: Email destino (thecallofduty1995@gmail.com)
- `{{from_name}}`: Nombre del cliente (o "Cliente Anónimo")
- `{{rating}}`: Calificación en estrellas (ej: "5 estrellas")
- `{{reason}}`: Motivo del traslado
- `{{comment}}`: Comentario del cliente
- `{{date}}`: Fecha y hora del envío
- `{{subject}}`: Asunto del email

