import React, { useState } from 'react';
import { Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProForm, { ProFormDatePicker, ProFormSelect } from '@ant-design/pro-form';
import { createRule, createVisit } from '@/services/visit';
import moment from 'moment';

const careMap = {
  doctor: '医疗',
  fruit: '精品水果',
  gift: '礼物',
};

const handleSubmit = async (values: createRule) => {
  try {
    const msg = await createVisit({ ...values });

    if (msg.insertId === 0) {
      message.success('登记成功！');
      return;
    }
  } catch (error) {
    message.error('登记失败，请使用未登记过的手机号码！');
  }
};

export default () => {
  const [isSelectDate, setIsSelect] = useState<boolean>(false);
  return (
    <PageHeaderWrapper>
      <Card>
        <ProForm
          onValuesChange={(values) => {
            if (values.care_date) setIsSelect(true);
          }}
          onReset={() => setIsSelect(false)}
          onFinish={async (values) => {
            handleSubmit(values as createRule);
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
              name="care_date"
              label="护理时间"
            />
            <ProFormSelect
              disabled={!isSelectDate}
              width="sm"
              name="care_project"
              label="护理项目"
              rules={[{ required: true, type: 'string' }]}
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
              name="care_person"
              label="护理人员"
              rules={[{ required: true, type: 'string' }]}
              request={async () => {
                return ['male', 'female'].map((value) => {
                  return {
                    label: value,
                    value,
                  };
                });
              }}
            />
            <ProFormSelect
              disabled={!isSelectDate}
              width="sm"
              name="cared_man"
              label="护理对象"
              rules={[{ required: true, type: 'string' }]}
              request={async () => {
                return ['male', 'female'].map((value) => {
                  return {
                    label: value,
                    value,
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
