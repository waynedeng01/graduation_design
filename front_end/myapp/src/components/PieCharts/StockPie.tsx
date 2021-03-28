// 库存饼图
import React from 'react';
import { Pie } from '@ant-design/charts';
import { PieChartsConfig } from './config';

export type StockPieProps = {
  giftNum: number;
  fruitNum: number;
  doctorNum: number;
};

const StockPie: React.FC<StockPieProps> = (props) => {
  const { giftNum, fruitNum, doctorNum } = props;
  const data = [
    {
      type: '礼物',
      value: giftNum,
    },
    {
      type: '精品水果',
      value: fruitNum,
    },
    {
      type: '医疗服务',
      value: doctorNum,
    },
  ];

  const config = {
    data,
    ...PieChartsConfig,
  };
  return <Pie {...config} />;
};

export default StockPie;
