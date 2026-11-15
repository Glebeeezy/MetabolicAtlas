# AGENTS.md — Руководство по архитектуре фронтенда и метаболических данных Atlas

Данный документ предназначен для инженеров и автономных AI-агентов, работающих с кодовой базой проекта **Metabolic Atlas** (Angular 22 standalone, signals, ASP.NET Core 10).

---

## 1. Архитектура слоев фронтенда (Layered & Feature-Driven)

```
┌────────────────────────────────────────────────────────┐
│                      app.ts                            │
│  Root Container • RouterOutlet • Providers (app.config)│
└───────────┬───────────────────┬───────────────────┬────┘
            │                   │                   │
            ▼                   ▼                   ▼
┌──────────────────┐    ┌───────────────┐   ┌───────────────┐
│     layout/      │    │   features/   │   │    shared/    │
│ Header • Sidebar │    │ ├── atlas     │   │ Chemical-     │
│ Footer • Switchers│   │ ├── textbook  │   │   Structure   │
│                  │    │ └── search    │   │ UI Utilities  │
└──────────────────┘    └───────┬───────┘   └───────────────┘
                                │
            ┌───────────────────┴───────────────────┐
            ▼                                       ▼
┌──────────────────────────────┐    ┌──────────────────────────────┐
│            core/             │    │            data/             │
│ Api • Locale • Theme • State │    │ Layer A (Биохимия)           │
│ Layer C: MetabolismService   │    │ Layer B (Лейаут & SVG)       │
└──────────────────────────────┘    └──────────────────────────────┘
```

1. **`layout/`** — Каркас всего приложения (`Header`, `Sidebar`, `Footer`, `LocaleSwitcher`, `ThemeSwitcher`). Используется только в `app.html`.
2. **`shared/`** — Переиспользуемые Dumb UI-компоненты. Главный компонент — `ChemicalStructureComponent` (отрисовка 2D-формул молекул по SVG), доступный как для инспектора карты, так и для статей учебника.
3. **`core/`** — Синглтон-сервисы инфраструктуры и бизнес-домена (`core/index.ts`):
   - `LocaleService` — переключение и сохранение языка (`'ru' | 'en'`).
   - `ThemeService` — переключение темы (`'dark' | 'light'`).
   - `ApiService` — типизированный HTTP-клиент к REST API.
   - `AtlasStateService` — межкомпонентное реактивное состояние (поиск, фокус путей, анимация флакса).
   - `MetabolismService` + `MetabolismIndexService` — $O(1)$ доступ к метаболическому графу (Layer C).
4. **`features/`** — Независимые маршрутизируемые экраны:
   - **`atlas/`** — Интерактивная векторная карта метаболизма человека.
   - **`textbook/`** — Онлайн-учебник биохимии с главами, статьями и глубокими ссылками на карту.
   - **`search/`** — Глобальный поиск.
   - **`pathways/`** — Каталог путей.
   - **`entities/`** — Страницы метаболитов и реакций.
5. **`data/`** — Неизменяемая биологическая база знаний человека (метаболиты, реакции, геометрия).

---

## 2. Физическое расположение сущностей

