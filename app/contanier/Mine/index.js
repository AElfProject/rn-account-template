import React, {useEffect, memo, useMemo} from 'react';
import {View, StatusBar, ScrollView} from 'react-native';
import {GStyle, Colors} from '../../assets/theme';
import styles from './styles';
import {connect, useSelector, shallowEqual} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Constants from 'expo-constants';
import settingsActions, {settingsSelectors} from '../../redux/settingsRedux';
import {pTd} from '../../utils';
import {TextL} from '../../components/CommonText';
import {Touchable, ListItem} from '../../components';
import navigationService from '../../utils/navigationService';
import i18n from 'i18n-js';
const Tool = () => {
  const language = useSelector(settingsSelectors.getLanguage, shallowEqual);
  const Element = useMemo(() => {
    const List = [
      {
        title: i18n.t('mineModule.transactionManagementT'),
        onPress: () => navigationService.navigate('TransactionManagement'),
      },
      {
        title: i18n.t('mineModule.authorizeManagementT'),
        onPress: () => navigationService.navigate('AuthorizeManagement'),
      },
      {
        title: i18n.t('mineModule.securityCenterT'),
        onPress: () => navigationService.navigate('SecurityCenter'),
      },
      {
        title: i18n.t('mineModule.generalSettingT'),
        onPress: () => navigationService.navigate('GeneralSettings'),
        style: {marginTop: 10},
      },
      {
        title: i18n.t('mineModule.helpCenterT'),
        onPress: () => navigationService.navigate('HelpCenter'),
      },
      {
        title: i18n.t('mineModule.aboutUsT'),
        onPress: () => navigationService.navigate('AboutUs'),
        subtitle: i18n.t('mineModule.version', {
          number: Constants.nativeAppVersion,
        }),
      },
      {
        title: i18n.t('mineModule.accountManagementT'),
        onPress: () => navigationService.navigate('AccountManagement'),
        style: {marginTop: 10},
      },
    ];
    return (
      <ScrollView>
        <View style={GStyle.secondContainer}>
          <View style={styles.toolBox}>
            <Touchable
              onPress={() => navigationService.navigate('Receive')}
              style={styles.toolItem}>
              <FontAwesome5
                name="arrow-circle-down"
                size={30}
                color={Colors.primaryColor}
              />
              <TextL>{i18n.t('mineModule.collect')}</TextL>
            </Touchable>
            <Touchable
              onPress={() => navigationService.navigate('Transfer')}
              style={styles.toolItem}>
              <FontAwesome5
                name="arrow-circle-up"
                size={30}
                color={Colors.primaryColor}
              />
              <TextL>{i18n.t('mineModule.transfer')}</TextL>
            </Touchable>
            <Touchable style={styles.toolItem}>
              <FontAwesome5
                name="plus-circle"
                size={30}
                color={Colors.primaryColor}
              />
              <TextL>{i18n.t('mineModule.exchange')}</TextL>
            </Touchable>
          </View>
          {List.map((item, index) => (
            <ListItem key={index} {...item} />
          ))}
        </View>
      </ScrollView>
    );
    //We need to know when we switch languages
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  return Element;
};
const Mine = props => {
  const {navigation, changeBarStyle} = props;
  useSelector(settingsSelectors.getLanguage, shallowEqual);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      changeBarStyle('light-content');
      StatusBar.setBarStyle('light-content');
    });
    const blurUnsubscribe = navigation.addListener('blur', () => {
      changeBarStyle('dark-content');
      StatusBar.setBarStyle('dark-content');
    });
    return () => {
      unsubscribe();
      blurUnsubscribe();
    };
  }, [navigation, changeBarStyle]);
  return (
    <View style={GStyle.container}>
      <Touchable
        activeOpacity={1}
        onPress={() => navigationService.navigate('PersonalCenter')}
        style={styles.topBGStyles}>
        <TextL style={styles.textTitle}>{i18n.t('mineModule.username')}:</TextL>
        <Icon name="qrcode" size={pTd(180)} color="#fff" />
      </Touchable>
      <View style={styles.balanceBox}>
        <TextL style={styles.textTitle}>{i18n.t('mineModule.balance')}:</TextL>
      </View>
      <Tool />
    </View>
  );
};
const mapStateToProps = state => {
  return {
    barStyle: settingsSelectors.getBarStyle(state),
  };
};
const mapDispatchToProps = {
  changeBarStyle: settingsActions.changeBarStyle,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Mine));
