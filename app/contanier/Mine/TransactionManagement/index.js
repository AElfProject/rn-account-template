import React, {memo, useMemo} from 'react';
import {View} from 'react-native';
import {GStyle} from '../../../assets/theme';
import {CommonHeader} from '../../../components';
import i18n from 'i18n-js';
const TransactionManagement = () => {
  const Components = useMemo(() => {
    return (
      <View style={GStyle.secondContainer}>
        <CommonHeader
          title={i18n.t('mineModule.transactionManagementT')}
          canBack
        />
      </View>
    );
  }, []);
  return Components;
};

export default memo(TransactionManagement);
