# Plan de Fundación — Plataforma Clínica CEHMEFE

**Reemplazo de MedicPro con API propia, app móvil de pacientes (Flutter) y panel administrativo web**

> Documento de investigación y arquitectura. **No incluye código de implementación** — es la base para planificar. Todo lo de MedicPro se obtuvo navegando la app en vivo (`medicprohn.app/dragarcia`) e inspeccionando su tráfico de red; el stack a replicar se obtuvo leyendo `facturahn-monorepo` y `facturahn-flutter`.

**Fecha:** 25 de agosto de 2026 · **Versión:** 2 (borrador para revisión)
**Autor:** Investigación asistida (Claude)

> **Novedades v2:**
> 1. **La API usa Postgres directo (no Supabase) y todo el auth lo maneja la propia API con JWT.** Se conserva de facturahn el patrón Fastify + Zod + OpenAPI y el módulo `route/service`, pero se sustituye la capa de datos y de identidad.
> 2. **Alcance afinado con el correo de la Dra. Monica García** (25/ago): se confirma qué módulos usa realmente, se elevan las **Plantillas** a función central y se define el expediente en **dos vías clínicas: Embarazo y Control Ginecológico**. Se sacan de v1: CRM, Telemedicina y Enlace público de citas.

---

## 0. Resumen ejecutivo

CEHMEFE (Centro Hondureño de Medicina Fetal) opera hoy sobre **MedicPro**, un SaaS médico que es un **monolito CodeIgniter 3 (PHP) + MySQL**, renderizado en servidor, **sin API REST**. No se puede construir una app móvil moderna encima porque no expone datos de forma programática. Construir plataforma propia es correcto y necesario.

Existe en la casa un stack probado — `facturahn` (API Fastify, app Flutter con Riverpod) — que sirve de **molde de patrones** (estructura del monorepo, módulos de la API, esquemas Zod, OpenAPI/Scalar, arquitectura Flutter feature-first, interceptor de auth, offline, push). **Se reutiliza ese patrón, pero con dos decisiones propias de CEHMEFE:** base de datos **Postgres directa** (sin Supabase) y **autenticación 100% gestionada por la API mediante JWT**.

Tres piezas nuevas sobre una sola API:

1. **API** (`@cehmefe/api`) — Fastify + **Postgres** (vía Drizzle/Prisma), multi-tenant por `clinic_id`, **auth propio con JWT** (access + refresh, roles en los claims), OpenAPI/Scalar. Es el cerebro que MedicPro nunca expuso.
2. **Panel administrativo web** (`@cehmefe/web`, Next.js) — lo que la doctora y recepción hacen hoy en MedicPro: agenda, expedientes (dos vías clínicas), fichas, plantillas, recetas, exámenes, cobros, reportes, estadísticas.
3. **App móvil de pacientes** (Flutter) — superficie nueva que MedicPro no explota: el paciente ve/solicita citas, ve recetas y resultados, y recibe notificaciones.

El sitio `cehmefe.com` ya está terminado (marketing estático + blog) y hoy canaliza citas por WhatsApp; se integrará con el nuevo agendamiento más adelante.

---

## PARTE 1 — Qué usa la Dra. en MedicPro (investigación)

### 1.1 Qué es MedicPro por dentro

| Aspecto | Hallazgo |
|---|---|
| **Framework** | CodeIgniter 3 (PHP) — confirmado por rutas filtradas en errores: `/home/apphn/public_html/dragarcia/application/controllers/...` y `Configuraciones_model` |
| **Base de datos** | MySQL (error `mysqli::real_connect` visible) |
| **Frontend** | Server-side rendering + Bootstrap 3, jQuery, DataTables, FullCalendar, Select2, SweetAlert |
| **Multi-tenancy** | Por **slug de URL** — cada médico/clínica vive bajo su ruta (`/dragarcia/`) sobre la misma instancia |
| **API REST** | **No existe.** Todo es AJAX de jQuery a controladores que devuelven HTML parcial o JSON ad-hoc |
| **Integraciones** | WhatsApp y correo para notificaciones; telemedicina en subdominio aparte (`medicprosv.app`) |

