import React, { useState } from 'react';
import { message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import BedPie from '../../../../components/PieCharts/BedPie';
import request from 'umi-request';
import { detailsObj } from '@/pages/Detail/Detail';
import { createLive } from '@/services/visit';

export const maleMap = {
  male: '男',
  female: '女',
};

export const typeMap = {
  advanced: '高级',
  normal: '普通',
};

const handleSubmit = async (values: detailsObj) => {
  try {
    const msg = await createLive({ ...values });
    if (msg.insertId === 0) {
      message.success('入住登记成功！');
      return;
    }
  } catch (error) {
    message.error('入住登记失败，请使用其他身份证号并重试！');
  }
};

export default () => {
  // 空房数据
  const [unliveNum, setUnliveNum] = useState(0);
  return (
    <PageHeaderWrapper>
      <ProCard gutter={16} ghost>
        <ProCard colSpan={18}>
          <ProForm
            onFinish={async (values) => {
              handleSubmit(values as detailsObj);
            }}
          >
            <ProForm.Group title="客户个人信息">
              <ProFormText
                width="sm"
                name="name"
                label="入住客户姓名"
                rules={[{ required: true, type: 'string', max: 10 }]}
                placeholder="请输入名称"
              />
              <ProFormText
                width="sm"
                name="phone"
                label="家人联系方式"
                rules={[{ type: 'string', required: true }]}
                placeholder="常用电话"
              />
              <ProFormSelect
                width="sm"
                name="sex"
                label="性别"
                rules={[{ required: true, type: 'string' }]}
                request={async () => {
                  return ['male', 'female'].map((value) => {
                    return {
                      label: maleMap[value],
                      value,
                    };
                  });
                }}
              />
              <ProFormText
                width="sm"
                name="age"
                rules={[{ required: true, type: 'string' }]}
                label="客户年纪"
                placeholder="当前年龄"
              />
              <ProFormText
                width="sm"
                name="idCard"
                label="身份证号"
                rules={[{ required: true, type: 'string' }]}
                placeholder="请输入合法身份证号"
              />
              <ProFormText
                width="sm"
                name="address"
                rules={[{ required: true, type: 'string' }]}
                label="住址"
                placeholder="家庭住址"
              />
            </ProForm.Group>
            <ProForm.Group title="合同信息">
              <ProFormSelect
                width="sm"
                name="id"
                label="床位号"
                rules={[{ required: true, type: 'string' }]}
                request={async () => {
                  const list = await request<string[]>(`/capi/v2/live/new`);
                  setUnliveNum(list.length);
                  return list.map((value) => {
                    return {
                      label: value,
                      value,
                    };
                  });
                }}
              ></ProFormSelect>
              <ProFormDatePicker
                width="sm"
                rules={[{ type: 'date', required: true }]}
                name="live_date"
                label="入住日期"
              />
              <ProFormSelect
                width="sm"
                name="type"
                label="护理类别"
                rules={[{ required: true, type: 'string' }]}
                request={async () => {
                  return ['normal', 'advanced'].map((value) => {
                    return {
                      label: typeMap[value],
                      value,
                    };
                  });
                }}
              ></ProFormSelect>
            </ProForm.Group>
          </ProForm>
        </ProCard>
        <ProCard colSpan={6}>
          <BedPie unliveNum={unliveNum}></BedPie>
        </ProCard>
      </ProCard>
    </PageHeaderWrapper>
  );
};
