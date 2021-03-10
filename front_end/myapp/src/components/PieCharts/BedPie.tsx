// 床位饼图
import React from 'react';
import { Pie } from '@ant-design/charts';

const BedPie: React.FC = () => {
  var data = [
    {
      type: '已住床位',
      value: 50,
    },
    {
      type: '剩余床位',
      value: 50,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
    },
  };
  return <Pie {...config} />;
};

export default BedPie;