**Implicación:** no hay nada reutilizable a nivel de backend. Lo que sí sirve MedicPro es como **especificación funcional viva**: dice exactamente qué campos, flujos y catálogos necesita la doctora.

### 1.2 Escala real de esta clínica (dashboard)

- **~3,679 expedientes** registrados · **~1,106 citas** reservadas al mes · **~46 citas/día** promedio.

Define el orden de magnitud para migración futura, índices y paginación.

### 1.3 Mapa de módulos (endpoints reales observados)

Rutas relativas a `/dragarcia/`, capturadas del tráfico o extraídas del JS de cada página. Sirven como catálogo de capacidades a replicar.

**Agenda / Citas** — `citas/agenda/cargar_citas_agenda?idm=&idmed=&start=&end=` (JSON de citas), `add_event`, `cargar_citas_col`, `Agenda/whatsapp_notification`; `ver_citas/`: `cargar_citas_pendientes`, `cargar_pacientes_espera`, `cargar_citas_procesadas`, `capturar_llegada`, `confirmar_cita`, `confirmar_cita_manual`, `cancelar_cita`, `reprogramar_cita`, `procesar_cita`, `asignar_paciente`, `enviar_notificacion`, `recordar_cita`, contadores.

Forma de una cita (JSON real): `title, idreservacita, id_agenda, start, end, idme(médico), idexp(expediente), status, tipoconsulta, observaciones, permisos, medico, backgroundColor`.

**Expediente** — `Nuevo_expediente/guardar_expediente` + loaders (`load_tipos, load_doctor, load_formas_conctactar, load_aseguradoras, load_profesiones`), `Buscar_expediente/cargar_expedientes`, `Buscar_paciente/cargar_pacientes`. Acciones por fila: `clinica/historial_clinico?id=`, `recepcion/expediente?id=`, `clinica/archivos/lista_documentos?ide=`, `clinica/imagenes?id=`.

Campos (~55) incluyen bloque **madre/padre** (`madre, correo_madre, telefono_cel_madre, telefono_casa_madre, padre, ...`), documento, contacto, aseguradora/póliza, facturación, referido por. → confirma enfoque materno-fetal.

**Fichas clínicas** — `hospital/select_ficha_gineco?id=` ofrece: Control Prenatal (`hospital/Ficha_CPrenatal`), Mastología/Ginecológica (`hospital/ficha_ginecologica`), Colposcopia (`clinica/ficha_colposcopia`), Reportes (`clinica/Ficha_reporte`). Pestañas de la ficha prenatal: Antecedentes · Antropometrías · Historia clínica · Nota evolutiva · Recetas · Solicitud de exámenes · Resultados · Formatos int. · Doc. externos. Bloque obstétrico: `G, P1, P2, A, V, FUR, FPR, FPP, amenorrea, semanas_ultra, dias_ultra, furultra, fppultra, desfase`. Diagnósticos con **CIE-11**. `Ficha_reporte` tiene pestañas por **trimestre** (1º · 2º-3º · 1º avanzado · Mama · Ginecología).

**Recetas/Medicamentos, Exámenes, Diagnósticos** — `Recetas/nuevo_medicamento|guardar_medicamento`, `Examenes/listado_examanes|agregar_examen`, `Diagnostico/cargar_diagnostico_table` + CIE-11.

**Cobros y gastos** — `Cobros/cobros_load|sistema_cobro|detalle`, `cobros/historial_cobros` (filtro fecha+médico), `facturacion/Gastos`.

**Estadísticas** — `Estadisticas/obtener_estadisticas|top_diagnosticos|top_diagnosticos_mensual`.

