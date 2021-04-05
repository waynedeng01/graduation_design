import React, { useState, useEffect } from 'react';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import Ring from './charts/Ring';
import Line from './charts/Line';
import ChartTable from './charts/ChartTable';
import { LineChartData, PieChartsData, tableData, tableListItem } from '@/const';
import { getStatistics } from '@/services/service';

function normalizeList(list: tableListItem[], income: number): tableData[] | [] {
  if (!list.length) return [];
  const res: tableData[] = list.map(({ costs_date, costs }, index) => ({
    key: index.toString(),
    name: new Date(costs_date).toLocaleDateString(),
    percent: costs / income,
    flow: costs,
  }));
  return res;
}

export default () => {
  const [responsive, setResponsive] = useState(false);
  const [dataList, setDataList] = useState<PieChartsData[]>([]);
  const [lineList, setLineList] = useState<LineChartData[]>([]);
  const [tableDataList, setTableList] = useState<tableData[]>([]);
  const [yesIn, setYesIn] = useState<number>(0);
  const [yesOut, setYesOut] = useState<number>(0);
  const date = new Date();
  useEffect(() => {
    getStatistics().then(({ data }) => {
      const { dataList, yesInCosts, yesOutCosts, lineChartList, tableDataList, income } = data;
      setYesIn(yesInCosts);
      setYesOut(yesOutCosts);
      setDataList(dataList);
      setLineList(lineChartList);
      setTableList(normalizeList(tableDataList, income));
    });
  }, []);

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
                  value: yesIn,
                  suffix: '.00',
                }}
              />
            </ProCard>
            <ProCard split="vertical">
              <StatisticCard
                statistic={{
                  title: '昨日支出',
                  value: yesOut,
                  suffix: '.00',
                }}
              />
            </ProCard>
          </ProCard>
          <StatisticCard title="全年利润走势" chart={<Line height={250} list={lineList} />} />
        </ProCard>
        <StatisticCard
          title="支出占比情况"
          chart={
            <>
              <Ring dataList={dataList} />
              <ChartTable tableDataList={tableDataList} />
            </>
          }
        />
      </ProCard>
    </RcResizeObserver>
  );
};
