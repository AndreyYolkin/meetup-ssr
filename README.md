# SSR-рендер вслепую

Слайды доклада для HolyJS: почему сервер не знает состояние клиента и что с этим делать.

Сделано на [Slidev](https://sli.dev/) со своей темой (`theme/`).

```sh
pnpm install
pnpm dev     # http://localhost:3030
pnpm build   # статический сайт в dist/
pnpm export  # PDF
```

Запасные слайды в конце дека скрыты (`hide: true`), в обычном показе их нет.

## Дерево решений

Исходное условие: серверу нужно значение, которого он не знает. Сначала пробуем браузер, начиная с самого дешёвого шага. «Да» на любом вопросе значит, что дальше идти не нужно.

**Ветка А — отдать браузеру**

1. **А1. Хватит CSS и разметки?** Да → ③ нативно, ноль JS (CSS, `srcset`, нейтральная разметка).
2. **А2. Скрипт поправит до paint?** Да → ② скрипт до paint (правит атрибут или текст). Нет, нужен другой DOM → А3.
3. **А3. Можно кадр без значения?** Да → ① на клиенте (скелетон). Нет → ветка Б.

В ветке А разметка одна на всех, и кэш остаётся целым.

**Ветка Б — спросить сервер** (браузер не успел, сервер должен знать значение заранее)

4. **Б1. Кто владелец значения?** Пользователь, который выбрал сам → ④ cookie или профиль. Устройство → Б2.
5. **Б2. Есть Client Hint?** Да (Chromium) → ⑤ Client Hints и фолбэк. Нет → ④ cookie, работает со второго визита.

У ветки Б есть цена: HTML отличается от запроса к запросу, поэтому для Client Hint нужен `Vary`, а ответ, который зависит от cookie или профиля, кэшируется как `private`.

## Источники

Все ссылки ведут на материалы, которые показаны в слайдах через QR.

Гидратация и флэш:

- Josh W. Comeau — [The Perils of Hydration](https://www.joshwcomeau.com/react/the-perils-of-rehydration/)
- Next.js — [Text content does not match server-rendered HTML](https://nextjs.org/docs/messages/react-hydration-error)
- Jacob Paris — [Solve React hydration errors in Remix/Next apps](https://web.archive.org/web/20260412224132/https://www.jacobparis.com/content/remix-hydration-errors) (копия в Web Archive)
- Vuetify — [issue #16825: useDisplay v-if Hydration node mismatch](https://github.com/vuetifyjs/vuetify/issues/16825)
- Qwik — [Resumable](https://qwik.dev/docs/concepts/resumable/)

Способы:

- [artsy/fresnel](https://github.com/artsy/fresnel) — адаптивная вёрстка на media queries с поддержкой SSR, для случая «нужен другой DOM»
- [epicweb-dev/epic-stack](https://github.com/epicweb-dev/epic-stack) — cookie как источник правды
- [userquin/nuxt-http-client-hints](https://github.com/userquin/nuxt-http-client-hints) — Client Hints для Nuxt

Поддержка Client Hints и кэш:

- Mozilla — [standards-positions #79: Client Hints](https://github.com/mozilla/standards-positions/issues/79), позиция neutral
- WebKit — [standards-positions #20: HTTP Client Hints](https://github.com/WebKit/standards-positions/issues/20), позиция blocked
- Fastly — [Getting the most out of Vary with Fastly](https://www.fastly.com/blog/getting-most-out-vary-fastly)
