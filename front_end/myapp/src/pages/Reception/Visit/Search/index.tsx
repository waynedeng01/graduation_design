import React from 'react';
import { Tag, Space } from 'antd';
import ProList from '@ant-design/pro-list';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import { createRule } from '@/services/visit';

export default () => (
  <PageHeaderWrapper>
    <ProList<createRule>
      search={{
        filterType: 'light',
      }}
      split
      rowKey="name"
      request={async (params) => {
        return request<{
          data: createRule[];
        }>(`/capi/v2/visit/${params.extra || ''}`);
      }}
      showActions="hover"
      metas={{
        title: {
          dataIndex: 'name',
          title: '客户姓名',
          search: false,
        },
        // 用作filter
        extra: {
          title: '客户电话',
        },
        avatar: {
          dataIndex: 'avartar',
          search: false,
        },
        description: {
          dataIndex: 'purpose',
          search: false,
        },
        content: {
          dataIndex: 'require_description',
          search: false,
        },
        subTitle: {
          render: (_, row) => {
            return (
              <Space size={0}>
                <Tag color="blue">{new Date(row.visit_date).toLocaleDateString()}</Tag>
                <Tag color="#5BD8A6">{row.phone}</Tag>
              </Space>
            );
          },
          search: false,
        },
      }}
    />
  </PageHeaderWrapper>
);
