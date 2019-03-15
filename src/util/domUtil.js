function getOffsetTop(el) {
  return el.offsetParent
    ? el.offsetTop + getOffsetTop(el.offsetParent)
    : el.offsetTop
}
function getOffsetLeft(el) {
  return el.offsetParent
    ? el.offsetLeft + getOffsetLeft(el.offsetParent)
    : el.offsetLeft
}

export default{
  getOffsetTop,
  getOffsetLeft
}