const utils = {
  /**
   * 判定是否Null值
   * @method isNull
   * @param obj {any}
   * @return {boolean}
   */
  isNull: function (obj: any): boolean {
    return obj === null;
  },
  /**
   * 判定是否undefined
   * @method isUndefined
   * @param obj {any}
   * @return {boolean}
   */
  isUndefined: function (obj: any): boolean {
    return obj === void 0;
  },
  /**
   * 判定是否null或者undefined值
   * @method isNullOrUndefined
   * @param obj {any}
   * @return {boolean}
   */
  isNullOrUndefined: function (obj: any): boolean {
    return utils.isNull(obj) || utils.isUndefined(obj);
  },
};

export default utils;
