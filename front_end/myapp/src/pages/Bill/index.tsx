// 收费管理 -- 做成步骤条的形式
// 1.输入id -- 查询记录
// 结账或者返回
import { Steps, Button, message, Card, Input, Typography } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import React from 'react';
import { BillDetail } from './Detail';
import styles from './style.less';
const { Step } = Steps;

const DoneText = () => (
  <Card>
    <Typography.Title
      level={2}
      style={{
        textAlign: 'center',
      }}
    >
      <SmileTwoTone /> 您的费用已经全部结清，祝您生活愉快 <HeartTwoTone twoToneColor="#eb2f96" />
    </Typography.Title>
  </Card>
);

const steps = [
  {
    title: '查询',
    // content: <Input style={{ marginTop: '24px' }} placeholder="请输入房间号" allowClear></Input>,
  },
  {
    title: '明细',
    content: <BillDetail id="测试" />,
  },
  {
    title: '结清出院',
    content: <DoneText></DoneText>,
  },
];

export default () => {
  const [current, setCurrent] = React.useState(0);
  const [inputVal, setInputVal] = React.useState('');

  const next = () => {
    if (current === 0) {
      // console.log(inputVal);
      setInputVal('');
    }
    setCurrent(current + 1);
  };

  const prev = () => {
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
            steps[current].content
          ) : (
            <Input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{ marginTop: '24px' }}
              placeholder="请输入房间号"
              allowClear
            ></Input>
          )}
        </div>
        <div className={styles['steps-action']}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                message.success('出院流程已经走完，2s后自动为您跳转！');
                setTimeout(() => {
                  setCurrent(0);
                }, 2000);
              }}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};
