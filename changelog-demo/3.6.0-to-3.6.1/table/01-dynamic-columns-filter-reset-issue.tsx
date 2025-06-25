/**
 * cn - Table 动态列过滤功能意外重置问题
 *    -- 3.6.0 版本中，当 Table 的 columns 是动态值时，column.filter 的过滤功能会被意外重置
 *    -- 这会导致用户设置的过滤条件丢失，需要重新设置
 *    -- 问题复现：动态更新 columns 配置后，之前的过滤状态会被清空
 *    -- 此问题在 3.6.1-beta.3 中已修复
 * en - Table dynamic columns filter reset issue
 *    -- In version 3.6.0, when Table columns are dynamic values, column.filter functionality gets unexpectedly reset
 *    -- This causes user-set filter conditions to be lost, requiring re-configuration
 *    -- Reproduction: After dynamically updating columns configuration, previous filter state gets cleared
 *    -- Fixed in 3.6.1-beta.3
 */
import React, { useState, useMemo } from 'react';
import { Table, Button, TYPE } from 'shineout';

type TableProps = TYPE.Table.Props<Employee>;
type TableColumnItem = TYPE.Table.ColumnItem<Employee>;
type ButtonProps = TYPE.Button.Props;

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  salary: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

// 模拟员工数据
const generateEmployeeData = (): Employee[] => {
  const departments = ['技术部', '产品部', '设计部', '运营部', '人事部'];
  const positions = ['工程师', '产品经理', '设计师', '运营专员', '人事专员'];
  const statuses: ('active' | 'inactive')[] = ['active', 'inactive'];

  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `员工${index + 1}`,
    department: departments[index % departments.length],
    position: positions[index % positions.length],
    salary: Math.floor(Math.random() * 50000) + 5000,
    status: statuses[index % 2],
    joinDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  }));
};

