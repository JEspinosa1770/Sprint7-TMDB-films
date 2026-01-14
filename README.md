# TMDB Films

Proyecto generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 21.0.5.

## Índice
1. [Descripción](#descripción)
1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
2. [Compilación](#compilación)
2. [Test unitarios](#test-unitarios)
7. [Tecnologías usadas](#tecnologías)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Componentes](#componentes)
5. [Modelos](#modelos)
5. [Servicios](#servicios)
5. [Guards](#guards)
5. [Decisiones y Justificaciones](#decisiones-y-justificaciones)
5. [Vistas del proyecto](#vistas-del-proyecto)
6. [Demo](#demo)
8. [Contribuciones y Contacto](#contribuciones-y-contacto)

## Descripción

La aplicación consiste en un catálogo de películas conectado a la base de datos de **TMDB (The Movie Database)**. Permite a los usuarios explorar un listado de películas populares y acceder a información detallada de cada una de ellas.

El proyecto implementa un sistema completo de autenticación con **login** y **registro** de usuarios, protegiendo las rutas mediante guards. Está diseñado para trabajar con APIs externas, gestión de tokens, enrutamiento avanzado y buenas prácticas de desarrollo en Angular.

## Requisitos

Para poder ejecutar y desarrollar el proyecto, necesitas tener instalado en tu sistema:

* **Node.js**: Se recomienda la versión LTS (Long Term Support).
* **npm** o **Yarn** (o cualquier otro gestor de paquetes de Node.js).
* **Angular CLI**: versión 21.

Opcionalmente se recomienda:
* **Git**: para el control de versiones.
* **Visual Studio Code** o cualquier otro editor de código.

## Instalación

Sigue estos pasos para clonar el repositorio e instalar las dependencias necesarias.

1. Accede a la carpeta local donde quieres clonar el repositorio.
2. Clona el repositorio con la terminal bash:
```bash
$ git clone https://github.com/JEspinosa1770/Sprint7-TMDB-films.git
```
3. Ve a la carpeta del proyecto:
```bash
$ cd tmdb-angular
```
4. Si no lo tienes ya instalado, instala las dependencias del proyecto:
```bash
$ npm install
```

### Configuración de Variables de Entorno

El proyecto utiliza el sistema de **environments** de Angular para gestionar las credenciales de **TMDB API** y **Firebase Authentication** de forma segura y escalable.

#### 1. Configuración del archivo environment.ts

El archivo `src/environment/environment.ts` debe contener:

```typescript
export const environment = {
  production: false,
  tmdbApiToken: 'TU_TOKEN_DE_TMDB_AQUÍ',
  firebaseConfig: {
    projectId: "tu-proyecto-id",
    appId: "tu-app-id",
    storageBucket: "tu-storage-bucket",
    apiKey: "tu-firebase-api-key",
    authDomain: "tu-auth-domain",
    messagingSenderId: "tu-messaging-sender-id"
  }
}
```
#### 2. Uso en el servicio API

El servicio `src/app/core/services/api.ts` importa y usa las variables de entorno:

```typescript
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import type { FilmDetails, FilmsResponse } from '../models/film';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly API_URL = 'https://api.themoviedb.org/3';
  private readonly API_TOKEN = environment.tmdbApiToken;

  async getFilmsBlock(page: number = 1): Promise<FilmsResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.API_TOKEN}`);
    // ... resto del código
  }
  
  // ... resto de métodos
}
```

#### 3. Uso en la configuración de Firebase

El archivo `src/app/app.config.ts` utiliza las credenciales de Firebase desde environment:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environment/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth())
  ]
};
```

#### 4. Cómo obtener tus credenciales

**Para TMDB:**
1. Regístrate en [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Ve a Configuración → API: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
3. Solicita una API Key
4. Copia el **Bearer Token** (no la API Key simple)
5. Pégalo en `environment.tmdbApiToken`

**Para Firebase:**
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Añade una aplicación web
3. Habilita **Authentication** → **Email/Password**
4. En Configuración del proyecto → General, copia las credenciales de configuración
5. Pégalas en `environment.firebaseConfig`



#### 5. Ejecuta el proyecto:
```bash
$ ng serve
```
Una vez el servidor esté en marcha, abre el navegador y ve a la dirección `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques cualquiera de los archivos de origen.

## Compilación

Para construir el proyecto ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los archivos de compilación en el directorio `dist/`. De forma predeterminada, la compilación de producción optimiza el rendimiento y la velocidad de tu aplicación.

## Test unitarios

Para ejecutar los test unitarios con [Vitest](https://vitest.dev/), usa la siguiente instrucción:

```bash
npm run test
```

Para ejecutar los tests en modo watch (se re-ejecutan al hacer cambios):

```bash
npm run test:watch
```

## Tecnologías
* HTML5 y CSS3 
* TypeScript
* Angular 21
* Angular Router
* Angular Forms (Reactive Forms)
* Angular Fire (Firebase Authentication)
* TMDB API
* Vitest (Testing)

## Estructura del proyecto
```
src/
 ├─ app/
 │   ├─ core/
 │   │   ├─ guards/
 │   │   │   ├─ auth.guard.ts
 │   │   │   └─ auth.guard.spec.ts
 │   │   ├─ models/
 │   │   │   └─ film.ts
 │   │   └─ services/
 │   │       ├─ api.ts
 │   │       ├─ api.spec.ts
 │   │       ├─ user-service.ts
 │   │       └─ user-service.spec.ts
 │   ├─ features/
 │   │   ├─ film-detail/
 │   │   │   ├─ film-detail.ts
 │   │   │   ├─ film-detail.html
 │   │   │   ├─ film-detail.css
 │   │   │   └─ film-detail.spec.ts
 │   │   ├─ film-list/
 │   │   │   ├─ film-list.ts
 │   │   │   ├─ film-list.html
 │   │   │   ├─ film-list.css
 │   │   │   └─ film-list.spec.ts
 │   │   ├─ home/
 │   │   │   ├─ home.ts
 │   │   │   ├─ home.html
 │   │   │   └─ home.css
 │   │   ├─ login/
 │   │   │   ├─ login.ts
 │   │   │   ├─ login.html
 │   │   │   ├─ login.css
 │   │   │   └─ login.spec.ts
 │   │   └─ register/
 │   │       ├─ register.ts
 │   │       ├─ register.html
 │   │       ├─ register.css
 │   │       └─ register.spec.ts
 │   ├─ layout/
 │   │   ├─ buttons-nav/
 │   │   │   ├─ buttons-nav.ts
 │   │   │   ├─ buttons-nav.html
 │   │   │   └─ buttons-nav.css
 │   │   ├─ footer/
 │   │   │   ├─ footer.ts
 │   │   │   ├─ footer.html
 │   │   │   └─ footer.css
 │   │   ├─ header/
 │   │   │   ├─ header.ts
 │   │   │   ├─ header.html
 │   │   │   └─ header.css
 │   │   └─ navigation/
 │   │       ├─ navigation.ts
 │   │       ├─ navigation.html
 │   │       └─ navigation.css
 │   ├─ app.ts
 │   ├─ app.html
 │   ├─ app.css
 │   ├─ app.routes.ts
 │   ├─ app.config.ts
 │   └─ app.spec.ts
 └─ environment/
     ├─ environment.ts
     ├─ environment.development.ts
     └─ environment.spec.ts
```

## Componentes

### Componentes de Features

#### _home_
Componente que representa la landing page del proyecto. Es la página de inicio accesible para todos los usuarios, tanto autenticados como no autenticados. Presenta la aplicación y ofrece enlaces para acceder al login o registro.

**Ruta:** `/`

#### _film-list_
Componente principal que muestra el listado de películas populares obtenidas de la API de TMDB. Solo es accesible para usuarios autenticados mediante el `authGuard`. 

Contiene la clase **FilmList** que se encarga de:
- Llamar al servicio `Api` para obtener el listado de películas populares
- Gestionar la paginación de resultados
- Mostrar las películas en formato de tarjetas/grid
- Permitir la navegación hacia el detalle de cada película

**Ruta:** `/list` (protegida)

#### _film-detail_
Componente que muestra información detallada de una película específica. Solo es accesible para usuarios autenticados mediante el `authGuard`.

Contiene la clase **FilmDetail** que se encarga de:
- Obtener el ID de la película desde los parámetros de la ruta
- Llamar al servicio `Api` para obtener los detalles completos de la película
- Mostrar información extendida: sinopsis, puntuación, fecha de estreno, duración, presupuesto, etc.
- Presentar el reparto (cast) de la película
- Mostrar películas similares recomendadas
- Permitir la navegación hacia otras películas relacionadas

**Ruta:** `/movie/:id` (protegida)

#### _login_
Componente que presenta el formulario de inicio de sesión. Utiliza **Reactive Forms** para la validación del email y contraseña.

Contiene la clase **Login** que se encarga de:
- Gestionar el formulario reactivo de login
- Validar los campos de email y contraseña
- Llamar al servicio `UserService` para autenticar al usuario
- Mostrar mensajes de error en caso de credenciales incorrectas
- Redirigir a `/list` después de un login exitoso
- Ofrecer enlace para ir al registro

**Ruta:** `/login`

#### _register_
Componente que presenta el formulario de registro de nuevos usuarios. Utiliza **Reactive Forms** para la validación de los datos.

Contiene la clase **Register** que se encarga de:
- Gestionar el formulario reactivo de registro
- Validar los campos de nombre, email y contraseña
- Llamar al servicio `UserService` para crear un nuevo usuario en Firebase
- Mostrar mensajes de error en caso de datos inválidos o email ya registrado
- Redirigir a `/list` después de un registro exitoso
- Ofrecer enlace para ir al login

**Ruta:** `/register`

### Componentes de Layout

Los componentes de layout proporcionan la estructura visual y la navegación consistente en toda la aplicación.

#### _header_
Componente que representa la cabecera de la aplicación. Se muestra en todas las páginas y contiene el logo de TMDB y la navegación principal.

#### _navigation_
Componente que gestiona el menú de navegación principal. Muestra los enlaces de Home y Listado, cuyo comportamiento dependerá de si el usuario está identificado.

#### _buttons-nav_
Componente auxiliar que presenta botones de navegación específicos para el cambio de página en el listado de películas. 

#### _footer_
Componente que representa el pie de página de la aplicación. 

## Modelos

### _Film_
Modelo base que define la estructura de datos de una película según la respuesta de la API de TMDB.

Queda definido:
```ts
export interface Film {
  id: number,
  title: string,
  overview: string,
  release_date: string,
  original_language: string,
  backdrop_path: string,
  poster_path: string,
  original_title: string,
  adult: boolean,
  popularity: number,
  genre_ids: number[],
  video: boolean,
  vote_average: number,
  vote_count: number
}
```

### _FilmsResponse_
Modelo que define la estructura de la respuesta paginada de la API al solicitar un listado de películas.

Queda definido:
```ts
export interface FilmsResponse {
  page: number;
  results: Film[];
  total_pages: number;
  total_results: number;
}
```

### _Cast_
Modelo que define la estructura de datos de un actor/actriz en el reparto de una película.

Queda definido:
```ts
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}
```

### _Crew_
Modelo que define la estructura de datos del equipo técnico de una película (directores, productores, etc.). Definido para una futura implementación.

Queda definido:
```ts
export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}
```

### _SimilarMovie_
Modelo que define la estructura de datos de películas similares recomendadas.

Queda definido:
```ts
export interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
}
```

### _FilmDetails_
Modelo extendido que incluye toda la información detallada de una película, incluyendo el reparto, y películas similares. Extiende el modelo base `Film`.

Queda definido:
```ts
export interface FilmDetails extends Film {
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  similar: {
    results: SimilarMovie[];
  };
  genres: Array<{
    id: number;
    name: string;
  }>;
  runtime: number | null;
  budget: number;
  revenue: number;
  tagline: string;
}
```

## Servicios

### _api_
Servicio principal que gestiona todas las peticiones a la API de TMDB. Utiliza el patrón **Singleton** mediante `providedIn: 'root'`.

**Métodos principales:**

- `getFilmsBlock(page: number = 1): Promise<FilmsResponse>`  
  Obtiene un listado paginado de películas populares. Realiza una petición GET al endpoint `/movie/popular` con el idioma configurado en español (es-ES). Devuelve una promesa con el objeto `FilmsResponse` que incluye el array de películas y datos de paginación.

- `getImageUrl(path: string | null, size: string = 'w500'): string`  
  Construye la URL completa para obtener imágenes de TMDB. Acepta el path de la imagen y el tamaño deseado (por defecto 'w500'). Si el path es null, devuelve una imagen de error local (`error1.png`).

- `getFilmDetails(movieId: number): Promise<FilmDetails>`  
  Obtiene todos los detalles de una película específica mediante su ID. Utiliza el parámetro `append_to_response=credits,similar` para incluir información del reparto y películas similares en una única petición. Devuelve una promesa con el objeto `FilmDetails` completo.

**Características:**
- Gestión centralizada del token de autenticación de TMDB
- Manejo de errores HTTP
- Configuración de idioma en español para todas las peticiones
- Uso de Fetch API nativa con async/await

### _user-service_
Servicio que gestiona toda la lógica de autenticación de usuarios mediante **Firebase Authentication**. Utiliza signals de Angular para el manejo reactivo del estado del usuario.

**Propiedades:**

- `currentUser = signal<User | null>(null)`  
  Signal que mantiene el estado del usuario actualmente autenticado. Se actualiza automáticamente mediante el listener `onAuthStateChanged` de Firebase.

**Métodos principales:**

- `register(email: string, password: string, name: string): Promise<void>`  
  Registra un nuevo usuario en Firebase. Actualiza el perfil con el nombre proporcionado y redirige automáticamente a `/list` tras el éxito. Lanza errores personalizados en caso de fallo.

- `login(email: string, password: string): Promise<void>`  
  Autentica un usuario existente mediante email y contraseña. Actualiza el signal `currentUser` y redirige a `/list` tras el éxito.

- `logout(): Promise<void>`  
  Cierra la sesión del usuario actual, limpia el signal `currentUser` y redirige a la página de inicio (`/`).

- `handleError(error: any): string` (privado)  
  Método auxiliar que traduce los códigos de error de Firebase a mensajes legibles en español. Maneja casos como email ya registrado, contraseña débil, credenciales inválidas, etc.

**Características:**
- Integración completa con Firebase Authentication
- Manejo de estado reactivo mediante Angular signals
- Navegación automática después de operaciones exitosas
- Mensajes de error personalizados y traducidos
- Listener global de cambios en el estado de autenticación

## Guards

### _auth.guard_
Guard funcional que protege rutas privadas de la aplicación. Implementa la interfaz `CanActivateFn` de Angular Router.

**Funcionamiento:**
- Inyecta el `UserService` para verificar el estado de autenticación
- Verifica si existe un usuario autenticado mediante `authService.currentUser()`
- Si el usuario está autenticado, permite el acceso a la ruta (`return true`)
- Si no está autenticado, redirige a `/login` y bloquea el acceso (`return false`)

**Rutas protegidas:**
- `/list` - Listado de películas
- `/movie/:id` - Detalle de película

Este guard garantiza que solo usuarios autenticados puedan acceder al contenido principal de la aplicación, manteniendo la seguridad y la experiencia de usuario apropiada.

## Decisiones y Justificaciones

### Arquitectura y Organización del Código

#### Estructura de Carpetas: Core/Features/Layout
La estructura de carpetas del proyecto sigue un patrón inspirado en **Atomic Design** y las mejores prácticas de Angular, dividiendo la aplicación en tres grandes bloques:

- **core/**: Contiene la lógica de negocio fundamental (servicios, guards, modelos) que es compartida por toda la aplicación. Estos elementos son singleton y esenciales para el funcionamiento del sistema.

- **features/**: Agrupa los componentes por funcionalidad o característica de negocio (home, film-list, film-detail, login, register). Cada feature es independiente y autocontenida, lo que facilita el mantenimiento y la escalabilidad.

- **layout/**: Componentes estructurales que definen la plantilla visual de la aplicación (header, footer, navigation). Se separan de las features porque son transversales y se reutilizan en toda la app.

Esta organización **facilita la escalabilidad** del proyecto, ya que permite añadir nuevas features sin afectar al código existente, y mejora el **mantenimiento** al tener responsabilidades claramente separadas.

### Gestión de Estado con Signals

Se eligió **Angular Signals** en lugar de RxJS Observables para el manejo del estado del usuario autenticado por las siguientes razones:

1. **Modernidad**: Los signals son la apuesta de futuro de Angular desde la versión 16, representando la dirección hacia la que evoluciona el framework.

2. **Simplicidad**: La API de signals es más intuitiva y requiere menos boilerplate que los observables para casos de uso simples como el estado de autenticación.

3. **Escalabilidad**: Aunque en este proyecto el uso es básico, los signals permiten tener el **control del estado desde cualquier punto de la aplicación** de forma síncrona y eficiente, lo que facilita futuras extensiones como gestión de favoritos, listas personalizadas, preferencias de usuario, etc.

4. **Rendimiento**: Los signals proporcionan actualizaciones granulares y eficientes del DOM sin necesidad de change detection manual.

### Fetch API vs HttpClient

El proyecto utiliza la **Fetch API nativa** de JavaScript en lugar del `HttpClient` de Angular para las peticiones HTTP. Ambas opciones son válidas, pero tienen diferentes ventajas:

**Ventajas de Fetch API (usado actualmente):**
- Más ligero y sin dependencias adicionales
- API estándar de JavaScript, multiplataforma
- Ideal para proyectos pequeños y medianos
- Promesas nativas, fácil integración con async/await
- No requiere importar módulos adicionales de Angular

**Cuándo considerar HttpClient:**
- Proyectos empresariales grandes que requieren interceptors centralizados
- Necesidad de manejo automático de errores HTTP
- Integración profunda con RxJS operators para lógica compleja
- Testing más sencillo con herramientas de Angular

Para una aplicación de este tipo (catálogo de películas con autenticación básica), **Fetch API es una decisión adecuada** que mantiene el bundle size reducido y la complejidad baja. Si el proyecto creciera significativamente y necesitara interceptors para manejo de tokens, caché HTTP o logging centralizado, sería recomendable migrar a HttpClient.

### Testing con Vitest

El proyecto utiliza **Vitest** como framework de testing, que viene integrado por defecto en Angular 21. Esta no es una decisión opcional, sino la **nueva recomendación oficial de Angular** que reemplaza a Karma/Jasmine.

**Ventajas de Vitest:**
- **Velocidad**: Significativamente más rápido que Karma gracias a Vite
- **Compatibilidad**: API compatible con Jest, facilitando la migración
- **Developer Experience**: Hot Module Replacement (HMR) en tests
- **Configuración moderna**: Alineado con las herramientas actuales del ecosistema JavaScript
- **Integración nativa**: Soporte oficial desde Angular 21

### Reactive Forms

Se utilizan **Reactive Forms** en los componentes de login y register porque ofrecen:
- Validación robusta y tipado fuerte
- Mayor control programático del estado del formulario
- Testeo más sencillo y predecible
- Mejor manejo de formularios complejos y validaciones asíncronas

### Firebase Authentication

Se eligió **Firebase Authentication** por:
- Implementación rápida y sencilla de autenticación
- Soporte nativo para email/password sin necesidad de backend propio
- Integración oficial con Angular mediante `@angular/fire`
- Gestión automática de tokens y sesiones
- Escalabilidad hacia otros métodos de autenticación (Google, GitHub, etc.)

### Routing y Guards

La implementación de **guards funcionales** (`CanActivateFn`) en lugar de guards basados en clases refleja el nuevo estándar de Angular, ofreciendo:
- Código más conciso y funcional
- Mejor tree-shaking
- Inyección de dependencias simplificada
- Alineación con las prácticas modernas del framework

## Vistas del proyecto

Proceso de autenticación con *login*
![Autenticacion con login](./public/procesologin12.gif)

Componente *film-list*
![Componente film-list](./public/filmlist.png)

Componente *film-detail*
![Componente film-detail](./public/filmdetail12.gif)
[PENDIENTE DE COMPLETAR - Añadir capturas de pantalla]

## Demo

Puede verse una demo del proyecto en su estado actual en:

[Demo en GitHub Pages](https://jespinosa1770.github.io/Sprint7-TMDB-films/)

## Contribuciones y Contacto
Este proyecto ha sido desarrollado por **Jordi Espinosa** como parte del Sprint 7 del bootcamp de Front End sobre Angular.

Cualquier sugerencia o consulta, contactad con: **[JEspinosa](https://github.com/JEspinosa1770)**