**Configuraciones** — `Examenes, medicamentos, plantillas, Horarios, Firma, Empresa, usuarios, tipos_imagenes`; `administrador/Bitacora` (auditoría).

**Media** — imágenes/ultrasonidos (`clinica/imagenes`), documentos (`documentos/cargar_documentos`).

### 1.4 (Referencia) módulos que MedicPro trae pero son genéricos

CRM, telemedicina, enlace público de citas, inventario/farmacia, RRHH, contabilidad, multi-sucursal. La Dra. **no** usa la mayoría (ver §1.5).

### 1.5 ✅ Qué usa realmente la Dra. (confirmado por ella, correo 25/ago)

Este es el filtro definitivo de alcance para v1.

| Módulo | ¿Lo usa? | Qué construir |
|---|---|---|
| **Agenda – Citas** (agenda, crear/ver eventos, ver citas) | **Sí** | Módulo completo de agenda + citas |
| **Expediente** (nuevo, buscar) | **Sí** | Expediente completo, con **dos vías: Embarazo / Control Ginecológico** |
| ↳ Dentro del expediente | **Usa todo** | Fichas clínicas, antropometría, diagnósticos, recetas, exámenes, imágenes |
| **Cobros y gastos** (caja, gastos, historial) | **Sí** | Módulo de cobros + gastos + historial |
| **Reportes** | **Sí** | Reportes clínicos (ultrasonido por trimestre) + operativos |
| **Estadísticas** | **Sí** | Dashboard |
| **Configuraciones** | **Sí (personaliza)** | Catálogos; **Plantillas es su capa clave** (ver abajo) |
| **CRM** | **No** | ❌ Fuera de v1 |
| **Telemedicina** | **No** | ❌ Fuera de v1 |
| **Enlace para citas** (booking público en MedicPro) | **No** | ❌ No replicar el de MedicPro (ver nota app móvil §3.7) |

**Dos vías clínicas del expediente.** La Dra. divide cada paciente en **Embarazo** (control prenatal, con reportes de ultrasonido por trimestre) o **Control Ginecológico**. Este es el eje del modelo clínico: no necesitamos las 4 fichas genéricas de MedicPro, sino estas dos rutas bien hechas (colposcopia/mastología entran como parte del seguimiento ginecológico si ella lo requiere — a validar).

**Plantillas = función de primera clase.** Textual de la Dra.: *"en plantillas yo empecé a crear las mías a partir de Retiro Prenatal… ya traía todo los exámenes y medicamentos que me es muy útil, y yo solo he ido adicionando lo que necesito"*. Es decir, una **plantilla agrupa exámenes + medicamentos + indicaciones preseleccionados** y se aplica de un clic dentro de la consulta. El sistema trae plantillas por defecto y la clínica va creando las suyas. **Modelar esto explícitamente** (`templates` + `template_items`) y darle buena UI en el panel: es lo que le ahorra tiempo real.

### 1.6 El sitio cehmefe.com hoy

React 19 + Vite 7 + Tailwind v4, blog **MDX**, bilingüe (ES/EN), deploy en **GitHub Pages**. Sin API: solo enlaces a **WhatsApp** (`wa.me/50431680805`), Instagram, Google Maps, `mailto`, `tel:`. El botón "Agendar cita" lleva a contacto → WhatsApp. **No hay booking real.** Cuando exista el endpoint de disponibilidad, el sitio puede pasar a agendamiento en línea.

---

## PARTE 2 — Patrones a reutilizar de facturahn

Se reutiliza el **patrón** de facturahn, no todas sus tecnologías. Lo que se conserva vs. lo que cambia:

