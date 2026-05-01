export interface EntryDimensions {
  screenW: number;
  screenH: number;
  raysW: number;
  raysH: number;
  logoW: number;
  logoH: number;
  logoCenterY: number;
  logoTop: number;
  topInset: number;
}

/** Header escuro em login / signup / recuperar senha; o cartão branco ocupa o resto da altura. */
export const AUTH_FORM_HEADER_HEIGHT_RATIO = 0.44 as const;

export const ENTRY_CONSTANTS = {
  LOGO_W_RATIO: 0.48,
  /** Altura/largura do logo SVG (viewBox 173×108). */
  LOGO_ASPECT: 108 / 173,
  /** Fração da altura do ecrã do centro vertical do SVG do logo (alinhado à splash nativa). */
  LOGO_CENTER_Y_RATIO: 0.39,
} as const;
