import * as RA from "fp-ts/ReadonlyArray"
import * as RR from "fp-ts/ReadonlyRecord"
import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"
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

export { A, RA, RR, O, abs, hypot, round }
