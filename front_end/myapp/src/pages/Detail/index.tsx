// 老人详细信息
import { Steps, Button, Card, Input, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import React, { useState } from 'react';
import { BillDetail, detailsObj } from './Detail';
import styles from './style.less';
const { Step } = Steps;

const steps = [
  {
    title: '查询',
  },
  {
    title: '明细',
  },
];

const defaultObj: detailsObj = {
  name: '',
  phone: '',
  age: '',
  address: '',
  live_date: '',
  sex: 'male',
  type: 'normal',
  idCard: '',
  id: '',
};

export default () => {
  const [current, setCurrent] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [details, setDetails] = useState<detailsObj>(defaultObj);
  const [loading, setLoading] = useState<boolean>(false);

  const next = () => {
    if (!inputVal) {
      message.error('身份证号为必要筛选条件');
      return;
    }
    setLoading(true);
    // 在此处给出请求
    request(`/capi/v2/live/${inputVal}`)
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
        <div>
          {current > 0 ? (
            <BillDetail waterId={inputVal} details={details} />
          ) : (
            <Input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{ marginTop: '24px' }}
              placeholder="请输入身份证号"
              allowClear
            ></Input>
          )}
        </div>
        <div className={styles['steps-action']}>
          {current < steps.length - 1 && (
            <Button type="primary" loading={loading} onClick={() => next()}>
              下一步
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              返回
            </Button>
          )}
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};
