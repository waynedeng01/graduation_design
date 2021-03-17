import React from 'react';
import { Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormDatePicker, ProFormTextArea } from '@ant-design/pro-form';
import { createRule, createVisit } from '@/services/visit';
import moment from 'moment';

const handleSubmit = async (values: createRule) => {
  try {
    const msg = await createVisit({ ...values });

    if (msg.insertId === 0) {
      message.success('登记成功！');
      return;
    }
  } catch (error) {
    message.error('登记失败，请使用未登记过的手机号码！');
  }
};

export default () => {
  return (
    <PageHeaderWrapper>
      <Card>
        <ProForm
          onFinish={async (values) => {
            handleSubmit(values as createRule);
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
              rules={[{ type: 'string', required: true }]}
              placeholder="常用电话"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="md"
              rules={[{ type: 'string', required: true }]}
              name="purpose"
              label="来访目的"
              placeholder="目的描述"
            />
            <ProFormDatePicker
              // @ts-ignore
              fieldProps={{
                disabledDate: (current: any) => {
                  return current && current < moment().endOf('day');
                },
              }}
              width="md"
              rules={[{ type: 'date', required: true }]}
              name="visit_date"
              label="来访时间"
            />
          </ProForm.Group>
          <ProFormTextArea
            width="md"
            rules={[{ type: 'string', required: true }]}
            name="require_description"
            label="需求描述"
          />
        </ProForm>
      </Card>
    </PageHeaderWrapper>
  );
};
