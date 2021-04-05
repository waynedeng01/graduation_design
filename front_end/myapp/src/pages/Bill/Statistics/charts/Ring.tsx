import React from 'react';
import { Pie } from '@ant-design/charts';
import { PieChartsConfig } from '@/components/PieCharts/config';
import { PieChartsProps } from '@/const';

const DemoDonut: React.FC<PieChartsProps> = (props) => {
  const { dataList: data } = props;
  const config: any = {
    data,
    ...PieChartsConfig,
  };
  return <Pie {...config} />;
};
export default DemoDonut;
