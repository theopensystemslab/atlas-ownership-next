import * as RA from "fp-ts/ReadonlyArray"
import * as RR from "fp-ts/ReadonlyRecord"
import * as NEA from "fp-ts/NonEmptyArray"
import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"
import * as E from "fp-ts/Either"
import * as S from "fp-ts/string"
import { pipe } from "fp-ts/lib/function"

const { abs, hypot, round } = Math

export const errorThrower = (message?: string) => () => {
  throw new Error(message)
}

export const getOrError =
  (message?: string) =>
  <T extends unknown>(t: O.Option<T>): T =>
    pipe(
      t,
      O.getOrElse(() => errorThrower(message) as any)
    )

export { A, RA, RR, O, E, S, NEA, abs, hypot, round }

export const pipeLog = <T extends unknown>(x: T): T => (console.log(x), x)

export const pipeLogWith =
  <T extends unknown>(f: (t: T) => void) =>
  (t: T): T => {
    console.log(f(t))
    return t
  }
