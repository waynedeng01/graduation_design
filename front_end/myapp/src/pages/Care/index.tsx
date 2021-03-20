import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProForm, { ProFormDatePicker, ProFormSelect } from '@ant-design/pro-form';
import { createCare, createCareRecord } from '@/services/visit';
import moment from 'moment';
import request from 'umi-request';

export const careMap = {
  doctor: '医疗',
  fruit: '精品水果',
  gift: '礼物',
};

const handleSubmit = async (values: createCare) => {
  try {
    const msg = await createCareRecord({ ...values });

    if (msg.insertId === 0) {
      message.success('护理排班成功！');
      return;
    }
  } catch (error) {
    message.error('排班失败，请重试！');
  }
};

export default () => {
  const [isSelectDate, setIsSelect] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [options, setoptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const list = await request<{ data: string[] }>(`/capi/v2/staff/${date}`);
      const options = list.data.map((id) => {
        return {
          label: id,
          value: id,
        };
      });
      console.log(options);
      setoptions(options);
    };
    fetchOptions();
  }, [date]);

  return (
    <PageHeaderWrapper>
      <Card>
        <ProForm
          onValuesChange={(values) => {
            const { cared_date } = values;
            if (cared_date) {
              const dateStr = new Date(moment(cared_date).valueOf()).toLocaleDateString();
              setDate(dateStr.split('/').join('-'));
              setIsSelect(true);
            }
          }}
          onReset={() => setIsSelect(false)}
          onFinish={async (values) => {
            handleSubmit(values as createCare);
          }}
        >
          <ProForm.Group>
            <ProFormDatePicker
              // @ts-ignore
              fieldProps={{
                disabledDate: (current: any) => current && current < moment().endOf('day'),
              }}
              allowClear={false}
              width="sm"
              rules={[{ type: 'date', required: true }]}
              name="cared_date"
              label="护理时间"
            />
            <ProFormSelect
              disabled={!isSelectDate}
              width="sm"
              name="cared_project"
              label="护理项目"
              fieldProps={{
                mode: 'multiple',
              }}
              rules={[{ required: true, type: 'array' }]}
              request={async () => {
                return ['doctor', 'fruit', 'gift'].map((value) => {
                  return {
                    label: careMap[value],
                    value,
                  };
                });
              }}
            />
            <ProFormSelect
              disabled={!isSelectDate}
              width="sm"
              name="care_staff"
              label="护理人员"
              rules={[{ required: true, type: 'string' }]}
              fieldProps={{ options }}
            />
            <ProFormSelect
              disabled={!isSelectDate}
              width="sm"
              name="cared_user"
              label="护理对象"
              rules={[{ required: true, type: 'string' }]}
              request={async () => {
                const list = await request<{ idCard: string; name: string }[]>(
                  `/capi/v2/caredUser`,
                );
                return list.map(({ idCard, name }) => {
                  return {
                    label: `${name}（${idCard}）`,
                    value: idCard,
                  };
                });
              }}
            />
          </ProForm.Group>
        </ProForm>
      </Card>
    </PageHeaderWrapper>
  );
};
