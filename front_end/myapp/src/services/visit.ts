// 来访信息相关API
import request from 'umi-request';
import Cookies from 'js-cookie';
import { detailsObj } from '@/pages/Detail/Detail';
import { StaffDetail } from '@/pages/Hr';

export type createRule = {
  name: string;
  phone: string;
  purpose: string;
  visit_date: Date;
  require_description: string;
};

export type createCare = {
  cared_user: string;
  cared_date: Date;
  cared_project: ('doctor' | 'fruit' | 'gift')[];
  care_staff: string;
};

export type createCosts = {
  costs: number;
  costs_date: string;
  inout_type: string;
  costs_type: string;
};

export async function createVisit(params: createRule) {
  return request<API.createVisitStateType>('/capi/v2/visit', {
    method: 'POST',
    data: params,
    headers: { 'x-csrf-token': Cookies.get('csrfToken') },
  });
}

// 创建入住
export async function createLive(params: detailsObj) {
  return request<API.createVisitStateType>('/capi/v2/live', {
    method: 'POST',
    data: params,
    headers: { 'x-csrf-token': Cookies.get('csrfToken') },
  });
}

// 出院办理
export async function deleteLive(key: number) {
  return request<string>(`/capi/v2/live/${key}`, {
    method: 'DELETE',
    headers: { 'x-csrf-token': Cookies.get('csrfToken') },
  });
}

// 新增护理记录
export async function createCareRecord(params: createCare) {
  return request<API.createVisitStateType>('/capi/v2/care', {
    method: 'POST',
    data: params,
    headers: { 'x-csrf-token': Cookies.get('csrfToken') },
  });
}

// 新增消费记录
export async function createCostsRecord(params: createCosts) {
  return request<API.createVisitStateType>('/capi/v2/bill', {
    method: 'POST',
    data: params,
    headers: { 'x-csrf-token': Cookies.get('csrfToken') },
  });
}

// 更新消费时间
export async function updatePayedDate(key: number, params: { idCard: string; payed_date: string }) {
  return request<string>(`/capi/v2/live/${key}`, {
    method: 'PUT',
    data: params,
    headers: { 'x-csrf-token': Cookies.get('csrfToken') },
  });
}
// 获取单个
export async function getVisit(mobile: string) {
  return request(`/capi/v2/visit/${mobile}`);
}

export async function getVisitList() {
  return request('/capi/v2/visit');
}

// 录入员工信息
export async function createStaffMessage(params: StaffDetail) {
  return request<API.createVisitStateType>('/capi/v2/hr', {
    method: 'POST',
    data: params,
    headers: { 'x-csrf-token': Cookies.get('csrfToken') },
  });
}

// 更新人事表
export async function updateStaffMessage(key: number, params: StaffDetail) {
  return request<string>(`/capi/v2/hr/${key}`, {
    method: 'PUT',
    data: params,
    headers: { 'x-csrf-token': Cookies.get('csrfToken') },
  });
}

// 删除一行数据 -- 人事表
export async function deleteStaffRecord(key: number) {
  return request<string>(`/capi/v2/hr/${key}`, {
    method: 'DELETE',
    headers: { 'x-csrf-token': Cookies.get('csrfToken') },
  });
}
