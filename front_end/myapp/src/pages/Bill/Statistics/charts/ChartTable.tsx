import React from 'react';
import { Table } from 'antd';
import MiniProgress from './MiniProgress';
import { tableDataProps } from '@/const';

export default (props: tableDataProps) => {
  const { tableDataList: data } = props;
  const columns = [
    {
      title: '消费日期',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '占比',
      dataIndex: 'percent',
      key: 'percent',
      render: (percent: number) => <MiniProgress percent={percent} />,
    },
    {
      title: '金额',
      dataIndex: 'flow',
      key: 'flow',
    },
  ];
  return <Table columns={columns} dataSource={data} pagination={false} style={{ marginTop: 16 }} />;
};
