export const docScroll = {
  get top() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  },
  get left() {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  },
  set top(value) {
    document.documentElement.scrollTop = value;
    document.body.scrollTop = value;
  },
  set left(value) {
    document.documentElement.scrollLeft = value;
    document.body.scrollLeft = value;
  },
};
