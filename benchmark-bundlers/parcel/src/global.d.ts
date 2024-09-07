declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.module.css' {
  interface Styles {
    readonly [key: string]: string;
  }
  const styles: Styles;
  export default styles;
}
