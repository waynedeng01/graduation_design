// 老人缴费
// 通过身份证号查询老人的消费记录
import { Modal, Steps, Button, Card, message, AutoComplete } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import React, { useState } from 'react';
import { BillDetail, detailsObj } from './Detail';
import styles from './style.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Step } = Steps;
const { confirm } = Modal;

const steps = [
  {
    title: '查询',
  },
  {
    title: '明细',
  },
];

const defaultObj: detailsObj = {
  accoCosts: 0,
  projectCosts: 0,
  payed_date: '',
  record: [],
};

function showConfirm() {
  confirm({
    title: '确认支付?',
    icon: <ExclamationCircleOutlined />,
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}

export default () => {
  const [current, setCurrent] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [details, setDetails] = useState<detailsObj>(defaultObj);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const onSearch = (searchText: string) => {
    request<{ idCard: string }[]>('/capi/v2/idCard')
      .then((res) => {
        const arr = res.map(({ idCard }) => ({ value: idCard }));
        const showArr = arr.filter((item) => item.value.indexOf(searchText) > -1);
        setOptions(!searchText ? [] : showArr);
      })
      .catch((err) => {
        setOptions([]);
        message.error(err);
      });
  };
  const onSelect = (data: string) => {
    setInputVal(data);
  };

  const next = () => {
    if (!inputVal) {
      message.error('身份证号为必要筛选条件');
      return;
    }
    setLoading(true);
    request(`/capi/v2/bill/${inputVal}`)
      .then((res) => {
        const { data } = res;
        if (!data) message.error('该客户暂未入住，请先办理入住手续');
        else {
          setCurrent(current + 1);
          setDetails(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        message.error(err);
        setLoading(false);
      });
  };

  const prev = () => {
    setInputVal('');
    setCurrent(current - 1);
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ marginTop: '24px' }}>
          {current > 0 ? (
            <BillDetail waterId={inputVal} details={details} />
          ) : (
            <AutoComplete
              allowClear
              options={options}
              onSearch={onSearch}
              onSelect={onSelect}
              value={inputVal}
              onChange={(data) => setInputVal(data)}
              style={{ width: '100%' }}
              size="middle"
              placeholder="请输入身份证号"
            />
          )}
        </div>
        <div className={styles['steps-action']}>
          {current < steps.length - 1 && (
            <Button type="primary" loading={loading} onClick={() => next()}>
              下一步
            </Button>
          )}
          {current > 0 && (
            <>
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                返回
              </Button>
              <Button type="primary" style={{ margin: '0 8px' }} onClick={() => showConfirm()}>
                结账
              </Button>
            </>
          )}
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};
