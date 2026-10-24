/**
 * The five ways («способы») of the talk, in deck order. One place for the
 * names: SolutionMap (the two ladders), TreeLegend (the walkthrough legend)
 * and SlideFooter (the «› Способ ③ Нативно, без JS» crumb driven by `way:` in a
 * slide's frontmatter) all read from here, so renaming a way happens once.
 *
 * Numbers = resolution numbers on the DecisionTree and rows of the matrix.
 * Branch A (1–3) = отдать браузеру, branch B (4–5) = спросить сервер.
 */
export interface Way {
  n: number
  /** Full name, as on the way's opening slide: «Нативно, без JS». */
  label: string
  /** Two-word form for the walkthrough legend. */
  short: string
  /** What the way does, one line; SolutionMap prints it under the name. */
  hint: string
}

export const ways: readonly Way[] = [
  { n: 1, label: 'Только на клиенте', short: 'на клиенте', hint: 'после гидратации · скелетон' },
  { n: 2, label: 'Скрипт до paint', short: 'до paint', hint: 'prerender + <head>' },
  { n: 3, label: 'Нативно, без JS', short: 'ноль JS', hint: 'light-dark() · @container · sizes="auto"' },
  { n: 4, label: 'Cookie', short: 'cookie', hint: 'клиент сказал один раз' },
  { n: 5, label: 'Client Hints', short: 'Client Hints', hint: 'Accept-CH · Sec-CH-*' },
]

export const wayByN = (n: number) => ways.find(w => w.n === n)
