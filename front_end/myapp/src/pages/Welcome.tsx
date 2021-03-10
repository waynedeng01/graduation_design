import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { HeartTwoTone, SmileTwoTone, BarChartOutlined, AlertOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Typography.Title level={2}>
          <SmileTwoTone /> 树立全新的养老院管理形象
        </Typography.Title>
        <Typography.Title level={2}>
          <AlertOutlined twoToneColor="#f81313" /> 安全管理
        </Typography.Title>
        <Typography.Title level={2}>
          <HeartTwoTone twoToneColor="#eb2f96" /> 耐用可靠
        </Typography.Title>
        <Typography.Title level={2}>
          <BarChartOutlined /> 运营成本最低
        </Typography.Title>
      </Card>
    </PageContainer>
  );
};
