import React, { useState, useEffect, useRef } from 'react';
import { Card, FormInstance, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProForm, { ProFormDatePicker, ProFormSelect } from '@ant-design/pro-form';
import { createCareRecord, getStock } from '@/services/service';
import moment from 'moment';
import request from 'umi-request';
import { careMap, createCare } from '@/const';

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

  const ref = useRef<FormInstance>();

  useEffect(() => {
    const fetchOptions = async () => {
      const list = await request<{ data: { name: string; id: string }[] }>(
        `/capi/v2/staff/${date}`,
      );
      const options = list.data.map(({ name, id }) => {
        return {
          label: `${name}（${id}）`,
          value: `${name}_${id}`,
        };
      });
      setoptions(options);
    };
    fetchOptions();
  }, [date]);

  return (
    <PageHeaderWrapper>
      <Card>
        <ProForm
          formRef={ref}
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
            ref.current?.resetFields();
            setIsSelect(false);
            setDate('');
            setoptions([]);
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
                const list = await getStock();
                return list
                  .filter((item) => item.number > 0)
                  .map(({ name, number }) => {
                    return {
                      label: `${careMap[name]}`,
                      value: name,
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
