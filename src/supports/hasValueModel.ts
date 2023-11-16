// 判断对象是否有值
export default (vm: any): boolean => {
  if (Array.isArray(vm)) {
    return !!vm.length
  } else if (vm && typeof vm === 'object') {
    return !!Object.keys(vm).length
  }
  return !!vm
}
