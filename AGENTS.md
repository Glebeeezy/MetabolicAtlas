# AGENTS.md — Руководство по архитектуре и расширению метаболических данных Atlas

Данный документ предназначен для инженеров и автономных AI-агентов, работающих с метаболической моделью человека в проекте **Metabolic Atlas**.

---

## 1. Архитектура системы данных

Система данных разделена на три логически и физически независимых слоя:

```
┌────────────────────────────────────────────────────────┐
│                   Layer C: Data Access                 │
│  MetabolismService • MetabolismRepository • Indexes    │
└───────────────────────────┬────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
┌───────────────────────────┐ ┌───────────────────────────┐
│ Layer A: Biological Domain│ │ Layer B: Visualization    │
│ Metabolites • Reactions   │ │ Layouts • Coordinates     │
│ Enzymes • Genes • Pathways│ │ SVG Paths • Arcs • Bounds │
└───────────────────────────┘ └───────────────────────────┘
```

1. **Layer A — Biological Domain** (`src/app/core/metabolism/models/` + `src/app/data/metabolism/metabolites/`, `reactions/`):
   - Химические формулы, SMILES, ChEBI, InChIKey.
   - Ферменты, EC-номера, гены (HGNC), идентификаторы UniProt.
   - Термодинамика ($\Delta G^{\circ\prime}$), регуляция (активаторы, ингибиторы), кинетика, клинические заметки.
   - Стехиометрия субстратов и продуктов.
   - **Не содержит** экранных координат, цветов и SVG-разметки.

2. **Layer B — Visualization & Geometry** (`src/app/core/metabolism/models/layout.model.ts` + `src/app/data/metabolism/visualization/`):
   - Координаты $(X, Y)$, размеры узлов $(W, H)$, цвета.
   - Скелетные SVG-формулы (`skeletalSvg`, `structureSvg`).
   - SVG-траектории реакций (`pathData`, `secondaryPathData`, `tooltipX`, `tooltipY`).
   - Разветвления (`branches`), узлы схождения (`junction`), кофакторные дуги (`cofactorArc`).
   - Радиальные секторы карты (`SECTOR_LAYOUT_CONFIGS`).

3. **Layer C — Data Access Layer** (`src/app/core/metabolism/`):
   - `MetabolismRepository` (абстрактный Observable API для бесшовной миграции на ASP.NET Core 10).
   - `LocalMetabolismRepository` (in-memory реализация для Angular 22).
   - `MetabolismService` (фасад доступа с синхронными коллекциями и реактивными потоками).
   - `MetabolismIndexService` ($O(1)$ поиск по UUID, коду, названию, метаболическому пути, а также связям «метаболит ⇄ реакции»).
   - `features/atlas/atlas-data.ts` (фасад обратной совместимости, реэкспортирующий все публичные контракты).

---

## 2. Физическое расположение сущностей

