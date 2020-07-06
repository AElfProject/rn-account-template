import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import navigationService from '../../utils/navigationService';
import {statusBarHeight, pixelSize} from '../../utils/device';
import Icon from 'react-native-vector-icons/AntDesign';
import {pTd} from '../../utils';
import {Colors} from '../../assets/theme';
import Touchable from '../Touchable';
import {TextM} from '../CommonText';
const styles = StyleSheet.create({
  statusBarStyle: {
    paddingTop: statusBarHeight,
    backgroundColor: '#fff',
  },
  headerWrap: {
    height: pTd(88),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: pixelSize,
    borderColor: '#D8D8D8',
  },
  leftStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  rightStyle: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  backWrapStyle: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: pTd(36),
    color: Colors.fontColor,
    fontWeight: '500',
  },
  leftBox: {
    height: '100%',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  titleBox: {
    alignItems: 'center',
  },
  rightTitleStyle: {
    color: Colors.fontColor,
    marginRight: 15,
  },
  rightBox: {
    padding: 5,
  },
});
const CommonHeader = props => {
  const {
    canBack,
    leftElement,
    titleElement,
    title,
    rightElement,
    headerStyle,
    titleStyle,
    statusBar,
    rightTitle,
    rightOnPress,
  } = props;
  return (
    <View
      style={[
        styles.statusBarStyle,
        {backgroundColor: headerStyle?.backgroundColor},
      ]}>
      {statusBar && statusBar}
      <View style={[styles.headerWrap, headerStyle]}>
        <View style={styles.leftStyle}>
          {canBack ? (
            <TouchableOpacity
              style={styles.leftBox}
              activeOpacity={0.75}
              onPress={() => navigationService.goBack()}>
              <Icon name={'left'} size={24} color={Colors.fontColor} />
            </TouchableOpacity>
          ) : null}
          {leftElement ? leftElement : null}
        </View>
        {titleElement ? (
          titleElement
        ) : (
          <View style={styles.titleBox}>
            <Text style={[styles.title, titleStyle]}>{title || '详情'}</Text>
          </View>
        )}

        <View style={styles.rightStyle}>
          {rightElement ? (
            rightElement
          ) : rightTitle ? (
            <Touchable
              style={styles.rightBox}
              onPress={() => rightOnPress && rightOnPress()}>
              <TextM style={styles.rightTitleStyle}>{rightTitle}</TextM>
            </Touchable>
          ) : null}
        </View>
      </View>
    </View>
  );
};

CommonHeader.defaultProps = {
  rightElement: null,
};

export default CommonHeader;
