import React from 'react';
import { Line } from '@ant-design/charts';
import { LineChartsProps } from '@/const';

export default (props: LineChartsProps) => {
  const { autoFit = true, height = 500, list: data } = props;
  const config = {
    autoFit,
    height,
    data,
    xField: 'month',
    yField: 'value',
    label: {},
    yAxis: {
      nice: true,
      // min: 0,
      // max: 15,
    },
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5b8ff9',
        lineWidth: 2,
      },
    },
  };
  return <Line {...config} />;
};
