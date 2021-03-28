import React from 'react';
import { Pie } from '@ant-design/charts';
import { PieChartsConfig } from '@/components/PieCharts/config';

const DemoDonut: React.FC = () => {
  const data = [
    {
      type: '购买水果',
      value: 27,
    },
    {
      type: '购买礼物',
      value: 25,
    },
    {
      type: '医疗建设',
      value: 18,
    },
    {
      type: '工资发放',
      value: 15,
    },
  ];
  const config: any = {
    data,
    ...PieChartsConfig,
  };
  return <Pie {...config} />;
};
export default DemoDonut;
