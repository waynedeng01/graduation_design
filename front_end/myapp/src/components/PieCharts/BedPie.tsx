// 床位饼图
import React from 'react';
import { Pie } from '@ant-design/charts';
import { PieChartsConfig } from './config';

const BedPie: React.FC<{ unliveNum: number }> = (props) => {
  const { unliveNum } = props;
  const data = [
    {
      type: '已住床位',
      value: 15 - unliveNum,
    },
    {
      type: '剩余床位',
      value: unliveNum,
    },
  ];
  const config = {
    data,
    ...PieChartsConfig,
  };
  return <Pie {...config} />;
};

export default BedPie;