| Área | facturahn (referencia) | CEHMEFE (decisión) |
|---|---|---|
| Monorepo | pnpm + Turborepo | **Igual** |
| API framework | Fastify 5 (ESM) + Zod (`fastify-type-provider-zod`) | **Igual** |
| Docs | OpenAPI 3.1 + Scalar (`/docs`) | **Igual** |
| Patrón de módulo | `X.route.ts` + `X.service.ts`, filtro por tenant | **Igual** (tenant = `clinic_id`) |
| Errores | `AppError(status, code, msg)` + envelope `{error:{code,message}}` | **Igual** |
| **Base de datos** | **Supabase** (`@supabase/supabase-js`) | ⚠️ **Postgres directo** (Drizzle/Prisma) |
| **Auth** | **Supabase Auth** (valida JWT de Supabase) | ⚠️ **JWT propio emitido por la API** |
| **Storage** | AWS S3 (presigned) | S3-compatible (**DigitalOcean Spaces** o AWS S3) |
| PDF | Puppeteer/pdfkit/nunjucks | **Igual** |
| App móvil | Riverpod + go_router + Dio + Freezed + Drift + FCM | **Igual** (auth cambia a JWT propio) |

**Patrón de módulo (a copiar tal cual):**
```
modules/patients/
  patients.route.ts     ← rutas Fastify + Zod inline + tags OpenAPI + requiredRoles
  patients.service.ts    ← lógica + queries a Postgres (filtra SIEMPRE por clinic_id)
```
Convenciones: rutas `/v1/...`, paginación (`page`,`pageSize`), filtros tri-estado, búsqueda saneada, soft-delete (`archived`), respuestas tipadas por código de estado.

**Flutter (a copiar):** arquitectura feature-first (`app/`, `core/`, `features/<x>/{data,domain,presentation}`), `core/network/` con `dio_client` + interceptor de auth. El `design.md` de facturahn (53 KB) documenta pantalla por pantalla, offline con Drift, biométrico y push FCM — es plantilla directa.

---

## PARTE 3 — Plan de fundación de la nueva plataforma

### 3.1 Principio rector y arquitectura

**Un backend, tres clientes.** La misma API sirve al panel web (staff) y a la app móvil (pacientes). Datos en Postgres, identidad emitida por la propia API.

```
                     ┌───────────────────────────────┐
                     │  Postgres (datos)  +  Object   │
                     │  Storage S3/DO Spaces (media)  │
                     └───────────────▲───────────────┘
                                     │ (pool de conexiones + migraciones)
                     ┌───────────────┴───────────────┐
                     │      @cehmefe/api (Fastify)     │
                     │  REST /v1 + OpenAPI/Scalar      │
                     │  AUTH PROPIO (JWT access+refresh)│
                     │  multi-tenant: clinic_id         │
                     └──▲──────────▲──────────────▲────┘
        Bearer JWT staff│          │              │ Bearer JWT paciente
             ┌──────────┘          │              └──────────┐
     ┌───────┴────────┐  ┌─────────┴────────┐      ┌─────────┴─────────┐
     │ @cehmefe/web   │  │ cehmefe.com      │      │ App Flutter        │
     │ (Next.js)       │  │ (landing +       │      │ (pacientes)        │
     │ Panel staff     │  │  booking futuro) │      │                    │
     └─────────────────┘  └──────────────────┘      └────────────────────┘
```

### 3.2 Monorepo propuesto

```
cehmefe-monorepo/
  apps/
    api/     ← @cehmefe/api   (Fastify + Postgres + JWT propio)
    web/     ← @cehmefe/web   (Next.js — panel staff)
  packages/
    db/           ← esquema + migraciones (Drizzle o Prisma) + cliente Postgres
    tsconfig/     ← configs compartidas
    shared/       ← tipos/DTOs compartidos web↔api (derivables del OpenAPI)
  # App Flutter en repo aparte: cehmefe-flutter (como facturahn-flutter)
  # Landing ya existe: cehmefe-landing-page
```

### 3.3 Base de datos: Postgres directo

