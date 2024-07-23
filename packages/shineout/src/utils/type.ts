export type RequireAWithB<T, A extends keyof T, B extends keyof T> = 
  | (Omit<T, A> & { [K in A]?: never })
  | (T & Required<Pick<T, B>>)
  | (T & Required<Pick<T, A | B>>)