```text
client/src/app/
├── core/
│   └── metabolism/
│       ├── models/
│       │   ├── metabolite.model.ts          # BiologicalMetabolite, PathwayParticipation
│       │   ├── reaction.model.ts            # BiologicalReaction, ReactionParticipant
│       │   ├── layout.model.ts              # MetaboliteLayout, ReactionLayout, Arcs, Branches
│       │   ├── navigation.model.ts          # MetabolicCrossroad, SectorLayoutConfig, SuperHighway
│       │   ├── canvas-view.model.ts         # HumanMetaboliteNode, HumanReactionArrow (композиты)
│       │   └── index.ts
│       ├── repositories/
│       │   ├── metabolism.repository.ts     # Контракт интерфейса репозитория
│       │   └── local-metabolism.repository.ts
│       └── services/
│           ├── metabolism.service.ts        # Сервис доступа для UI
│           └── metabolism-index.service.ts  # O(1) индексы графа
│
└── data/
    └── metabolism/
        ├── metabolites/
        │   ├── human-metabolites.data.ts    # 36 основных метаболитов (био)
        │   ├── cofactor-metabolites.data.ts # 17 кофакторов (био)
        │   └── index.ts
        ├── reactions/
        │   ├── carbohydrates/               # Углеводный обмен
        │   │   ├── glycolysis.reactions.ts
        │   │   ├── galactose.reactions.ts
        │   │   ├── fructose.reactions.ts
        │   │   ├── glycogen.reactions.ts
        │   │   ├── pyruvate-transport.reactions.ts
        │   │   └── index.ts
        │   ├── energy/                      # Биоэнергетика и ЦТК
        │   │   ├── tca.reactions.ts
        │   │   ├── oxphos.reactions.ts
        │   │   └── index.ts
        │   └── index.ts
        ├── navigation/
        │   ├── crossroads.data.ts           # Межпутевые шлюзы
        │   ├── super-highways.data.ts       # Углеродные супер-магистрали
        │   └── index.ts
        ├── visualization/
        │   ├── metabolite-layouts.data.ts   # Геометрия и SVG метаболитов
        │   ├── reaction-layouts.data.ts     # Геометрия, дуги, ветви стрелок
        │   ├── sectors.data.ts              # Конфигурация радиальных секторов
        │   └── index.ts
        ├── hydration.ts                     # Сборка композитов HumanMetaboliteNode / ReactionArrow
        ├── metabolism-data.spec.ts          # Unit-тесты топологии и целостности
        └── index.ts                         # Экспорт гидратированных наборов данных
```

---

## 3. Правила работы с идентификаторами (UUID и кодами)

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

## 4. Правила добавления новых метаболитов

При добавлении нового метаболита необходимо выполнить следующие шаги:

1. **Биологическая часть:**
   - Добавить запись в `client/src/app/data/metabolism/metabolites/human-metabolites.data.ts` (или `cofactor-metabolites.data.ts`).
   - Заполнить: `id`, `code`, `nameRu`, `nameEn`, `abbrevRu`, `abbrevEn`, `formula`, `carbons`, `smiles`, `chebi`, `inchiKey`, `descriptionRu`, `descriptionEn`, `synonymsRu`, `synonymsEn`, `compartmentRu`, `compartmentEn`, `pathwaysRu`.
2. **Визуальная часть:**
   - Добавить запись с соответствующим `metaboliteId` в `client/src/app/data/metabolism/visualization/metabolite-layouts.data.ts`.
   - Заполнить координаты `x`, `y`, размеры `width`, `height`, акцентный цвет `color`, а также `skeletalSvg`.
   - Если метаболит является кофактором без плашки на холсте: `width: 0, height: 0, x: 0, y: 0`.

---

## 5. Правила добавления новых реакций

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

## 6. Правила проверки целостности (Data Integrity Checks)

Перед коммитом изменений обязательно запускать автоматические тесты:

```bash
cd client
npm test -- --watch=false
```

Тестовый набор `metabolism-data.spec.ts` проверяет:
- Уникальность всех UUID и кодов метаболитов.
- Уникальность всех UUID и кодов реакций.
- Разрешимость всех `sourceMetaboliteId`, `targetMetaboliteId`, `secondarySourceId`, `secondaryTargetId` и `branches[].metaboliteId`.
- Валидность SVG-разметки и геометрии.
- Соответствие секторов и супер-магистралей.

---

## 7. Подготовка к ASP.NET Core 10 Backend

При подключении бэкенда:
1. Создать класс `HttpMetabolismRepository implements MetabolismRepository` в `core/metabolism/repositories/http-metabolism.repository.ts`.
2. Заменить провайдер `MetabolismRepository` в `app.config.ts` с `LocalMetabolismRepository` на `HttpMetabolismRepository`.
3. Ни один компонент UI (включая `AtlasShellComponent`, `ReactionArrowComponent`, `ChemicalStructureComponent`) не потребует правок, так как они работают через `MetabolismService` и абстрактный интерфейс.