- **Motor:** PostgreSQL gestionado (p. ej. DigitalOcean Managed Postgres, dado que ya usan DO). Pool de conexiones con `pg`/`postgres.js`.
- **Capa de acceso / ORM — DECISIÓN A TOMAR:**
  - **Drizzle ORM** *(recomendado)*: TypeScript-first, SQL-cercano, `drizzle-kit` para migraciones, `drizzle-zod` genera los esquemas Zod → encaja perfecto con el `fastify-type-provider-zod` que ya trae el patrón facturahn (tipos de punta a punta). Ligero y rápido.
  - **Prisma** *(alternativa familiar)*: ustedes ya tienen `prisma-express-typescript-boilerplate`; migraciones y modelado muy maduros, arranque más rápido si el equipo ya lo domina. Un poco más pesado en runtime.
  - Recomendación: **Drizzle** por la sinergia con Zod/OpenAPI, salvo que prefieran la familiaridad de Prisma.
- **Migraciones versionadas** en `packages/db` (nada de cambios manuales al esquema).
- **Aislamiento por tenant:** todo query filtra por `clinic_id` en el service (la API es el guardián). Opcionalmente, **Row Level Security** en Postgres como segunda barrera (`SET app.clinic_id` por transacción).
- Índices críticos: `appointments(clinic_id, doctor_id, start)`, `patients(clinic_id, codigo)`, búsqueda de pacientes con `pg_trgm` (nombre/documento).

### 3.4 Auth: 100% en la API con JWT

Reemplaza por completo a Supabase Auth. La API es la autoridad de identidad.

- **Credenciales:** email/teléfono + contraseña con hash **argon2id** (o bcrypt). Nunca se guarda la contraseña en claro.
- **Tokens:**
  - **Access token (JWT)** corto (p. ej. 15 min), firmado por la API (`@fastify/jwt`), con claims: `sub` (user_id), `clinic_id`, `role`, `patient_id?`.
  - **Refresh token** largo (p. ej. 30 días), **opaco y almacenado/hasheado en DB** (`refresh_tokens`), con **rotación** y revocación (logout, cambio de contraseña, robo).
- **Endpoints de auth:** `POST /v1/auth/login`, `POST /v1/auth/refresh`, `POST /v1/auth/logout`, `POST /v1/auth/forgot` + `reset`, `POST /v1/auth/change-password`.
- **Dos poblaciones de usuarios** en la tabla `users`, discriminadas por `type`:
  - **Staff** (`admin`, `doctor`, `reception`) → vinculados a `clinic_members(user_id, clinic_id, role)`.
  - **Pacientes** (`patient`) → vinculados a `patient_accounts(user_id, patient_id, clinic_id)`; acceden **solo a su propio expediente**.
- **Autorización por rol** en un plugin de auth (equivalente al `requiredScopes` de facturahn, pero por rol): cada ruta declara `config.requiredRoles`. El plugin verifica el JWT, carga `clinic_id`/`role`/`patient_id` y los inyecta en `request.auth`.
- **Regla de oro:** `clinic_id` y `patient_id` **siempre** salen del token verificado, nunca del body/query (previene fuga entre pacientes/clínicas).
- **Registro de pacientes:** por **invitación/vinculación** (recepción vincula un expediente existente a un email → el paciente activa su cuenta). Evita duplicar los ~3,600 expedientes y es lo apropiado para datos de salud.

### 3.5 Modelo de datos propuesto (Postgres)

Todas con `id uuid`, `clinic_id uuid` (salvo globales), `created_at`, `updated_at`, y `archived` donde aplique.

