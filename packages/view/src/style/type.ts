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
    button: {
      height: {
        xs: number;
        md: number;
        sm: number;
        lg: number;
      };
      padding: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
      };
      borderRadius: number;
      disabled: {
        background: string;
        text: string;
        border: string;
      };
    };
    checkbox: {
      size: number;
    };
    navbar: {
      height: number;
      background: string;
      textColor: string;
      titleFontSize: number;
      padding: number;
    };
    tabbar: {
      zIndex: number;
      size: {
        height: number;
      };
      color: {
        text: string;
      };
    };
    cell: {
      padding: {
        h: number;
        v: number;
        card: number;
      };
      cardBorderRadius: number;
      color: {
        value: string;
        divider: string;
        active: string;
      };
      size: {
        minHeight: number;
      };
    };
    modal: {
      zIndex: {
        mask: number;
        modal: number;
      };
      color: {
        mask: string;
        background: string;
        close: string;
      };
      size: {
        padding: number[];
        font: number;
        titleFont: number;
        minHeight: number;
        borderRadius: number;
        buttonBorderRadius: number;
        width: number;
      };
    };
    toast: {
      zIndex: {
        mask: number;
        toast: number;
      };
      color: {
        background: string;
      };
      size: {
        minWidth: number;
        maxWidth: number;
        loadingMinWidth: number;
        borderRadius: number;
        padding: number;
        font: number;
      };
    };
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
    popup: {
      color: {
        mask: string;
        background: string;
        close: string;
      };
      size: {
        padding: number[];
        font: number;
        titleFont: number;
        minHeight: number;
        borderRadius: number;
        buttonBorderRadius: number;
        width: number;
      };
      borderRadius: number;
    };

    tabs: {
      color: {
        header: {
          bg: string;
        };
        body: {
          bg: string;
        };
      };
      zIndex: number;
      padding: [number, number];
      size: {
        header: {
          height: number;
        };
        content: {
          padding: [number, number];
        };
      };
    };
    empty: {
      color: {
        icon: string;
        desc: string;
      };
      size: {
        icon: number;
        title: number;
        desc: number;
      };
    };
    spin: {
      color: {
        icon: string;
        font: string;
      };
      size: {
        font: number;
        icon: number;
        margin: number;
      };
    };

    image: {
      background: string;
      radius: number;
    };

    list: {
      color: {
        error: string;
        finished: string;
        loading: string;
      };
    };
    ellipsis: {
      size: {
        lineHeight: string;
      };
    };
    tag: {
      color: {
        text: string;
        background: string;
      };
      size: {
        radius: number | string;
        padding: [number, number];
      };
    };

    card: {
      color: {
        text: string;
        background: string;
      };
      size: {
        radius: number | string;
        padding: number;
      };
    };

    swipeAction: {
      color: {
        content: {
          background: string;
          font: string;
        };
      };
    };

    badge: {
      size: {
        content: number;
        dot: number;
      };
      color: {
        contentColor: string;
        background: string;
      };
    };

    rate: {
      color: {
        active: string;
      };
    };

    backTop: {
      size: {
        width: number;
        right: number | string;
        bottom: number | string;
      };
      color: {
        background: string;
      };
      borderRadius: number | string;
      zIndex: number;
    };
    icon: {
      color: string;
    };
  };
}

type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;

export type OptTheme = DeepPartial<Theme>;
