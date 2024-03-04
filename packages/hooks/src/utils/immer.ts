import { produce as produce2, setAutoFreeze } from 'immer';
import { Draft, PatchListener } from 'immer';
export { current } from 'immer';

declare const NOTHING: unique symbol;
type ValidRecipeReturnType<State> =
  | State
  | void
  | undefined
  | (State extends undefined ? typeof NOTHING : never);
interface IProduce {
  <Base, D = Draft<Base>>( // By using a default inferred D, rather than Draft<Base> in the recipe, we can override it.
    base: Base,
    recipe: (draft: D) => ValidRecipeReturnType<D>,
    listener?: PatchListener,
  ): Base;
}

export const produce = ((...args: any) => {
  setAutoFreeze(false);
  return produce2.apply(null, args);
}) as IProduce;