| Tabla | Campos principales | Notas |
|---|---|---|
| `clinics` | name, slug, settings(jsonb) | tenant raíz |
| `users` | email/phone, password_hash, type(staff/patient), status | **auth propio** |
| `refresh_tokens` | user_id, token_hash, expires_at, revoked_at, rotated_from | rotación/revocación |
| `clinic_members` | user_id, clinic_id, role(admin/doctor/reception), doctor_profile | staff |
| `patients` | codigo, nombre, apellido, fecha_nac, sexo, doc{}, contacto{}, **madre{}, padre{}**, aseguradora{}, profesion, referido_por, med_cabecera, **via_clinica(embarazo/ginecologico)** | = expediente (~55 campos) |
| `patient_accounts` | user_id, patient_id | vincula paciente ↔ login móvil |
| `appointments` | patient_id, doctor_id, start, end, tipo_consulta, status, observaciones, color | cita |
| `agenda_events` | doctor_id, start, end, title, tipo | eventos no-cita |
| `clinical_records` | patient_id, doctor_id, fecha, via(embarazo/ginecologico), motivo | cuadro clínico (cabecera) |
| `prenatal_forms` | record_id, G,P,A,V, FUR, FPP, amenorrea, semanas, examen_fisico | vía embarazo |
| `ultrasound_reports` | record_id, trimestre(1/2-3/avanzado/mama/gineco), payload(jsonb) | reportes estructurados |
| `gyneco_forms` | record_id, antecedentes, hallazgos, (colposcopia/mama opc.) | vía ginecológica |
| `anthropometry` | record_id, peso, talla, imc, fc, fr, presion | signos vitales |
| `diagnoses` | record_id, texto, cie11_code | hasta 3 + CIE-11 |
| `prescriptions` + `prescription_items` | record_id / medication_id, indicaciones | receta |
| `lab_orders` + `lab_results` | record_id / exam_id, categoria, resultado | exámenes |
| **`templates`** | nombre, via, descripcion, is_default, owner_id | **plantillas de la Dra.** |
| **`template_items`** | template_id, kind(exam/medication/indication), ref_id, texto, dosis | exámenes+medicamentos preseleccionados |
| `media_files` | patient_id/record_id, tipo_imagen, storage_key, mime | imágenes/ultrasonidos (S3/Spaces) |
| `charges` | patient_id, doctor_id, precio, notas, status | cobro |
| `expenses` | doctor_id, monto, categoria, fecha | gasto |
| **Catálogos** | `medications`, `exams(categoria)`, `image_types`, `insurers`, `professions`, `cie11_diagnoses` | por clínica o globales |
| `audit_log` | actor_id, action, entity, entity_id, meta(jsonb) | bitácora |

### 3.6 API — módulos y endpoints v1

Patrón facturahn (`route`/`service`, Zod, OpenAPI, filtro por `clinic_id`, `requiredRoles`). Superficie inicial (ya recortada al alcance real de la Dra.):

```
Auth (propio)
  POST /v1/auth/login | refresh | logout | forgot | reset | change-password
  POST /v1/auth/patient-link            vincular paciente ↔ cuenta (invitación)
  GET  /v1/me

Agenda (staff)
  GET  /v1/appointments   ?doctorId&start&end&status   (feed del calendario)
  POST /v1/appointments   |  PATCH /v1/appointments/:id (reprogramar/estado)
  POST /v1/appointments/:id/check-in     capturar llegada
  POST /v1/appointments/:id/notify       recordatorio WhatsApp/correo
  GET/POST/PATCH/DELETE /v1/agenda/events

Pacientes / Expedientes
  GET/POST/PATCH /v1/patients   (+ búsqueda paginada por nombre/documento)
  GET  /v1/patients/:id  |  GET /v1/patients/:id/records

Fichas clínicas (dos vías)
  POST /v1/records                      crea cuadro (via: embarazo|ginecologico)
  GET  /v1/records/:id
  POST /v1/records/:id/prenatal | /ultrasound | /anthropometry | /diagnoses
  POST /v1/records/:id/prescriptions    (puede instanciarse desde una plantilla)
  POST /v1/records/:id/lab-orders  |  PATCH /v1/lab-results/:id
  GET  /v1/records/:id/pdf              (Puppeteer → Storage)

Plantillas  ⭐ (capa clave de la Dra.)
  GET/POST/PATCH/DELETE /v1/templates   ?via
  POST /v1/records/:id/apply-template/:templateId   vuelca exámenes+medicamentos

Media
  POST /v1/media                        presigned upload (imágenes/ultrasonidos)
  GET  /v1/patients/:id/media

Cobros y gastos
  GET/POST /v1/charges  |  GET /v1/charges/history?from&to&doctorId
  GET/POST /v1/expenses

Reportes y estadísticas
  GET  /v1/reports/appointments | /charges     (operativos, por rango)
  GET  /v1/stats/overview | /top-diagnoses | /by-referral

Catálogos (admin)
  CRUD /v1/catalog/{medications|exams|image-types|insurers|professions}
  GET  /v1/catalog/cie11?search=

App de pacientes (role: patient)
  GET  /v1/patient/appointments  |  POST (solicitar)  |  DELETE (cancelar)
  GET  /v1/patient/availability?doctorId&date          (habilita booking)
  GET  /v1/patient/prescriptions | /results | /records  (solo lectura)
  POST /v1/patient/devices                              token FCM
```