```text
client/src/app/
├── app.ts / app.html / app.scss     # Главный контейнер (AppLayout)
├── app.routes.ts                    # Роутинг с ленивой загрузкой
├── app.config.ts                    # Провайдеры приложения
│
├── layout/                          # Слой каркаса приложения
│   ├── header/                      # Шапка с переключателями темы и языка
│   ├── sidebar/                     # Сайдбар (переключение Карта / Учебник)
│   ├── footer/                      # Подвал
│   ├── locale-switcher/             # Переключатель языка
│   ├── theme-switcher/              # Переключатель темы
│   └── index.ts                     # Экспорт layout
│
├── shared/                          # Переиспользуемые UI-компоненты
│   ├── components/
│   │   └── chemical-structure/      # ma-chemical-structure (SVG 2D-формулы)
│   └── index.ts                     # Экспорт shared
│
├── core/                            # Ядро и домен
│   ├── services/                    # ApiService, LocaleService, ThemeService, AtlasStateService
│   ├── types/                       # Locale, Theme
│   ├── models/                      # REST API DTO (EnzymeDetail, PathwayDetail и др.)
│   ├── metabolism/                  # Домен метаболизма (Layer A + Layer C)
│   │   ├── models/                  # Доменные интерфейсы (метаболиты, реакции, лейаут)
│   │   ├── repositories/            # MetabolismRepository / LocalMetabolismRepository
│   │   └── services/                # MetabolismService / MetabolismIndexService (O(1))
│   └── index.ts                     # Единый экспорт core
│
├── data/                            # База данных метаболизма (Layer A + Layer B)
│   └── metabolism/
│       ├── metabolites/             # 36 метаболитов + 17 коферментов (био)
│       ├── reactions/               # Реакции (гликолиз, галактоза, фруктоза, ЦТК, OxPhos)
│       ├── navigation/              # Шлюзы (crossroads), супермагистрали, макро-якоря
│       ├── visualization/           # Лейауты, SVG-формулы, траектории стрелок, секторы
│       ├── hydration.ts             # Гидратация композитов HumanMetaboliteNode / ReactionArrow
│       └── metabolism-data.spec.ts  # Тесты целостности данных
│
└── features/
    ├── atlas/                       # Интерактивная карта метаболизма
    │   ├── atlas-shell.component.*  # Контейнер карты, SVG-холст, <defs>
    │   ├── atlas-data.ts            # Фасад обратной совместимости
    │   ├── services/
    │   │   ├── atlas-viewport.service.ts   # Зум, панорамирование, rAF, фокус камеры
    │   │   └── atlas-highlight.service.ts  # Выделение, O(1) затемнение, фильтры, поиск
    │   ├── overlays/                # HUD-контролы (zoom-controls, context-pill, inspector)
    │   │   ├── zoom-controls/
    │   │   ├── context-pill/
    │   │   └── inspector/           # Инспектор (reaction-inspector, metabolite-inspector)
    │   ├── components/
    │   │   └── reaction-arrow/      # Векторная стрелка реакции с дугой кофакторов
    │   ├── svg/                     # Графические SVG-слои (<g ma-...>)
    │   │   ├── polar-grid/          # Радиальная координатная сетка
    │   │   ├── sector-continent/    # Секторы путей
    │   │   ├── superhighway/        # Углеродные магистрали
    │   │   ├── central-beacon/      # Центральный маяк ЦТК
    │   │   ├── crossroads-layer/    # Межпутевые узлы
    │   │   ├── compartment-layer/   # Цитозоль, мембраны, кластеры
    │   │   ├── oxphos-layer/        # Гребень кристы OxPhos
    │   │   ├── membrane-complex/    # Комплексы I–V
    │   │   ├── atp-terminal/        # Синтаза АТФ
    │   │   └── metabolite-tile/     # Карточка метаболита
    │   └── utils/
    │       └── reaction-geometry.util.ts
    │
    ├── textbook/                    # Онлайн-учебник биохимии
    │   └── textbook-shell.component.* # Сетка глав, интеграция с картой
    │
    ├── search/                      # Глобальный поиск
    ├── pathways/                    # Каталог путей
    ├── entities/                    # Паспорта сущностей
    └── not-found/                   # 404
```

---

## 3. Железные правила Angular и SVG (Обязательно для AI-агентов)

При разработке или рефакторинге компонентов карты и интерфейса действуют **строгие ограничения**, нарушение которых ломает приложение:

1. **`ViewEncapsulation.Emulated` везде:**
   - Ни при каких обстоятельствах не устанавливать `ViewEncapsulation.None` на хост-компонентах. При `None` браузер выводит `:host { ... }` в глобальный CSS, игнорирует его, и тег компонента схлопывается в `0×0`, скрывая весь холст.
2. **Явные `fill` и `stroke` у SVG-фигур:**
   - Дефолтный `fill` SVG-фигур в стандарте W3C — сплошной чёрный (`#000000`).
   - При выносе любой SVG-разметки в дочерний компонент все `<rect>`, `<path>`, `<circle>`, `<polygon>` **обязаны** иметь явный `fill: var(...)` и `stroke: var(...)` в SCSS этого компонента.
   - Для невидимых хитбоксов обязательно: `fill: transparent;`.
