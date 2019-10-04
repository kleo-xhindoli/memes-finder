import { ParameterizedContext } from "koa";

export interface AppState {
  validatedBody: any
}

export type CustomContext = ParameterizedContext<AppState>;