Docs vivas en `/docs` (Scalar) desde el día 1.

### 3.7 Panel administrativo web (`@cehmefe/web`, Next.js)

Reemplaza la UI de la doctora/recepción. Módulos (solo lo que ella usa):

- **Agenda** — calendario (crear/reprogramar/ver eventos y citas), sala de espera, check-in, recordatorios.
- **Expedientes** — buscar/crear/editar (~55 campos con bloque madre/padre y aseguradora), selector de **vía: Embarazo / Ginecológico**, timeline de consultas.
- **Consulta / ficha clínica** — según la vía; antropometría, diagnósticos CIE-11, recetas, exámenes, imágenes/ultrasonidos, imprimir PDF. **Botón "Aplicar plantilla"** que precarga exámenes+medicamentos.
- **Plantillas** ⭐ — CRUD con "páginas"/categorías; ver/editar los ítems (exámenes+medicamentos+indicaciones); marcar por defecto. Réplica moderna de lo que ella construyó desde "Retiro Prenatal".
- **Cobros y gastos** — caja, gastos, historial por fecha/médico.
- **Reportes** — clínicos (ultrasonido por trimestre) y operativos (citas/cobros).
- **Estadísticas** — dashboard (tarjetas + gráficos).
- **Configuración** — catálogos, usuarios/roles, horarios de atención, datos de empresa/firma.
- **Bitácora** — auditoría.

Sin CRM ni telemedicina en v1. Auth: JWT propio con guard por rol; login contra `/v1/auth/login`, refresh silencioso, logout revoca el refresh token.

### 3.8 App móvil de pacientes (Flutter — `cehmefe-flutter`)

Clonar el scaffold de `facturahn-flutter` (Riverpod + go_router + Dio + Freezed + Drift + FCM). **Cambio vs. facturahn:** el auth ya no usa `supabase_flutter`, sino el **JWT propio de la API**:

- `core/network/auth_interceptor.dart` — adjunta `Authorization: Bearer <access>`; en `401 token_expired` llama `POST /v1/auth/refresh` con el refresh token (guardado en `flutter_secure_storage`) y reintenta una vez; si falla → logout → `/login`.
- Se retira `supabase_flutter`; se añade almacenamiento seguro de tokens y lógica de sesión propia.

Pantallas v1: Splash/Login (email o teléfono + contraseña; biométrico para re-entrar), Inicio (próxima cita), **Mis citas** (lista/detalle + **solicitar** y cancelar), **Mis recetas** (ver/compartir PDF por WhatsApp con `share_plus`), **Mis resultados** (exámenes e informes de ultrasonido, solo lectura), **Mi expediente** (datos básicos + embarazo actual si aplica), Perfil/ajustes (ES/EN), **Push FCM** (recordatorio de cita, receta lista, resultado disponible). Offline de solo-lectura con Drift.

