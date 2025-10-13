export interface IScrollOptions {
  behavior?: ScrollBehavior;
  offset?: number;
}

export interface useScrollParams {
  options?: IScrollOptions;
  target: HTMLElement | null;
}
