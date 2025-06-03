/**
 * cn - 筛选
 *    -- 设置 column 的 `filter` 开启数据筛选功能
 *    -- 支持搜索框和下拉选择框两种模式，下拉框支持单选和多选
 * en - Filter
 *    -- Set the filter property of column to display the filter box
 *    -- Support two modes: search and select, select mode supports single and multiple selection
 */

import React from 'react';
import { Table, TYPE } from 'shineout';
import {icon1, icon2, icon3, icon4, icon5, icon6} from './static/icon'

interface TableRowData {
  id: number;
  name: string;
  age: number;
  salary: number;
  company: string;
  address: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    name: 'Ephraim',
    age: 28,
    address: 'New York No.1 Lake Park',
    salary: 88000,
    company: 'Google',
  },
  {
    id: 2,
    name: 'Osvaldo',
    age: 50,
    address: 'New York No.2 Lake Park',
    salary: 90000,
    company: 'Apple',
  },
  {
    id: 3,
    name: 'Dylan',
    age: 25,
    address: 'New York No.3 Lake Park',
    salary: 68000,
    company: 'Microsoft',
  },
  {
    id: 4,
    name: 'Shaniya',
    age: 42,
    address: 'New York No.4 Lake Park',
    salary: 55000,
    company: 'Tictok',
  },
  {
    id: 5,
    name: 'Jovanny',
    age: 35,
    address: 'New York No.5 Lake Park',
    salary: 45000,
    company: 'Tencent',
  },
];

const columns: TableColumnItem[] = [
  {
    title: 'Name',
    render: 'name',
    width: 300,
    filter: {
      // 筛选模式：search 搜索框
      mode: 'search',
      // 根据onFilter函数过滤数据
      onFilter: (value: string, row) => {
        return row.name.startsWith(value);
      },
    },
  },
  {
    title: 'Age',
    render: 'age',
    width: 300,
    filter: {
      // 筛选模式：select 选择框（单选或多选）
      mode: 'select',
      // 仅select模式下有效，筛选选项的配置
      config: {
        // 筛选的选项数据
        data: [
          { label: 'Young', value: 'young' },
          { label: 'Middle', value: 'middle' },
          { label: 'Old', value: 'old' },
        ],
        // 是否开启多选
        multiple: true,
      },
      onFilter: (values: string[], row) => {
        return values.some(value => {
          if (value === 'young') return row.age < 30;
          if (value === 'middle') return row.age >= 30 && row.age < 40;
          return row.age >= 40;
        })
      },
    },
  },
  {
    title: 'Salary',
    render: 'salary',
    width: 300,
    filter: {
      mode: 'select',
      config: {
        data: [
          { label: '50000', value: 50000 },
          { label: '60000', value: 60000 },
          { label: '70000', value: 70000 },
          { label: '80000', value: 80000 },
          { label: '90000', value: 90000 },
        ],
        // 自定义渲染选项
        renderItem: (d) => `>= ${d.label}`,
        multiple: false,
      },
      onFilter: (value, row) => {
        return row.salary >= value;
      },
    },
  },
  {
    title: 'Company',
    render: 'company',
    width: 300,
    filter: {
      mode: 'select',
      config: {
        data: [
          { label: 'Google', value: 'Google', icon: icon1 },
          { label: 'Apple', value: 'Apple', icon: icon2 },
          { label: 'Microsoft', value: 'Microsoft', icon: icon3 },
          { label: 'Tictok', value: 'Tictok', icon: icon4 },
          { label: 'Tencent', value: 'Tencent', icon: icon5 },
        ],
        // 自定义渲染选项
        renderItem: (d) => (
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            {d.icon}
            <span>{d.label}</span>
          </div>
        ),
        multiple: false,
        // 是否显示搜索框
        search: true,
      },
      onFilter: (value, row) => {
        return value.includes(row.company);
      },
    },
  },

  {
    title: 'Address',
    render: 'address',
    width: 300,
    filter: {
      mode: 'search',
      onFilter: (value, row) => {
        return row.address.includes(value);
      },
      icon: icon6,
    },
  },
];

export default () => {
  return <Table keygen='id' columns={columns} data={data} />;
};