> ⚠️ **Nota de alcance (a validar contigo):** la Dra. dice que **no** usa el "enlace para citas" de MedicPro. El agendamiento desde la app de pacientes es, por tanto, una **capacidad nueva del producto** (tu objetivo), no una réplica de algo en uso. Decisión: ¿la app permite **agendar directo** (crea la cita), o solo **solicitar** y recepción confirma? Esto afecta `availability` y el flujo. Recomendado para arrancar: **solicitud con confirmación de recepción**, y migrar a booking directo cuando haya horarios configurados.

### 3.9 Integración con cehmefe.com (fase posterior)

Con `/v1/patient/availability` + `/v1/patient/appointments`, la sección **#agendar** del sitio puede ofrecer agendamiento en línea (crea la cita real) además del WhatsApp actual. Bajo esfuerzo, alto valor.

### 3.10 Roadmap por fases

| Fase | Entregable | Depende de |
|---|---|---|
| **0. Fundación** | Monorepo (pnpm+turbo), Postgres + `packages/db` (esquema+migraciones), **auth propio JWT** (login/refresh/roles), `/docs` vivo | — |
| **1. Agenda + Expedientes** | API + panel: CRUD pacientes (dos vías), agenda/citas, check-in, recordatorios | Fase 0 |
| **2. Ficha clínica + Plantillas** | Cuadros por vía, antropometría, CIE-11, recetas, exámenes, **plantillas (aplicar)**, PDF, imágenes en Storage | Fase 1 |
| **3. Cobros + Reportes + Estadísticas** | Caja, gastos, historial, reportes, dashboard | Fase 2 |
| **4. App de pacientes (Flutter)** | Login JWT, mis citas + solicitar, recetas, resultados, push FCM | Fase 1–2 |
| **5. Migración de datos** | Extraer ~3,600 expedientes + historiales de MedicPro al nuevo esquema | Fase 2 (fuera de este alcance por ahora) |
| **6. Booking en cehmefe.com** | Agendamiento en línea desde la landing | Fase 4 |

### 3.11 Decisiones abiertas (para el equipo)

1. **ORM:** ¿**Drizzle** (recomendado, sinergia con Zod/OpenAPI) o **Prisma** (ya tienen boilerplate)?
2. **Hosting Postgres + Storage:** ¿DigitalOcean (Managed Postgres + Spaces) o AWS (RDS + S3)? Definir proveedor único.
3. **App de pacientes:** ¿agendar directo o solicitar+confirmar? (ver §3.8).
4. **Migración de datos:** ¿MedicPro puede dar export SQL/CSV, o habrá que scrapear la app autenticada? Impacta la Fase 5.
5. **Plantillas por defecto:** ¿arrancamos con las que la Dra. ya creó (exportarlas de MedicPro) como seed inicial?
6. **Notificaciones:** ¿WhatsApp por API oficial (Meta Cloud API) o mecanismo informal? Afecta costo/confiabilidad.
7. **Campos exactos de cada vía** (embarazo/ginecológico) y de los reportes de ultrasonido: validar con la Dra. antes de fijar `ultrasound_reports.payload`.
8. **Marca/nombre** del producto y dominios (API, panel).

---

## Anexo — Evidencia técnica (rutas MedicPro observadas)

Instancia: `https://medicprohn.app/dragarcia/` · Tenant: CEHMEFE (Dra. Monica Vannessa Garcia Santacruz). Rutas de §1.3 capturadas del tráfico real o extraídas del JS por página (`js/citas/*.js`, `js/clinica/*.js`, `js/hospital/*.js`, `js/cobros/*.js`). Dos errores de PHP confirmaron el stack CodeIgniter+MySQL y las rutas de servidor. La forma JSON de una cita se obtuvo llamando `cargar_citas_agenda` con la sesión activa. El alcance de la §1.5 proviene del correo de la Dra. del 25/ago/2026.