3. **SVG-child компоненты — только как атрибут на `<g>`:**
   - `<!-- ✅ Правильно --> <g ma-metabolite-tile [met]="met"></g>`
   - `<!-- ❌ Запрещено --> <ma-metabolite-tile [met]="met"></ma-metabolite-tile>` (браузер не отрендерит кастомный тег внутри SVG-дерева).
4. **КАТЕГОРИЧЕСКИЙ ЗАПРЕТ `display: contents;` на трансформируемых SVG `<g>`:**
   - В стандарте SVG свойство `display: contents;` указывает движку Blink/Gecko пропустить генерацию контейнерного бокса `<g>`.
   - В результате браузер **игнорирует атрибут `transform="translate(x, y)"`**, и все дочерние фигуры сбрасываются в координаты `(0, 0)`.
5. **Глобальные `<defs>` остаются в `atlas-shell.component.html`:**
   - Стрелочные маркеры (`#rx-arrowhead`, `#cofactor-arrowhead`) и градиенты свечения объявляются в корневом SVG и не выносятся в дочерние компоненты. `url(#id)` резолвится глобально.
6. **Design-токены — только в `styles.scss` в `:root`:**
   - Переменные `--color-reaction-line`, `--color-substrate-accent`, `--color-product-accent` и т.д. объявляются только в `:root` глобального файла стилей.
