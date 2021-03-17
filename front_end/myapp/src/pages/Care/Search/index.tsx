import React from 'react';
import { Tag, Space, Typography } from 'antd';
import ProList from '@ant-design/pro-list';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import { createCare } from '@/services/visit';
import { careMap } from '../index';

function transUnix(timeStamp: string): string {
  const date = new Date(Number(timeStamp));
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function chooseColor(index: number): string {
  let res = '';
  switch (index) {
    case 0:
      res = 'blue';
      break;
    case 1:
      res = 'cyan';
      break;
    default:
      res = 'geekblue';
      break;
  }
  return res;
}

export default () => (
  <PageHeaderWrapper>
    <ProList<createCare & { id: string }>
      search={{
        filterType: 'light',
      }}
      split
      rowKey="id"
      request={async (params) => {
        return request<{
          data: [createCare & { id: string }];
        }>(`/capi/v2/care`);
      }}
      showActions="hover"
      metas={{
        title: {
          dataIndex: 'care_staff',
          search: false,
        },
        description: {
          render: (_, row) => {
            return (
              <Space size={25}>
                <Typography.Paragraph>护理对象：{row.cared_user}</Typography.Paragraph>
                <Typography.Paragraph>
                  护理日期：{new Date(row.cared_date).toLocaleDateString()}
                </Typography.Paragraph>
              </Space>
            );
          },
          search: false,
        },
        content: {
          render: (_, row) => {
            return (
              <Space size={0}>
                <Typography.Text>排班时间：</Typography.Text>
                {transUnix(row.id)}
              </Space>
            );
          },
          search: false,
        },
        subTitle: {
          render: (_, row) => {
            return (
              <Space size={0}>
                {row.cared_project.map((item, index) => (
                  <Tag key={index} color={chooseColor(index)}>
                    {careMap[item]}
                  </Tag>
                ))}
              </Space>
            );
          },
          search: false,
        },
      }}
    />
  </PageHeaderWrapper>
);
