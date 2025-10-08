export interface IScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

export interface useScrollParams {
  target: HTMLElement | null;
  options?: IScrollOptions;
}
