import React, { useRef, useState } from 'react';
import { Card, FormInstance, message, Form, Upload } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormDatePicker, ProFormTextArea } from '@ant-design/pro-form';
import { createVisit } from '@/services/service';
import moment from 'moment';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { beforeUpload, getBase64 } from '@/utils';
import { createRule, TOKEN } from '@/const';

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

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export default () => {
  const ref = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);
  const [imgUrl, setUrl] = useState('');
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const restProps = {
    beforeUpload,
    onChange: (info: any) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl: string) => {
          setUrl(imageUrl);
          setLoading(false);
        });
      }
    },
  };

  return (
    <PageHeaderWrapper>
      <Card>
        <ProForm
          formRef={ref}
          onFinish={async (values) => {
            handleSubmit(values as createRule);
            ref.current?.resetFields();
            setUrl('');
          }}
        >
          <Form.Item
            name="avartar"
            label="头像"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true }]}
          >
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://img.coolcr.cn/api/upload"
              headers={{ token: TOKEN }}
              {...restProps}
            >
              {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              label="来访客户名称"
              rules={[{ required: true, type: 'string', max: 10 }]}
              placeholder="请输入名称"
            />
            <ProFormText
              width="md"
              name="phone"
              label="电话号码"
              rules={[{ type: 'string', required: true }]}
              placeholder="常用电话"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="md"
              rules={[{ type: 'string', required: true }]}
              name="purpose"
              label="来访目的"
              placeholder="目的描述"
            />
            <ProFormDatePicker
              // @ts-ignore
              fieldProps={{
                disabledDate: (current: any) => {
                  return current && current < moment().endOf('day');
                },
              }}
              width="md"
              rules={[{ type: 'date', required: true }]}
              name="visit_date"
              label="来访时间"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormTextArea
              width="md"
              rules={[{ type: 'string', required: true }]}
              name="require_description"
              label="需求描述"
            />
          </ProForm.Group>
        </ProForm>
      </Card>
    </PageHeaderWrapper>
  );
};
