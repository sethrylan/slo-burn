declare namespace JSX {
  interface IntrinsicElements {
    math: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      display?: string;
    };
    mfrac: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    msub: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    mi: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    mo: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    mn: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
