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

## Дополнительно

На этих материалах держатся факты в докладе, но QR на них в слайдах нет.

Гидратация и флэш:

- next-themes — [Avoid Hydration Mismatch](https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch): тема на сервере неизвестна
- Remix — [issue #6684: Rendering dates to locale causes hydration errors](https://github.com/remix-run/remix/issues/6684)
- Vuetify Nuxt module — [issue #325: "system" theme does not work (SSG + SSR)](https://github.com/vuetifyjs/nuxt-module/issues/325) и [issue #58: Wrong start color-scheme if ssr true](https://github.com/vuetifyjs/nuxt-module/issues/58)
- Google Search Central — [Understand JavaScript SEO Basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

Способы:

- Nuxt — [`onPrehydrate`](https://nuxt.com/docs/4.x/api/composables/on-prehydrate): скрипт, который выполняется до гидратации
- Mat Marquis — [The end of responsive images](https://piccalil.li/blog/the-end-of-responsive-images/), про `sizes="auto"`
- WebKit — [WebKit Features for Safari 27.0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/): поддержка `sizes="auto"`
- MDN — [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img): запасной `sizes` и `width`/`height`, чтобы место под картинку было зарезервировано заранее

Client Hints и кэш:

- MDN — [HTTP Client hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Client_hints), включая `Critical-CH`
- MDN — [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching): персональный ответ и `Cache-Control: private`
- Fastly — [HTTP Vary Header: Best Practices](https://www.fastly.com/blog/best-practices-using-vary-header)
- Cloudflare — [Vary for images](https://developers.cloudflare.com/cache/advanced-configuration/vary-for-images/)