const App: React.FC = () => {
  const [data] = useState<Employee[]>(generateEmployeeData());
  const [showSalary, setShowSalary] = useState(true);
  const [showStatus, setShowStatus] = useState(true);
  const [showJoinDate, setShowJoinDate] = useState(true);
  const [filterValues, setFilterValues] = useState({
    department: '',
    position: '',
    salary: '',
    status: '',
  });

  const handleDepartmentFilter = (text: string, record: Employee) => {
    setFilterValues(prev => ({...prev, department: text}));
    return record.department.includes(text);
  };

  const handlePositionFilter = (text: string, record: Employee) => {
    setFilterValues(prev => ({...prev, position: text}));
    return record.position.includes(text);
  };

  const handleSalaryFilter = (text: string, record: Employee) => {
    setFilterValues(prev => ({...prev, salary: text}));
    const minSalary = parseInt(text) || 0;
    return record.salary >= minSalary;
  };

  const handleStatusFilter = (value: string, record: Employee) => {
    setFilterValues(prev => ({...prev, status: value}));
    return !value || record.status === value;
  };

  const renderSalary = (value: number) => `¥${value.toLocaleString()}`;

  const renderStatus = (value: string) => (
    <span style={{ 
      padding: '2px 8px',
      borderRadius: '4px',
      backgroundColor: value === 'active' ? '#52c41a' : '#ff4d4f',
      color: 'white',
      fontSize: '12px',
    }}>
      {value === 'active' ? '在职' : '离职'}
    </span>
  );

  // 动态生成列配置
  const columns = useMemo((): TableColumnItem[] => {
    const baseColumns: TableColumnItem[] = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 80,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 120,
      },
      {
        title: '部门',
        dataIndex: 'department',
        width: 120,
        // 带过滤功能的列
        filter: {
          mode: 'search',
          onFilter: handleDepartmentFilter,
        },
      },
      {
        title: '职位',
        dataIndex: 'position',
        width: 120,
        // 带过滤功能的列
        filter: {
          mode: 'search',
          onFilter: handlePositionFilter,
        },
      },
    ];

    // 动态添加工资列
    if (showSalary) {
      baseColumns.push({
        title: '薪资',
        dataIndex: 'salary',
        width: 120,
        render: renderSalary,
        // 带过滤功能的列
        filter: {
          mode: 'search',
          onFilter: handleSalaryFilter,
        },
      });
    }

    // 动态添加状态列
    if (showStatus) {
      baseColumns.push({
        title: '状态',
        dataIndex: 'status',
        width: 100,
        render: renderStatus,
        // 带过滤功能的列
        filter: {
          mode: 'select',
          config: {
            data: [
              { label: '在职', value: 'active' },
              { label: '离职', value: 'inactive' },
            ],
            multiple: false,
          },
          onFilter: handleStatusFilter,
        },
      });
    }

    // 动态添加入职日期列
    if (showJoinDate) {
      baseColumns.push({
        title: '入职日期',
        dataIndex: 'joinDate',
        width: 120,
      });
    }

    return baseColumns;
  }, [showSalary, showStatus, showJoinDate, filterValues]);


  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h3>Table 动态列过滤功能重置问题复现</h3>
        <p>
          在 3.6.0 版本中，当 Table 的 columns 配置是动态生成时，
          每次 columns 更新都会导致过滤状态被重置，用户的过滤条件会丢失。
        </p>
      </div>

      {/* 控制面板 */}
      <div style={{ 
        marginBottom: 20, 
        padding: 15, 
        backgroundColor: '#f8f9fa', 
        borderRadius: 6,
        border: '1px solid #e9ecef'
      }}>
        <h4>动态列控制面板</h4>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: 10 }}>
          切换下面的选项会重新生成 columns 配置，观察过滤状态是否保持：
        </p>
        
        <div style={{ display: 'flex', gap: 15, marginBottom: 15 }}>
          <label>
            <input
              type="checkbox"
              checked={showSalary}
              onChange={(e) => setShowSalary(e.target.checked)}
            />
            <span style={{ marginLeft: 5 }}>显示薪资列</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={showStatus}
              onChange={(e) => setShowStatus(e.target.checked)}
            />
            <span style={{ marginLeft: 5 }}>显示状态列</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={showJoinDate}
              onChange={(e) => setShowJoinDate(e.target.checked)}
            />
            <span style={{ marginLeft: 5 }}>显示入职日期列</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Button onClick={() => setFilterValues({
            department: '',
            position: '',
            salary: '',
            status: '',
          })} size="small">
            重置所有过滤条件
          </Button>
          <span style={{ fontSize: '12px', color: '#666' }}>
            当前过滤状态: {JSON.stringify(filterValues)}
          </span>
        </div>
      </div>

      {/* 复现步骤说明 */}
      <div style={{ 
        marginBottom: 20, 
        padding: 10, 
        backgroundColor: '#fff3cd', 
        borderRadius: 4, 
        border: '1px solid #ffeaa7' 
      }}>
        <h4>问题复现步骤：</h4>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li>在下方表格中设置一些过滤条件（如搜索部门、职位等）</li>
          <li>观察表格数据被过滤后的结果</li>
          <li>切换上方的列显示选项（如取消勾选"显示薪资列"）</li>
          <li>观察过滤条件是否被重置（在 3.6.0 版本中会被重置）</li>
        </ol>
      </div>

      {/* 表格组件 */}
      <Table
        data={data}
        columns={columns}
        bordered
        striped
        keygen="id"
        style={{ marginBottom: 20 }}
        rowsInView={10}
      />

      <div style={{ padding: 10, backgroundColor: '#d4edda', borderRadius: 4, border: '1px solid #c3e6cb' }}>
        <h4>问题说明：</h4>
        <ul>
          <li>当 Table 的 <code>columns</code> 是动态生成的数组时，每次重新生成都会重置过滤状态</li>
          <li>用户设置的过滤条件会意外丢失，需要重新输入</li>
          <li>这个问题影响用户体验，特别是在需要频繁调整列显示的场景中</li>
          <li>使用 <code>useMemo</code> 优化 columns 生成也无法完全避免此问题</li>
        </ul>
        
        <h4>解决方案：</h4>
        <ul>
          <li>3.6.1-beta.3 版本修复了此问题，过滤状态会正确保持</li>
          <li>升级后，动态更新 columns 不会影响现有的过滤条件</li>
          <li>过滤状态会基于 dataIndex 来维护，而不是 columns 数组的引用</li>
        </ul>
      </div>
    </div>
  );
};

export default App;