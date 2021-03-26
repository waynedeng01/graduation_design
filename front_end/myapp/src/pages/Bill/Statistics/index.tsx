import React, { useState } from 'react';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import Ring from './charts/Ring';
import Line from './charts/Line';
import ChartTable from './charts/ChartTable';

const { Statistic } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);
  const date = new Date();

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 640);
      }}
    >
      <ProCard
        title="公司收支明细"
        extra={`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
        split={responsive ? 'horizontal' : 'vertical'}
        headerBordered
        bordered
      >
        <ProCard split="horizontal">
          <ProCard split="horizontal">
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '昨日收入',
                  value: 234,
                  suffix: '.00',
                  description: <Statistic title="较本月平均收入" value="8.04%" trend="down" />,
                }}
              />
              <StatisticCard
                statistic={{
                  title: '本月累计收入',
                  value: 234,
                  suffix: '.00',
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '昨日支出',
                  value: '200',
                  suffix: '.00',
                }}
              />
              <StatisticCard
                statistic={{
                  title: '本月累计支出',
                  value: '134',
                  suffix: '.00',
                }}
              />
            </ProCard>
          </ProCard>
          <StatisticCard title="全年利润走势" chart={<Line height={250} />} />
        </ProCard>
        <StatisticCard
          title="月支出占比情况"
          chart={
            <>
              <Ring />
              <ChartTable />
            </>
          }
        />
      </ProCard>
    </RcResizeObserver>
  );
};
