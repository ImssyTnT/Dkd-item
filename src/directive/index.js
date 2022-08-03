export const imgError = {
  // 当被绑定的元素插入到dom中时
  inserted(el, binding) {
    // 监听dom img图片加载失败的事件
    el.onerror = () => {
      el.src = binding.value
    }
  },
}

