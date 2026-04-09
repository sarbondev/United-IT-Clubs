# Modular DDD Structure

Loyihalar quyidagi qatlamga o'tkazildi:

## `client`

```text
src/
  app/        # router, provider
  pages/      # route-level pages
  modules/    # business/UI sections
  shared/     # api, config, assets, layout, reusable components
```

## `admin`

```text
src/
  app/        # router, redux store, providers
  modules/    # har bir domain uchun sahifalar
  pages/      # cross-module pages
  shared/     # api, config, layout, reusable components
```

## `server`

```text
src/
  app/        # express app composition, route registration
  config/     # infra config
  modules/    # domain modules: admin, course, project, service, team, feedback
  shared/     # auth va file helpers
```

## Konvensiya

- `app` faqat composition uchun ishlatiladi.
- `shared` biznesga bog'liq bo'lmagan umumiy kodni saqlaydi.
- `modules/<domain>` ichida domainga tegishli route/controller/model yoki page'lar turadi.
- Yangi feature qo'shilsa, avval `modules/<domain>` ichida ochiladi, keyin `app` qatlamida ulanadi.
