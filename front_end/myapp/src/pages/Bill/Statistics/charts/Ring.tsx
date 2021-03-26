import React from 'react';
import { Pie } from '@ant-design/charts';

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
    autoFit: true,
    height: 250,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.64,
    label: {
      type: 'inner',
      content: '{value}',
      autoRotate: false,
      style: {
        fill: '#333',
        stroke: '#fff',
        strokeWidth: 1,
        shadowColor: '#fff',
        shadowBlur: 4,
      },
    },
  };
  return <Pie {...config} />;
};
export default DemoDonut;
