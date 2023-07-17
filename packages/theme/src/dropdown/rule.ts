const dropdownTokenDescription = {
  dropdown: '下拉菜单',
  List: '下拉菜单列表',
  Option: '选项',
};

const dropdownRules = {
  listOptionCommon: [['list'], ['border-width']],
  listSize: [
    ['list'],
    ['', 'small', 'large'],
    ['border-radius', 'padding-x', 'padding-y', 'font-size'],
  ],
  listColor: [['list'], ['background-color', 'border-color', 'font-color', 'box-shadow']],
  ListOptionSize: [['list-option'], ['', 'small', 'large'], ['padding-x', 'padding-y']],
  listOptionColor: [
    ['list-option'],
    ['', 'focus', 'active', 'select', 'disabled'],
    ['background-color', 'border-color', 'font-color'],
  ],
};

const dropdownTokenValue = {
  List: {
    Box: {
      Shadow: 'Shadow-2',
    },
    Border: {
      Radius: 'Radius-4',
      Width: 'Neutral-border-1',
      Color: 'Neutral-border-1',
    },
    Padding: {
      X: 'Padding-4',
      Y: 'Padding-4',
    },
    Font: {
      Size: '14/regular',
      Color: 'Neutral-text-5',
    },
    Background: {
      Color: 'Neutral-fill-1',
    },
    Small: {
      Border: {
        Radius: 'Radius-4',
      },
      Padding: {
        X: 'Padding-4',
        Y: 'Padding-4',
      },
      Font: {
        Size: '12/regular',
      },
    },
    Large: {
      Border: {
        Radius: 'Radius-4',
      },
      Padding: {
        X: 'Padding-4',
        Y: 'Padding-4',
      },
      Font: {
        Size: '16/regular',
      },
    },
  },
};

module.exports = {
  dropdownRules,
  dropdownTokenValue,
  dropdownTokenDescription,
};
