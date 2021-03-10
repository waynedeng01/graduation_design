import React from 'react';
import { message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import BedPie from '../../../../components/PieCharts/BedPie';

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
      <ProCard gutter={16} ghost>
        <ProCard colSpan={18}>
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
                label="入住客户姓名"
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
              <ProFormText width="md" name="age" label="客户年纪" placeholder="当前年龄" />
              <ProFormText width="md" name="address" label="住址" placeholder="家庭住址" />
            </ProForm.Group>
            <ProFormSelect
              width="md"
              name="id"
              label="床位号"
              request={async () => {
                return ['default', 'primary', 'ghost', 'dashed', 'link', 'text'].map((value) => {
                  return {
                    label: value,
                    value,
                  };
                });
              }}
            ></ProFormSelect>
          </ProForm>
        </ProCard>
        <ProCard colSpan={6}>
          <BedPie></BedPie>
        </ProCard>
      </ProCard>
    </PageHeaderWrapper>
  );
};
