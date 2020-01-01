/**
 数据验证（表单验证）
 来自 grace.hcoder.net
 作者 hcoder 深海
 */
module.exports = {
  error: '',
  check: function (data, rule) {
    switch (rule) {
      case 'email':
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!reg.test(data)) {
          return false;
        }
        break;
      case 'phoneno':
        var reg = /^1[0-9]{10,10}$/;
        if (!reg.test(data)) {
          return false;
        }
        break;
      case 'zipcode':
        var reg = /^[0-9]{6}$/;
        if (!reg.test(data)) {
          return false;
        }
        break;
      case 'idcard':
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(!reg.test(data)){
          return false;
        }
    }
    return true;
  },
  isNumber: function (checkVal) {
    var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
    return reg.test(checkVal);
  },
  isSame: function (value1, value2) {
    return value1 == value2;
  },
  isLogin: function () {
    if (sessionStorage.getItem("www.simoniu.com") != null || localStorage.getItem("www.simoniu.com") != null) {
      return true;
    }
    return false;
  }
}
