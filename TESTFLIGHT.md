# QArt — Publicar en TestFlight

Todo el build corre en la nube de Expo (EAS). No necesitas Xcode.

## Requisitos (una sola vez)

1. **Apple Developer Program** activo — 99 USD/año (developer.apple.com).
2. **Cuenta de Expo** gratis — expo.dev.
3. Instalar la CLI en tu terminal:
   ```
   npm install -g eas-cli
   ```

## Paso a paso

Desde la carpeta del proyecto (`~/Documents/ArtHunt`):

### 1. Iniciar sesión en Expo
```
eas login
```

### 2. Vincular el proyecto (crea el projectId en app.json)
```
eas init
```

### 3. Compilar para iOS (App Store / TestFlight)
```
eas build --platform ios --profile production
```
- EAS te pedirá iniciar sesión con tu **Apple ID**.
- Deja que cree automáticamente el certificado de distribución y el provisioning profile (di "yes" cuando pregunte).
- El build tarda ~15-25 min en la nube. Al terminar te da un `.ipa`.

### 4. Subir a TestFlight
```
eas submit --platform ios --profile production
```
- Vuelve a pedir tu Apple ID.
- Sube el build a App Store Connect. En ~5-15 min aparece en la pestaña **TestFlight**.

> Atajo: puedes hacer build + submit juntos con
> `eas build --platform ios --profile production --auto-submit`

### 5. Invitar testers (en appstoreconnect.apple.com)
- **Internal Testing**: hasta 100 personas de tu equipo, sin revisión de Apple. Lo más rápido para probar tú y cercanos.
- **External Testing**: hasta 10,000 testers por link público, pero requiere una revisión ligera de Apple (1-2 días la primera vez).
- Los testers instalan la app **TestFlight** de Apple y aceptan la invitación.

## Notas

- **Número de build**: `eas.json` tiene `autoIncrement: true` y `appVersionSource: remote`, así que EAS sube el build number solo en cada compilación. No tienes que tocarlo.
- **Versión visible**: cuando quieras marcar una versión nueva (ej. 1.1.0), cámbiala en `app.json` → `expo.version`.
- **Encryption**: `ITSAppUsesNonExemptEncryption: false` ya está puesto, así que App Store Connect no te preguntará por cumplimiento de exportación.
- **Cambios de código**: cada vez que quieras un build nuevo con tus últimos cambios, repite los pasos 3 y 4.

## Alternativa sin cuenta de pago (mientras tanto)

Si aún no tienes el Apple Developer Program, puedes seguir probando con un **development build** en tu propio iPhone conectado:
```
eas build --platform ios --profile development
```
Esto genera una app instalable para pruebas internas (requiere registrar el UDID de tu dispositivo, que EAS te ayuda a hacer). No es TestFlight, pero sirve para testear fuera de Expo Go.
