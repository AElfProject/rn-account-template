import React, {memo, useCallback} from 'react';
import {
  CommonHeader,
  Touchable,
  Input,
  CommonButton,
} from '../../../../components/template';
import i18n from 'i18n-js';
import {useSetState} from '../../../../utils/pages/hooks';
import {View, Keyboard} from 'react-native';
import GStyle from '../../../../assets/theme/gStyle';
import styles from './styles';
import {TextM} from '../../../../components/template/CommonText';
import {PASSWORD_REG, USERNAME_REG} from '../../../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import navigationService from '../../../../utils/common/navigationService';
import NamePasswordTips from '../NamePasswordTips';
const Registered = () => {
  const [state, setState] = useSetState({
    userName: '',
    pwd: '',
    pwdConfirm: '',
    pwdDifferent: false,
    userNameRule: false,
    pwdRule: false,
    pwdConfirmRule: false,
  });
  const userNameBlur = useCallback(() => {
    const {userName} = state;
    if (!USERNAME_REG.test(userName)) {
      setState({userNameRule: true});
    } else {
      setState({userNameRule: false});
    }
  }, [setState, state]);
  const pwdBlur = useCallback(() => {
    const {pwd, pwdConfirm} = state;
    if (!PASSWORD_REG.test(pwd)) {
      setState({pwdRule: true});
    } else {
      setState({pwdRule: false});
    }

    if (pwdConfirm && pwd && pwdConfirm !== pwd) {
      setState({pwdDifferent: true});
    } else if (pwdConfirm && pwd && pwdConfirm === pwd) {
      setState({pwdDifferent: false});
    }
  }, [setState, state]);
  const pwdComfirmBlur = useCallback(() => {
    const {pwdConfirm, pwd} = state;
    if (!PASSWORD_REG.test(pwdConfirm)) {
      setState({pwdConfirmRule: true});
    } else {
      setState({pwdConfirmRule: false});
    }

    if (pwdConfirm && pwd && pwd !== pwdConfirm) {
      setState({pwdDifferent: true});
    } else if (pwdConfirm && pwd && pwd === pwdConfirm) {
      setState({pwdDifferent: false});
    }
  }, [setState, state]);

  const registered = useCallback(() => {
    Keyboard.dismiss();
    navigationService.navigate('GenerateQRCode');
  }, []);
  const {userNameRule, pwdRule, pwdConfirmRule, pwdDifferent} = state;
  return (
    <View style={GStyle.container}>
      <CommonHeader title={i18n.t('login.register')} canBack />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={0}
        extraHeight={50}>
        <Touchable
          style={styles.container}
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}>
          <Input
            leftTitleBox={styles.leftTitleBox}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.userName')}
            onBlur={userNameBlur}
            onChangeText={userName => setState({userName})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {userNameRule && (
            <TextM style={GStyle.pwTip}>{i18n.t('login.nameErr')}</TextM>
          )}
          <Input
            secureTextEntry={true}
            leftTitleBox={styles.leftTitleBox}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.newPwd')}
            onBlur={pwdBlur}
            onChangeText={pwd => setState({pwd})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {pwdRule && (
            <TextM style={GStyle.pwTip}>{i18n.t('login.pwdFormatErr')}</TextM>
          )}
          <Input
            secureTextEntry={true}
            leftTitleBox={[styles.leftTitleBox, {marginBottom: 10}]}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.confirmPwd')}
            onBlur={pwdComfirmBlur}
            onChangeText={pwdConfirm => setState({pwdConfirm})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {pwdConfirmRule && (
            <TextM style={GStyle.pwTip}>{i18n.t('login.pwdFormatErr')}</TextM>
          )}
          {pwdDifferent && (
            <TextM style={GStyle.pwTip}>{i18n.t('login.inconsistent')}</TextM>
          )}
          <NamePasswordTips />
          <CommonButton
            // disabled
            onPress={registered}
            title={i18n.t('login.register')}
            style={styles.buttonStyles}
          />
        </Touchable>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default memo(Registered);
