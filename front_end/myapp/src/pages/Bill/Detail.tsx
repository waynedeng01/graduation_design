import React from 'react';
import { WaterMark } from '@ant-design/pro-layout';
import { Timeline } from 'antd';
import ProCard from '@ant-design/pro-card';
import { careMap } from '../Care';
import { Statistic, Row, Col } from 'antd';

type care_record = {
  cared_project: string;
  cared_date: string;
  care_staff: string;
  id: string; // 护理记录id
  costs: number; // 单条记录金额
};

export interface detailsObj {
  payed_date: string;
  accoCosts: number;
  projectCosts: number;
  record: care_record[];
}

interface DetailProps {
  waterId: string;
  details: detailsObj;
}

export const BillDetail: React.FC<DetailProps> = (props) => {
  const { waterId, details } = props;
  const { payed_date, accoCosts, projectCosts, record } = details;
  return (
    <ProCard
      split="horizontal"
      title="老人消费时间线"
      tooltip={'上次结账时间：' + new Date(payed_date).toLocaleDateString()}
      headerBordered
    >
      <ProCard>
        <WaterMark content={waterId}>
          <div style={{ marginTop: '25px' }}>
            <Timeline>
              {record.map(({ care_staff, cared_date, cared_project, id, costs }) => (
                <Timeline.Item key={id}>{`护理项目：${cared_project
                  .split(',')
                  .map((item) => careMap[item])}；护理员工：${care_staff}；护理日期：${new Date(
                  cared_date,
                ).toLocaleDateString()}；金额：${costs}`}</Timeline.Item>
              ))}
            </Timeline>
          </div>
        </WaterMark>
      </ProCard>
      <ProCard title="金额">
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="住宿消费" value={accoCosts} suffix=".00" />
          </Col>
          <Col span={12}>
            <Statistic title="护理消费" value={projectCosts} suffix=".00" />
          </Col>
        </Row>
      </ProCard>
      <ProCard>
        <div style={{ color: '#ff7800', fontSize: '24px' }}>{`总计：${
          accoCosts + projectCosts
        }.00`}</div>
      </ProCard>
    </ProCard>
  );
};
