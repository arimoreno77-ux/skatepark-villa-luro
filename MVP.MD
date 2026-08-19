# MVP — SKATEPARK VILLA LURO

## 1. Descripción del proyecto

Interfaz web mínima y funcional para SkatePark Villa Luro, accesible mediante un código QR colocado físicamente en el espacio.

El objetivo es brindar información a los visitantes, comunicar las reglas y filosofía del lugar, facilitar donaciones, ofrecer clases de skate y permitir el contacto directo con la comunidad.

---

## 2. Acceso

**Medio principal de acceso:** Código QR.

El usuario escanea el QR desde su teléfono y accede directamente a la interfaz web.

**Requisito:** La interfaz debe estar optimizada principalmente para dispositivos móviles.

---

## 3. Objetivos del MVP

### Objetivo principal

Informar a los visitantes sobre el funcionamiento, las reglas y la filosofía del SkatePark Villa Luro.

### Objetivos secundarios

* Comunicar normas de convivencia y cuidado del espacio.
* Facilitar donaciones para elementos de limpieza y mantenimiento.
* Promocionar clases de skate.
* Permitir solicitar una clase indicando día y horario.
* Recibir comentarios o sugerencias.
* Facilitar el contacto directo mediante WhatsApp.

---

## 4. Contenido y funcionalidades

### 4.1 Información del SkatePark

Contenido introductorio sobre:

* El lugar.
* Su propósito.
* Su comunidad.
* Su filosofía.

---

### 4.2 Reglas y convivencia

Sección destinada a comunicar las normas básicas del espacio.

Temas posibles:

* Buenas conductas.
* Respeto entre usuarios.
* Limpieza.
* Cuidado de las instalaciones.
* Seguridad.
* Convivencia.

Conceptualmente, esta sección funcionará como una especie de:

**“Constitución del SkatePark”**

---

### 4.3 Donaciones

Objetivo: facilitar la colaboración económica para la compra de elementos necesarios para la limpieza y mantenimiento del lugar.

Debe incluir:

* Explicación breve de para qué se utiliza la colaboración.
* Medio de donación.
* Alias / datos de pago.
* Botón para realizar la donación.

---

### 4.4 Clases de skate

Sección destinada a presentar las clases disponibles.

Debe incluir:

* Presentación del servicio.
* Información del profesor.
* Descripción breve de la clase.
* Precio, si corresponde.
* Modalidad, si corresponde.

---

### 4.5 Solicitud de clase

El usuario podrá indicar:

* Nombre.
* Día deseado.
* Horario deseado.
* Medio de contacto.

El objetivo inicial es enviar una solicitud, no necesariamente construir un sistema completo de reservas.

---

### 4.6 Comentarios / sugerencias

Espacio para que los visitantes puedan dejar:

* Comentarios.
* Sugerencias.
* Opiniones sobre el espacio.

La implementación concreta se definirá durante el desarrollo.

---

### 4.7 WhatsApp

Botón flotante de acceso directo a WhatsApp.

Objetivo:

**Facilitar el contacto inmediato con el SkatePark.**

---

## 5. Alcance del MVP

La primera versión será:

* Una página web.
* Responsive.
* Optimizada para móviles.
* Accesible mediante QR.
* Con información y secciones principales.
* Con botones funcionales.
* Con acceso a donaciones.
* Con contacto por WhatsApp.
* Con solicitud de clases.
* Con espacio para comentarios.

---

## 6. Fuera del alcance inicial

No se desarrollará inicialmente:

* Aplicación móvil nativa.
* Sistema complejo de usuarios.
* Login / registro.
* Panel administrativo.
* Sistema avanzado de reservas.
* Base de datos compleja.
* Sistema de pagos propio.

Estas funcionalidades podrán evaluarse posteriormente si el proyecto las necesita.

---

## 7. Flujo principal

```text
ESCANEAR QR
     ↓
PÁGINA DEL SKATEPARK
     ↓
INFORMACIÓN
     ↓
REGLAS / FILOSOFÍA
     ↓
ACCIONES
 ┌───┼────────┬──────────┐
 ↓   ↓        ↓          ↓
DONAR  CLASE  COMENTAR  WHATSAPP
         ↓
     SOLICITAR
       CLASE
```

---

## 8. Requisitos técnicos mínimos

* URL pública.
* Hosting web.
* Diseño responsive.
* Compatibilidad con navegadores móviles.
* Código QR vinculado a la URL pública.
* HTTPS.
* Pruebas desde distintos teléfonos.

---

## 9. Flujo de desarrollo

```text
UX/UI
  ↓
Arquitectura de información
  ↓
Construcción de la interfaz
  ↓
Responsive
  ↓
Funcionalidades
  ↓
Pruebas
  ↓
Publicación
  ↓
QR
  ↓
Prueba física del QR
  ↓
MVP FINAL
```

---

## 10. Estado actual

**UX/UI:** Resuelto / definido.

**Objetivo del MVP:** Definido.

**Funcionalidades principales:** Definidas.

**Arquitectura de información:** Pendiente.

**Desarrollo:** Pendiente.

**Publicación:** Pendiente.

**Código QR:** Pendiente.

---

## 11. Principio del proyecto

> **Una interfaz mínima, accesible y útil que conecte el espacio físico del SkatePark Villa Luro con su comunidad digital.**
