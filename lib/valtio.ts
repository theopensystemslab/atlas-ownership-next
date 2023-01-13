import { useEffect } from "react"
import { subscribe } from "valtio"
import { subscribeKey } from "valtio/utils"

export const useSubscribe = (
  proxy: Parameters<typeof subscribe>[0],
  go: Parameters<typeof subscribe>[1],
  init: boolean = true
) =>
  useEffect(() => {
    if (init) go
    return subscribe(proxy, go)
  }, [go, init, proxy])

export const useSubscribeKey = <T extends object, K extends keyof T>(
  proxy: T,
  key: K,
  go: { (): void; (value: T[K]): void },
  init: boolean = true
) =>
  useEffect(() => {
    if (init) go()
    return subscribeKey<T, K>(proxy, key, go)
  }, [go, init, key, proxy])
