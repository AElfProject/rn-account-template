/**
 * React-navigation 路由任意跳转封装
 */
import {CommonActions, StackActions} from '@react-navigation/native';

let _navigator;
/**
 * 设置顶层路由导航
 * @param navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

/**
 * 跳转到指定页面
 * @param name
 * @param params
 */
function navigate(name, params) {
  _navigator &&
    _navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
}

/**
 * 返回
 */
function goBack() {
  _navigator && _navigator.dispatch(CommonActions.goBack());
}

/**
 * 把路由重置到首页
 */
function reset(name) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name}],
  });
  _navigator && _navigator.dispatch(resetAction);
}

function push(routeName, params) {
  const pushAction = StackActions.push(routeName, params);
  _navigator.dispatch(pushAction);
}

export default {
  setTopLevelNavigator,
  navigate,
  goBack,
  reset,
  push,
};
