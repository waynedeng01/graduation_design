import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import request from 'umi-request';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { maleMap } from '../Reception/Visit/Live';
import { createStaffMessage, deleteStaffRecord, updateStaffMessage } from '@/services/visit';

export type StaffDetail = {
  id: string;
  name: string;
  age: string;
  sex: string;
  advantage: string;
  phone: string;
};

const columns: ProColumns<StaffDetail>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '工号',
    dataIndex: 'id',
    copyable: true,
    editable: false,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    search: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '性别',
    hideInSearch: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    render: (_, record) => {
      return <div>{maleMap[record.sex]}</div>;
    },
  },
  {
    title: '特长',
    dataIndex: 'advantage',
    search: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];

async function handleSubmit(values: StaffDetail) {
  try {
    const staffId = Date.now().toString().substr(0, 9);
    values.id = staffId;
    const msg = await createStaffMessage({ ...values });
    if (msg.insertId === 0) {
      message.success('员工信息录入成功！');
    }
  } catch (error) {
    message.error('信息录入失败，请重试！');
  }
}

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageHeaderWrapper>
      <ProTable<StaffDetail>
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          const { id, name, phone } = params;
          const paramStr = `id=${id ? id : ''}&name=${name ? name : ''}&phone=${
            phone ? phone : ''
          }`;
          return request<{
            data: StaffDetail[];
          }>(`/capi/v2/hr/${id || name || phone ? paramStr : ''}`);
        }}
        // 编辑配置
        editable={{
          type: 'multiple',
          // 更新
          onSave: async (_, row) => {
            try {
              const msg = await updateStaffMessage(_ as number, row);
              if (!msg) {
                message.success('更新成功！');
                actionRef.current?.reload();
                return;
              }
            } catch (error) {
              message.error(`更新失败，${error}`);
            }
          },
          onDelete: async (_) => {
            try {
              const msg = await deleteStaffRecord(_ as number);
              if (!msg) {
                message.success('删除成功！');
                actionRef.current?.reload();
                return;
              }
            } catch (error) {
              message.error(`删除失败，${error}`);
            }
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        headerTitle="人事管理表"
        toolBarRender={() => [
          <ModalForm
            title="信息录入"
            trigger={
              <Button icon={<PlusOutlined />} type="primary">
                录入员工
              </Button>
            }
            onFinish={async (values) => {
              handleSubmit(values as StaffDetail);
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText
              width="md"
              name="name"
              label="员工姓名"
              rules={[{ required: true, type: 'string', max: 10 }]}
              placeholder="请输入名称"
            />
            <ProFormText
              width="md"
              name="age"
              label="年龄"
              rules={[{ type: 'string', required: true }]}
              placeholder="员工年龄"
            />
            <ProFormSelect
              width="md"
              name="sex"
              label="性别"
              rules={[{ required: true, type: 'string' }]}
              request={async () => {
                return ['male', 'female'].map((value) => {
                  return {
                    label: maleMap[value],
                    value,
                  };
                });
              }}
            />
            <ProFormText
              width="md"
              name="advantage"
              label="特长"
              tooltip="最长为 24 位"
              rules={[{ required: true, type: 'string', max: 24 }]}
              placeholder="请输入特长"
            />
            <ProFormText
              width="md"
              name="phone"
              rules={[{ required: true, type: 'string' }]}
              label="联系方式"
              placeholder="请输入联系方式"
            />
          </ModalForm>,
        ]}
      />
    </PageHeaderWrapper>
  );
};
