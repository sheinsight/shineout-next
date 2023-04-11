import type { Theme } from '../type'

const basic: Theme['basic'] = {
  color: {
    secondaryText: '#767676',
    secondaryText2: '#959595',
    secondaryText3: '#98A2B3',
    primaryText: '#fff',
    primary2: '#222222',
    primary: '#222222',
    primaryActive: '#616161',
    text: '#222',
    background: '#fff',
    border: '#ccc',
    active: '#f2f3f5',
    warning: '#FF323D',
    disabledBackground: '#ebedf0',
    disabledText: '#c8c9cc',
    mask: `rgba(75, 76, 78, 0.3)`,
  },
  borderRadius: {
    md: 8,
    sm: 0,
    lg: 16,
    round: 99,
  },
  size: {
    font: {
      md: 14,
      sm: 12,
      xs: 10,
      lg: 16,
    },
  },
  weight: {
    bold: {
      family: '',
      value: 500,
    },
  },
  padding: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
  },
  animate: {
    normal: {
      timer: `cubic-bezier(0.645, 0.045, 0.355, 1)`,
      duration: `0.2s`,
    },
    zoomIn: {
      timer: `cubic-bezier(0.08, 0.82, 0.17, 1)`,
    },
    zoomOut: {
      timer: `cubic-bezier(0.78, 0.14, 0.15, 0.86)`,
    },
  },
}

const def: Theme = {
  components: {
    button: {
      borderRadius: basic.borderRadius.round,
      height: {
        xs: 24,
        md: 40,
        sm: 32,
        lg: 50,
      },
      padding: {
        xs: basic.padding.xs,
        md: basic.padding.md,
        sm: basic.padding.sm,
        lg: basic.padding.lg,
      },

      disabled: {
        background: '#BDBDBD',
        text: '#fff',
        border: '#BDBDBD',
      },
    },
    checkbox: {
      size: 20,
    },
    navbar: {
      height: 44,
      background: basic.color.background,
      textColor: basic.color.text,
      titleFontSize: basic.size.font.md,
      padding: basic.padding.md,
    },
    tabbar: {
      zIndex: 1,
      size: {
        height: 50,
      },
      color: {
        text: basic.color.secondaryText,
      },
    },
    cell: {
      padding: {
        h: 12,
        v: 10,
        card: 12,
      },
      cardBorderRadius: basic.borderRadius.md,
      color: {
        value: basic.color.secondaryText,
        divider: '#dbdbdb',
        active: basic.color.active,
      },
      size: {
        minHeight: 44,
      },
    },
    modal: {
      zIndex: {
        mask: 1040,
        modal: 1050,
      },
      color: {
        mask: basic.color.mask,
        background: basic.color.background,
        close: basic.color.border,
      },
      size: {
        padding: [30, 20, 20, 20],
        font: basic.size.font.sm,
        titleFont: basic.size.font.md,
        minHeight: 160,
        borderRadius: basic.borderRadius.md,
        buttonBorderRadius: basic.borderRadius.round,
        width: 295,
      },
    },
    toast: {
      zIndex: {
        mask: 1040,
        toast: 1050,
      },
      color: {
        background: `rgba(0, 0, 0, 0.7)`,
      },
      size: {
        minWidth: 240,
        maxWidth: 315,
        loadingMinWidth: 120,
        borderRadius: basic.borderRadius.md,
        padding: 14,
        font: basic.size.font.md,
      },
    },
    input: {
      color: {
        background: '#F6F6F6',
        placeholder: '#bbb',
      },
      size: {
        font: basic.size.font.lg,
        padding: {
          v: 14,
          h: 12,
        },
        height: 44,
      },
      borderRadius: basic.borderRadius.md,
      groupRadius: basic.borderRadius.md,
    },
    popup: {
      color: {
        mask: basic.color.mask,
        background: basic.color.background,
        close: basic.color.secondaryText,
      },
      size: {
        padding: [0, 10, 0, 10],
        font: basic.size.font.sm,
        titleFont: basic.size.font.md,
        minHeight: 160,
        borderRadius: basic.borderRadius.md,
        buttonBorderRadius: basic.borderRadius.round,
        width: 295,
      },
      borderRadius: basic.borderRadius.md,
    },
    tabs: {
      color: {
        header: {
          bg: basic.color.background,
        },
        body: {
          bg: basic.color.background,
        },
      },
      padding: [0, 24],
      zIndex: 100,
      size: {
        header: {
          height: 44,
        },
        content: {
          padding: [24, 20],
        },
      },
    },
    empty: {
      color: {
        icon: basic.color.secondaryText,
        desc: basic.color.secondaryText,
      },
      size: {
        icon: 96,
        title: basic.size.font.sm,
        desc: basic.size.font.xs,
      },
    },
    spin: {
      color: {
        icon: '#c8c9cc',
        font: '#969799',
      },
      size: {
        font: basic.size.font.sm,
        icon: 30,
        margin: basic.padding.xs,
      },
    },
    image: {
      background: '#f7f8fa',
      radius: 0,
    },
    list: {
      color: {
        error: '#bf4123',
        finished: basic.color.secondaryText,
        loading: basic.color.secondaryText,
      },
    },
    ellipsis: {
      size: {
        lineHeight: '22px',
      },
    },
    tag: {
      color: {
        text: basic.color.background,
        background: basic.color.primary,
      },
      size: {
        radius: basic.borderRadius.round,
        padding: [4, 6],
      },
    },
    card: {
      color: {
        text: basic.color.background,
        background: basic.color.background,
      },
      size: {
        radius: basic.borderRadius.md,
        padding: basic.padding.sm,
      },
    },
    swipeAction: {
      color: {
        content: {
          background: '#FF323D',
          font: basic.color.background,
        },
      },
    },
    badge: {
      size: {
        content: 18,
        dot: 5,
      },
      color: {
        contentColor: basic.color.primaryText,
        background: '#ff4d4f',
      },
    },
    rate: {
      color: {
        active: '#FACF19',
      },
    },
    backTop: {
      size: {
        width: 40,
        right: 12,
        bottom: 80,
      },
      color: {
        background: basic.color.background,
      },
      borderRadius: '50%',
      zIndex: 200,
    },
    icon: {
      color: 'inherit',
    },
  },
  basic,
}

export default def
