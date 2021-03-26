import React from 'react';
import { Tag, Space } from 'antd';
import ProList from '@ant-design/pro-list';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import { createRule } from '@/services/visit';
import { BackTop } from 'antd';

export default () => (
  <PageHeaderWrapper>
    <BackTop />
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
          render: (_, row) => {
            return (
              <Space size={5}>
                电话号码：{row.phone}
                来访目的：{row.purpose}
              </Space>
            );
          },
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
              </Space>
            );
          },
          search: false,
        },
      }}
    />
  </PageHeaderWrapper>
);
