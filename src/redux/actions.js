// @flow
// Types
type SomethingStarted = {
  type: string,
  isInProgress: boolean
}
type SomethingDone = {
  type: string,
  isInProgress: boolean
}
type SomeError = {
  type: string,
  e: Error
}
export function exampleOfAsynchronousAction(
  arg: any
): ((mixed) => void) => Promise<any> {
  return async (dispatch: mixed => void) => {
    dispatch(somethingStarted())
    let newThing = ''
    try {
      // await something
      newThing = ''
    } catch (e) {
      dispatch(someError(e))
    }
    if (newThing) {
      dispatch(somethingDone())
    }
  }
}

export function somethingStarted(): SomethingStarted {
  return {
    type: 'START',
    isInProgress: true
  }
}

export function someError(e: Error): SomeError {
  return {
    type: 'ERROR',
    e
  }
}

export function somethingDone(): SomethingDone {
  return {
    type: 'DONE',
    isInProgress: false
  }
}

// for some reason if you extract this out to a common file and then `import type` it wont work!!
type _ExtractReturn<B, F: (...args: any[]) => B> = B //eslint-disable-line no-unused-vars
export type ExtractReturn<F> = _ExtractReturn<*, F>

export type Actions =
  | ExtractReturn<typeof exampleOfAsynchronousAction>
  | ExtractReturn<typeof somethingStarted>
  | ExtractReturn<typeof someError>
  | ExtractReturn<typeof somethingDone>
