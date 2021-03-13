import React from 'react';
import { WaterMark } from '@ant-design/pro-layout';

interface DetailProps {
  id: string;
}

export const BillDetail: React.FC<DetailProps> = (props) => {
  const { id } = props;
  return (
    // 水印展示账单详情
    <WaterMark content={id}>
      <div style={{ height: 500 }} />
    </WaterMark>
  );
};
