export interface FontVariant {
  fontFamily: string;
  fontWeight: number;
}

// Google Fonts only ships two Georgian families, so the variety comes from
// weights (stroke contrast differs a lot) plus the OS default Georgian faces
export const FONT_VARIANTS: readonly FontVariant[] = [
  { fontFamily: '"Noto Sans Georgian", sans-serif', fontWeight: 300 },
  { fontFamily: '"Noto Sans Georgian", sans-serif', fontWeight: 400 },
  { fontFamily: '"Noto Sans Georgian", sans-serif', fontWeight: 700 },
  { fontFamily: '"Noto Sans Georgian", sans-serif', fontWeight: 900 },
  { fontFamily: '"Noto Serif Georgian", serif', fontWeight: 400 },
  { fontFamily: '"Noto Serif Georgian", serif', fontWeight: 700 },
  { fontFamily: '"Noto Serif Georgian", serif', fontWeight: 900 },
  { fontFamily: "sans-serif", fontWeight: 400 },
  { fontFamily: "serif", fontWeight: 400 },
] as const;