7. **Делегирование в сервисы вместо раздувания Shell:**
   - Камера, зум, панорамирование, LOD, слушатели мыши → [`AtlasViewportService`](file:///d:/MetabolicAtlas/MetabolicAtlas/client/src/app/features/atlas/services/atlas-viewport.service.ts).
   - Выбор реакции/метаболита, фильтры энергоносителей, расчет $O(1)$ затемнения (`dimmedNodeIds`) → [`AtlasHighlightService`](file:///d:/MetabolicAtlas/MetabolicAtlas/client/src/app/features/atlas/services/atlas-highlight.service.ts).
   - Доступ к биохимии и топологии → [`MetabolismService`](file:///d:/MetabolicAtlas/MetabolicAtlas/client/src/app/core/metabolism/services/metabolism.service.ts).
   - `AtlasShellComponent` должен оставаться тонким оркестратором (~390 строк).

---

## 4. Концепция Учебника и кросс-фичевая интеграция

В приложении развиваются две ключевые фичи: **Карта** (`/atlas`) и **Учебник** (`/textbook`).

1. **Единый визуализатор формул:**
   - Все статьи учебника используют [`ChemicalStructureComponent`](file:///d:/MetabolicAtlas/MetabolicAtlas/client/src/app/shared/components/chemical-structure/chemical-structure.component.ts) из `src/app/shared` для отрисовки химических структур молекул.
2. **Deep-linking (Учебник → Карта):**
   - Главы учебника содержат ссылки вида `<a routerLink="/atlas" [queryParams]="{ focus: 'PW-TCA-CYCLE', reaction: 'R_CS' }">`, по клику на которые камера карты центрируется на соответствующей стадии.
3. **Обратные ссылки (Карта → Учебник):**
   - Инспектор метаболита или реакции содержит академические ссылки на соответствующую главу учебника.

---

## 5. Правила работы с идентификаторами (UUID и кодами)

1. **Формат UUID:**
   - Каждая сущность обязана иметь детерминированный стабильный UUID v4-совместимого формата:
     * ЦТК: `b0000001-...` (метаболиты) / `d0000001-...` (реакции)
     * Гликолиз / ПДХ: `b0000002-...` / `d0000002-...`
     * Галактоза: `b0000003-...` / `d0000003-...`
     * Фруктоза: `b0000004-...` / `d0000004-...`
     * Гликоген: `b0000005-...` / `d0000005-...`
     * OxPhos: `b0000006-...` / `d0000006-...`
     * Энергетические коферменты: `c0000001-...`
2. **Никогда не изменяй существующие UUID:**
   - На них завязаны поисковые индексы, ссылки из реакций (`sourceMetaboliteId`, `targetMetaboliteId`, `branches`), сессионное состояние и тесты.
3. **Стабильные коды:**
   - Метаболиты: префикс `MET_` в верхнем регистре (`MET_GLUCOSE`, `MET_CITRATE`).
   - Реакции: префикс `R_` в верхнем регистре (`R_HK`, `R_CS`, `R_ETC_CI`).
   - Пути: префикс `PW-` (`PW-GLYCOLISIS`, `PW-TCA-CYCLE`, `PW-OXPHOS`).

---

## 6. Правила добавления новых метаболитов

1. **Биологическая часть:**
   - Добавить запись в `client/src/app/data/metabolism/metabolites/human-metabolites.data.ts` (или `cofactor-metabolites.data.ts`).
   - Заполнить: `id`, `code`, `nameRu`, `nameEn`, `abbrevRu`, `abbrevEn`, `formula`, `carbons`, `smiles`, `chebi`, `inchiKey`, `descriptionRu`, `descriptionEn`, `synonymsRu`, `synonymsEn`, `compartmentRu`, `compartmentEn`, `pathwaysRu`.
2. **Визуальная часть:**
   - Добавить запись с соответствующим `metaboliteId` в `client/src/app/data/metabolism/visualization/metabolite-layouts.data.ts`.
   - Заполнить координаты `x`, `y`, размеры `width`, `height`, акцентный цвет `color`, а также `skeletalSvg`.
   - Если метаболит является кофактором без плашки на холсте: `width: 0, height: 0, x: 0, y: 0`.

---

## 7. Правила добавления новых реакций

1. **Биологическая часть:**
   - Определить метаболическую категорию и открыть соответствующий файл в `client/src/app/data/metabolism/reactions/<категория>/`.
   - Заполнить `id`, `code`, `stepNumber`, `nameRu`, `nameEn`, `pathwayCode`, `sourceMetaboliteId`, `targetMetaboliteId`.
   - Если реакция мультисубстратная: заполнить `secondarySourceId`.
   - Если реакция мультипродуктная: заполнить `secondaryTargetId`.
   - Заполнить ферментные данные: `enzymeRu`, `enzymeEn`, `enzymeShort`, `ecNumber`, `gene`, `uniprotId`, `isReversible`, `deltaG0`, `substrates`, `products`, кинетические регуляторы (`activatorsRu`, `inhibitorsRu`), клиническую заметку `clinicalNoteRu`.
2. **Визуальная часть:**
   - Добавить объект с тем же `reactionId` в `client/src/app/data/metabolism/visualization/reaction-layouts.data.ts`.
   - Указать SVG-траекторию `pathData`, координаты всплывающей подсказки `tooltipX`, `tooltipY`.
   - При наличии ветвления: заполнить `junction` (координаты узла) и `branches` (отводные SVG-линии с привязкой к `metaboliteId`).
   - При наличии коферментов на стрелке: указать `cofactorArc` (`preset`, `path`, `inItems`, `outItems`).

---

## 8. Проверка целостности и CI

Перед каждым коммитом обязательно запускать автоматический набор тестов:

```bash
cd client
npm test -- --watch=false
npm run build
```

Тестовый набор проверяет:
- Уникальность всех UUID и кодов метаболитов и реакций.
- Разрешимость всех идентификаторов источников, целей и ветвлений.
- Работоспособность сервисов зума (`AtlasViewportService`) и выборки (`AtlasHighlightService`).
- Отрисовку всех 10+ SVG-слоев и оверлеев карты.
- Наличие и маршруты сайдбара (Карта и Учебник).

---

## 9. Подготовка к ASP.NET Core 10 Backend

При подключении бэкенда:
1. Создать класс `HttpMetabolismRepository implements MetabolismRepository` в `core/metabolism/repositories/http-metabolism.repository.ts`.
2. Заменить провайдер `MetabolismRepository` в `app.config.ts` с `LocalMetabolismRepository` на `HttpMetabolismRepository`.
3. Ни один компонент UI (включая `AtlasShellComponent`, `ReactionArrowComponent`, `ChemicalStructureComponent`, `TextbookShellComponent`) не потребует правок, так как они работают через `MetabolismService` и абстрактный интерфейс.
