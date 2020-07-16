import React, {memo, useMemo, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {GStyle, Colors} from '../../../../../assets/theme';
import {
  CommonHeader,
  BounceSpinner,
  CommonToast,
  Communication,
} from '../../../../../components/template';
import {pTd} from '../../../../../utils/common';
import {useFocusEffect} from '@react-navigation/native';
import {aelfInstance} from '../../../../../utils/common/aelfProvider';
import {useSetState} from '../../../../../utils/pages/hooks';
import {TextL} from '../../../../../components/template/CommonText';
import unitConverter from '../../../../../utils/pages/unitConverter';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {userSelectors} from '../../../../../redux/userRedux';
import {useSelector, shallowEqual} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {onCopyText} from '../../../../../utils/pages';
import aelfUtils from '../../../../../utils/pages/aelfUtils';
const NetworkManagement = props => {
  const [state, setState] = useSetState({
    result: null,
    details: null,
  });
  const address = useSelector(userSelectors.getAddress, shallowEqual);
  const {result, details} = state;
  const {params} = props.route || {};
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetch = async () => {
        const {TransactionId} = params || {};
        if (TransactionId) {
          try {
            const txResult = await aelfInstance.chain.getTxResult(
              TransactionId,
            );
            if (isActive) {
              setState({
                result: txResult,
                details: JSON.parse(txResult.Transaction.Params),
              });
            }
          } catch (error) {
            CommonToast.text('');
          }
        }
      };
      fetch();
      return () => {
        isActive = false;
      };
    }, [params, setState]),
  );
  const Element = useMemo(() => {
    if (!(details && result)) {
      return null;
    }
    const {amount, symbol, to} = details || {};
    const {Status, TransactionId, Logs} = result || {};
    const free = aelfUtils.getTransactionFee(Logs || {});
    const List = [
      {title: 'From', details: address, copy: true},
      {title: 'To', details: aelfUtils.formatAddress(to), copy: true},
      {title: 'Memo', details: details.memo},
      {title: 'Status', details: Status, color: 'green'},
      {
        title: 'Transaction Id',
        details: TransactionId,
        copy: true,
        onPress: () => {
          Communication.web(aelfUtils.webURLTx(TransactionId));
        },
      },
      {title: 'Fee', details: `${free.cost} ${free.symbol}`},
    ];
    return (
      <View style={styles.container}>
        <View style={styles.amountBox}>
          {amount > 0 ? (
            <FontAwesome5 name="arrow-circle-up" size={30} color={'red'} />
          ) : (
            <FontAwesome5 name="arrow-circle-down" size={30} color={'green'} />
          )}
          <TextL style={styles.amount}>
            {unitConverter.toLower(amount)} {symbol}
          </TextL>
        </View>
        {List.map((item, index) => {
          const {copy, title, onPress, color} = item;
          return (
            <View key={index} style={styles.itemBox}>
              <TextL style={{color: Colors.fontGray}}>{title}</TextL>
              {copy ? (
                <TextL
                  onPress={() =>
                    onPress ? onPress(item) : onCopyText(item.details)
                  }
                  style={styles.detailsStyle}>
                  {item.details}
                  {onPress ? (
                    <FontAwesome name="share-square-o" size={pTd(30)} />
                  ) : (
                    <Icon name="copy1" size={pTd(32)} />
                  )}
                </TextL>
              ) : (
                <TextL style={[styles.details, {color: color}]}>
                  {item.details}
                </TextL>
              )}
            </View>
          );
        })}
      </View>
    );
  }, [details, address, result]);
  const Loading = useMemo(() => {
    return (
      <View style={styles.loadingBox}>
        <BounceSpinner />
      </View>
    );
  }, []);
  return (
    <View style={GStyle.container}>
      <CommonHeader title={'交易详情'} canBack>
        {result && details ? Element : Loading}
      </CommonHeader>
    </View>
  );
};

export default memo(NetworkManagement);
const styles = StyleSheet.create({
  container: {
    marginTop: pTd(50),
    marginHorizontal: pTd(50),
  },
  itemBox: {
    marginTop: pTd(30),
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    paddingTop: pTd(300),
  },
  amountBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  amount: {
    marginLeft: pTd(30),
  },
  details: {
    marginTop: pTd(10),
  },
  detailsStyle: {
    marginTop: pTd(10),
    color: Colors.fontColor,
  },
});
