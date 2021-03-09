import React from 'react';
import { Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormDatePicker, ProFormTextArea } from '@ant-design/pro-form';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default () => {
  return (
    <PageHeaderWrapper>
      <Card>
        <ProForm
          onFinish={async () => {
            await waitTime(2000);
            message.success('提交成功');
          }}
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              label="来访客户名称"
              rules={[{ required: true, type: 'string', max: 10 }]}
              placeholder="请输入名称"
            />
            <ProFormText
              width="md"
              name="phone"
              label="电话号码"
              rules={[{ type: 'number', required: true }]}
              placeholder="常用电话"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText width="md" name="purpose" label="来访目的" placeholder="目的描述" />
            <ProFormDatePicker width="md" name="time" label="来访时间" />
          </ProForm.Group>
          <ProFormTextArea width="md" name="production" label="需求描述" />
        </ProForm>
      </Card>
    </PageHeaderWrapper>
  );
};
