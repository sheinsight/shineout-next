export interface Theme {
  basic: {
    color: {
      /**
       * 主色
       */
      primary: string;
      /**
       * 主色2
       */
      primary2: string;
      /**
       * 主色激活
       */
      primaryActive: string;
      /**
       * 主色对应的文本颜色
       */
      primaryText: string;
      /**
       * 常规文本颜色
       */
      text: string;
      /**
       * 常规背景色
       */
      background: string;
      /**
       * 次要文本颜色
       */
      secondaryText: string;
      /**
       * 次要文本颜色2
       */
      secondaryText2: string;
      /**
       * 次要文本颜色3
       */
      secondaryText3: string;
      /**
       * 边框色
       */
      border: string;
      /**
       * 警示文字颜色
       */
      warning: string;
      /**
       * 禁用背景色
       */
      disabledBackground: string;
      /**
       * 禁用文字颜色
       */
      disabledText: string;
      /**
       * 激活状态背景色
       */
      active: string;
      /**
       * 遮罩背景色
       */
      mask: string;
    };
    borderRadius: {
      md: number;
      sm: number;
      lg: number;
      round: number;
    };
    size: {
      font: {
        md: number;
        sm: number;
        xs: number;
        lg: number;
      };
    };
    weight: {
      bold: {
        value: number;
        family: string;
      };
    };
    padding: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
    };
    animate: {
      normal: {
        duration: string;
        timer: string;
      };
      zoomIn: {
        timer: string;
      };
      zoomOut: {
        timer: string;
      };
    };
  };
  components: {
    input: {
      color: {
        background: string;
        placeholder: string;
      };
      size: {
        font: number;
        padding: {
          v: number;
          h: number;
        };
        height: number;
      };
      borderRadius: number;
      groupRadius: number;
    };
  };
}

type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;

export type OptTheme = DeepPartial<Theme>;
