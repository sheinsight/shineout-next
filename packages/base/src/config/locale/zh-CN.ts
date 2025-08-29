export default {
  now: '今天',
  current: '此刻',
  selectQuarter: '请选择季度',
  selectYear: '请选择年份',
  selectMonth: '请选择月份',
  selectDate: '请选择日期',
  selectWeek: '请选择周',
  selectTime: '请选择时间',

  startQuarter: '开始季度',
  endQuarter: '结束季度',

  startYear: '开始年份',
  endYear: '结束年份',

  startMonth: '开始月份',
  endMonth: '结束月份',

  startDate: '开始日期',
  endDate: '结束日期',

  startWeek: '开始周',
  endWeek: '结束周',

  startTime: '开始时间',
  endTime: '结束时间',

  weekdayValues: {
    narrow: ['日', '一', '二', '三', '四', '五', '六'],
    short: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    long: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  },
  weekShort: '周',
  startOfWeek: 1,
  monthValues: {
    short: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    long: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
  },

  timeOfDayValues: ['上午', '下午'],

  ok: '确定',
  cancel: '取消',
  reset: '重置',
  noData: '暂无数据',
  selectAll: '全选',
  loading: '加载中...',
  searchPlaceholder: '在筛选项中搜索',

  rules: {
    required: {
      array: '{title} 不能为空',
      string: '{title} 不能为空',
    },
    type: '请输入正确的 {title}',
    length: {
      max: {
        string: '{title} 不能超过 {max} 个字符',
        number: '{title} 不能大于 {max}',
        array: '{title} 不能超过 {max} 个选项',
      },
      min: {
        string: '{title} 不能少于 {min} 个字符',
        number: '{title} 不能小于 {min}',
        array: '{title} 至少选择 {min} 个选项',
      },
    },
    reg: '{title} 格式不正确',
  },

  selected: '项',
  search: '搜索',
  urlInvalidMsg: '图片格式不正确，请重新上传',
  invalidAccept: '文件格式不正确',
  invalidImage: '图片格式不正确',
  notFound: '未找到',
};
