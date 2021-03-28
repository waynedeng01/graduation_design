import { Button, Card, message, AutoComplete } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import React, { useState } from 'react';
import styles from './style.less';
import { history } from 'umi';
import { deleteLive } from '@/services/service';

const _deleteLive = async (key: number) => {
  try {
    const msg = await deleteLive(key);
    if (!msg) {
      message.success('出院成功！');
      return;
    }
  } catch (error) {
    message.error(`出院失败，${error}`);
  }
};

export default () => {
  const [inputVal, setInputVal] = useState('');
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
          if (data.record.length) {
            message.warning('该客户还存在未结清的账单，将为您自动跳转到缴费界面');
            setTimeout(() => {
              history.push('/bill/sub-page1');
            }, 2000);
          } else {
            // 出院
            _deleteLive(Number(inputVal));
          }
        }
        setLoading(false);
        setInputVal('');
      })
      .catch((err) => {
        message.error(err);
        setLoading(false);
      });
  };

  return (
    <PageHeaderWrapper>
      <Card>
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
        <div className={styles['steps-action']}>
          <Button type="primary" loading={loading} onClick={() => next()}>
            出院
          </Button>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};
