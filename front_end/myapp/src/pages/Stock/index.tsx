import React, { useState, useEffect } from 'react';
import { Liquid } from '@ant-design/charts';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import StockPie, { StockPieProps } from '@/components/PieCharts/StockPie';
import { Button, message } from 'antd';
import { ModalForm, ProFormDigit } from '@ant-design/pro-form';
import { getStock, updateStockMsg } from '@/services/service';
import { createCosts, now, stockItem, STOCK_MAX, STOCK_PRICE } from '@/const';
import { LiquidConfig } from '@/components/LiquidCharts/config';

const DemoLiquid: React.FC = () => {
  const [options, setOptions] = useState<stockItem[]>([]);
  // 用于触发刷新请求
  const [values, setValues] = useState({});
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const list = await getStock();
        setOptions(list);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchOptions();
  }, [values]);

  const handleFinish = async (values: any) => {
    const { doctor = 0, fruit = 0, gift = 0 } = values;
    const costs = (doctor + fruit + gift) * STOCK_PRICE;
    const params: createCosts = {
      costs: costs,
      costs_date: now,
      costs_type: 'stock',
      inout_type: 'out',
    };
    // 人为假定最大值为100
    try {
      const msg = await updateStockMsg({ values, ...params });
      if (msg.insertId === 0) {
        message.success('进货成功！');
        setValues(values);
        return;
      }
    } catch (error) {
      message.error('进货失败，请重试！');
    }
  };

  let props: StockPieProps = {
    fruitNum: 0,
    doctorNum: 0,
    giftNum: 0,
  };

  if (options.length) {
    props = {
      fruitNum: options.filter((item) => item.name === 'fruit')[0]?.number || 0,
      doctorNum: options.filter((item) => item.name === 'doctor')[0]?.number || 0,
      giftNum: options.filter((item) => item.name === 'gift')[0]?.number || 0,
    };
  }

  const { fruitNum, doctorNum, giftNum } = props;

  const config = {
    ...LiquidConfig,
    percent: (fruitNum + doctorNum + giftNum) / STOCK_MAX,
  };

  return (
    <PageHeaderWrapper>
      <ProCard split="horizontal">
        <ProCard split="vertical">
          <ProCard title="库存剩余情况" headerBordered>
            <StatisticCard chart={<Liquid {...config} />} />
          </ProCard>
          <ProCard title="库存占比情况" headerBordered>
            <StatisticCard chart={<StockPie {...props} />} />
          </ProCard>
        </ProCard>
        <ProCard layout="center">
          <ModalForm
            title="请选择货物"
            trigger={<Button type="primary">进货</Button>}
            submitter={{
              searchConfig: {
                submitText: '确认',
                resetText: '取消',
              },
            }}
            onFinish={async (values) => {
              setValues({});
              handleFinish(values as any);
              return true;
            }}
          >
            <ProFormDigit label="精品水果" name="fruit" width="sm" min={1} max={10} />
            <ProFormDigit label="医疗服务" name="doctor" width="sm" min={1} max={10} />
            <ProFormDigit label="护理礼品" name="gift" width="sm" min={1} max={10} />
          </ModalForm>
        </ProCard>
      </ProCard>
    </PageHeaderWrapper>
  );
};

export default DemoLiquid;
