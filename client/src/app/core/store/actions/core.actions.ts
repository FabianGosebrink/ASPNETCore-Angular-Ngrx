import { Action } from '@ngrx/store';

export const SIGNALR_ESTABLISH_CONNECTION =
  '[Core] SIGNALR_ESTABLISH_CONNECTION';
export const SIGNALR_ESTABLISHED = '[Core] SIGNALR_ESTABLISHED';
export const SIGNALR_FAILED = '[Core] SIGNALR_FAILED';

export class SignalREstablishConnectionAction implements Action {
  readonly type = SIGNALR_ESTABLISH_CONNECTION;
  constructor() {}
}

export class SignalREstablishedAction implements Action {
  readonly type = SIGNALR_ESTABLISHED;
  constructor() {}
}

export class SignalRFailedAction implements Action {
  readonly type = SIGNALR_FAILED;
  constructor(public errorMessage: any) {}
}

export type CoreActions = SignalREstablishedAction | SignalRFailedAction;
