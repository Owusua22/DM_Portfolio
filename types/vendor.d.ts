// Minimal ambient types for the vendor libraries that ship without their own.

declare module "isotope-layout" {
  interface IsotopeOptions {
    itemSelector?: string;
    layoutMode?: string;
    filter?: string;
    sortBy?: string;
    [key: string]: unknown;
  }

  class Isotope {
    constructor(element: Element | string, options?: IsotopeOptions);
    arrange(options: IsotopeOptions): void;
    layout(): void;
    destroy(): void;
  }

  export default Isotope;
  export type { IsotopeOptions };
}

declare module "imagesloaded" {
  function imagesLoaded(
    element: Element | NodeListOf<Element> | string,
    callback?: () => void,
  ): unknown;

  export default imagesLoaded;
}
