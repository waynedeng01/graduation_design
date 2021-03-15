import React from 'react';
import { WaterMark } from '@ant-design/pro-layout';
import { Descriptions } from 'antd';
import { maleMap, typeMap } from '@/pages/Reception/Visit/Live';

export interface detailsObj {
  name: string;
  phone: string;
  sex: 'male' | 'female';
  age: string;
  idCard: string;
  address: string;
  // 床位号
  id: string;
  live_date: string;
  type: 'normal' | 'advanced';
}

interface DetailProps {
  waterId: string;
  details: detailsObj;
}

export const BillDetail: React.FC<DetailProps> = (props) => {
  const { waterId, details } = props;
  const { name, phone, sex, age, idCard, id, address, live_date, type } = details;
  return (
    // 水印展示账单详情
    // 应当展示完全信息
    // 1.基本个人信息  2.合同信息  3.消费信息在收费管理中展示
    <WaterMark content={waterId}>
      <div style={{ marginTop: '25px' }}>
        <Descriptions title="档案详情" bordered>
          <Descriptions.Item label="老人姓名">{name}</Descriptions.Item>
          <Descriptions.Item label="家人联系方式">{phone}</Descriptions.Item>
          <Descriptions.Item label="性别">{maleMap[sex]}</Descriptions.Item>
          <Descriptions.Item label="年龄">{age}</Descriptions.Item>
          <Descriptions.Item label="入住日期" span={2}>
            {new Date(live_date).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="身份证号" span={3}>
            {idCard}
          </Descriptions.Item>
          <Descriptions.Item label="床位号">{id}</Descriptions.Item>
          <Descriptions.Item label="服务类别">{typeMap[type]}</Descriptions.Item>
          <Descriptions.Item label="家庭地址">{address}</Descriptions.Item>
        </Descriptions>
      </div>
    </WaterMark>
  );
};
