declare module 'hover-effect' {
  export class HoverEffect {
    constructor(element: HTMLElement, options: {
      image1: string;
      image2: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    });
  }
}