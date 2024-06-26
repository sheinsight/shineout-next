/**
 * cn - 只使用样式
 *    -- 使用原生的tr, td来显示表格
 * en - Style only
 *    -- Use the native tr and td to display the table
 */
import React from 'react';
import { Table } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

const data: TableRowData[] = user.fetchSync(6);

const App: React.FC = () => (
  <Table striped keygen='id' bordered>
    <thead>
      <tr>
        <th>Name</th>
        <th>Office</th>
        <th>Start Date</th>
        <th style={{ textAlign: 'right' }}>Salary($)</th>
      </tr>
    </thead>
    <tbody>
      {data.map((d) => (
        <tr key={d.id}>
          <td>{`${d.firstName} ${d.lastName}`}</td>
          <td>{d.office}</td>
          <td>{d.start}</td>
          <td style={{ textAlign: 'right' }}>{`${d.salary
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default App;
