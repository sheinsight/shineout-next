export interface Token {
  colorPrimary: string;
  colorPrimaryFocus: string;
  colorPrimaryDisabled: string;
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  colorPrimaryBg: string;
  colorSuccess: string;
  colorSuccessFocus: string;
  colorSuccessDisabled: string;
  colorSuccessHover: string;
  colorSuccessActive: string;
  colorSuccessBg: string;
  colorWarning: string;
  colorWarningFocus: string;
  colorWarningDisabled: string;
  colorWarningHover: string;
  colorWarningActive: string;
  colorWarningBg: string;
  colorDanger: string;
  colorDangerFocus: string;
  colorDangerDisabled: string;
  colorDangerHover: string;
  colorDangerActive: string;
  colorDangerBg: string;
  colorFillActive: string;
  colorFillHover: string;
  colorFillDisabled: string;
  colorWhiteBg: string;
  colorMaskFill: string;
  colorText: string;
  colorTextSecondary: string;
  colorTextTertiary: string;
  colorTextDisabled: string;
}

export interface useTokenProps {
  token?: Partial<Token>;
}
