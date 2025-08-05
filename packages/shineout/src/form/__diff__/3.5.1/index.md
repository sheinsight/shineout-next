# Form 组件 3.5.1 版本 Diff 报告

## 版本信息
- 正式版本: 3.5.1
- 包含 Beta 版本: 3.5.1-beta.1 ~ 3.5.1-beta.6
- 发布日期: 2024-11-14

## 变更概要

3.5.1 版本修复了 Form.FieldSet 校验返参为 Error 数组时的校验异常问题。

## 详细变更

### 3.5.1-beta.5
- **修复问题**: Form.FieldSet 校验返参为 Error 数组时校验异常的问题
- **PR**: [#796](https://github.com/sheinsight/shineout-next/pull/796)
- **影响组件**: Form.FieldSet
- **问题原因**: FieldSet 处理批量校验结果时，对 Error 数组的处理逻辑有误

## 代码变更分析

### 修改文件
涉及 Form.FieldSet 组件的校验逻辑处理

### 关键改动
修复了当自定义校验函数返回 Error 数组时，FieldSet 无法正确处理校验结果的问题。

## 受影响的使用场景

### 核心问题分析
当使用 Form.FieldSet 管理数组数据，并且自定义校验规则返回 Error 数组时，校验结果无法正确显示。

### 场景 1: FieldSet 数组项校验
**检查点**: 查使用 Form.FieldSet 管理数组数据并有自定义校验规则的场景
```jsx
// 需要检查的代码模式
const validateItems = (value, formData, callback) => {
  // 返回 Error 数组进行批量校验
  const errors = [];
  
  if (!Array.isArray(value)) {
    callback(new Error('数据格式错误'));
    return;
  }
  
  value.forEach((item, index) => {
    if (!item.name) {
      errors[index] = new Error(`第${index + 1}项的名称不能为空`);
    }
    if (item.price < 0) {
      errors[index] = new Error(`第${index + 1}项的价格不能为负数`);
    }
  });
  
  // 3.5.1 之前：返回 Error 数组可能导致校验异常
  callback(errors.some(e => e) ? errors : true);
};

<Form>
  <Form.FieldSet 
    name="items"
    defaultValue={[{ name: '', price: 0 }]}
    rules={[validateItems]}
  >
    {({ onAppend, onRemove }) => (
      <Form.Item>
        <Input name="name" placeholder="名称" />
        <Input name="price" type="number" placeholder="价格" />
        <Button onClick={() => onAppend({ name: '', price: 0 })}>
          添加
        </Button>
        <Button onClick={onRemove}>删除</Button>
      </Form.Item>
    )}
  </Form.FieldSet>
</Form>
```

### 场景 2: FieldSet 的 empty 属性使用
**检查点**: 查 FieldSet 使用 empty 属性且有校验规则的场景
```jsx
// 需要检查的代码模式
const validateUsers = (users, formData, callback) => {
  if (!Array.isArray(users) || users.length === 0) {
    callback(new Error('至少添加一个用户'));
    return;
  }
  
  // 返回错误数组
  const errors = [];
  users.forEach((user, index) => {
    if (!user.email || !user.email.includes('@')) {
      errors[index] = new Error('邮箱格式不正确');
    }
  });
  
  callback(errors.some(e => e) ? errors : true);
};

<Form>
  <Form.FieldSet 
    name="users"
    rules={[validateUsers]}
    empty={(insert) => (
      <Button onClick={() => insert({ email: '', roles: [] })}>
        添加第一个用户
      </Button>
    )}
  >
    {({ onAppend, onRemove, error }) => (
      <div>
        <Input name="email" placeholder="邮箱" />
        <Checkbox.Group name="roles" data={['admin', 'user']} />
        {/* 3.5.1 之前：error 数组的处理可能异常 */}
        {error && <div className="error">{error.message}</div>}
        <Button onClick={() => onAppend({ email: '', roles: [] })}>
          添加
        </Button>
        <Button onClick={onRemove}>删除</Button>
      </div>
    )}
  </Form.FieldSet>
</Form>
```

### 场景 3: FieldSet 使用 onChange 回调
**检查点**: 查 FieldSet 子项使用 onChange 并有校验的场景
```jsx
// 需要检查的代码模式
const validateProducts = (products, formData, callback) => {
  const errors = [];
  
  products.forEach((product, index) => {
    const itemErrors = [];
    if (!product.name) {
      itemErrors.push('名称必填');
    }
    if (product.stock < 0) {
      itemErrors.push('库存不能为负');
    }
    if (itemErrors.length > 0) {
      errors[index] = new Error(itemErrors.join('；'));
    }
  });
  
  // 3.5.1 之前：返回 Error 数组可能导致校验异常
  callback(errors.some(e => e) ? errors : true);
};

<Form>
  <Form.FieldSet 
    name="products"
    defaultValue={[{ name: '', stock: 0 }]}
    rules={[validateProducts]}
  >
    {({ onChange, value, index, error }) => (
      <div>
        <Input 
          name="name" 
          placeholder="产品名称"
          onChange={(name) => {
            // 使用 onChange 更新单项数据
            onChange({ ...value, name });
          }}
        />
        <Input 
          name="stock" 
          type="number"
          placeholder="库存"
        />
        {/* 显示当前项的错误信息 */}
        {error[index] && (
          <div style={{ color: 'red' }}>{error[index].message}</div>
        )}
      </div>
    )}
  </Form.FieldSet>
</Form>
```

### 场景 4: FieldSet 的 onInsert 操作
**检查点**: 查使用 onInsert 在中间插入项并有校验的场景
```jsx
// 需要检查的代码模式
const rule = Rule();

const validateOrders = (orders, formData, callback) => {
  const errors = [];
  
  orders.forEach((order, index) => {
    if (order.quantity && order.price) {
      const total = order.quantity * order.price;
      if (total > 10000) {
        errors[index] = new Error(`第${index + 1}项订单金额超过限制`);
      }
    }
  });
  
  callback(errors.some(e => e) ? errors : true);
};

<Form>
  <Form.FieldSet 
    name="orders"
    defaultValue={[{ product: '', quantity: 1, price: 0 }]}
    rules={[validateOrders]}
  >
    {({ onInsert, onRemove, index, list, error }) => (
      <div style={{ marginBottom: 16 }}>
        <Input 
          name="product" 
          placeholder="产品"
          rules={[rule.required]}
        />
        <Input 
          name="quantity" 
          type="number"
          placeholder="数量"
          rules={[rule.min(1)]}
        />
        <Input 
          name="price" 
          type="number"
          placeholder="单价"
          rules={[rule.min(0)]}
        />
        
        {/* 在当前项后插入 */}
        <Button onClick={() => onInsert({ product: '', quantity: 1, price: 0 })}>
          在此后插入
        </Button>
        
        {list.length > 1 && (
          <Button onClick={onRemove}>删除</Button>
        )}
        
        {/* 3.5.1 之前：错误信息显示可能异常 */}
        {error[index] && <span style={{ color: 'red' }}>{error[index].message}</span>}
      </div>
    )}
  </Form.FieldSet>
</Form>
```

### 场景 5: 混合校验规则
**检查点**: 查同时使用多种校验规则的场景
```jsx
// 需要检查的代码模式
<Form>
  <Form.FieldSet 
    name="mixedItems"
    defaultValue={[{ name: '', quantity: 0 }]}
    rules={[
      // 规则1：简单校验
      (value, formData, callback) => {
        if (!Array.isArray(value) || value.length === 0) {
          callback(new Error('至少添加一项'));
          return;
        }
        callback(true);
      },
      
      // 规则2：返回错误数组的复杂校验
      (value, formData, callback) => {
        const errors = [];
        value.forEach((item, i) => {
          if (item.quantity > 100) {
            errors[i] = new Error('数量不能超过100');
          }
        });
        // 3.5.1 之前：这里的错误数组处理可能异常
        callback(errors.some(e => e) ? errors : true);
      }
    ]}
  >
    {({ onAppend, onRemove, error, index }) => (
      <div>
        <Input name="name" placeholder="名称" />
        <Input name="quantity" type="number" placeholder="数量" />
        <Button onClick={() => onAppend({ name: '', quantity: 0 })}>
          添加
        </Button>
        <Button onClick={onRemove}>删除</Button>
        
        {/* 显示当前项的错误 */}
        {error[index] && (
          <div style={{ color: 'red' }}>{error[index].message}</div>
        )}
      </div>
    )}
  </Form.FieldSet>
</Form>
```

### 场景 6: 动态错误信息
**检查点**: 查根据数据动态生成错误信息数组的场景
```jsx
// 需要检查的代码模式
const dynamicValidation = (items, formData, callback) => {
  if (!Array.isArray(items)) {
    callback(true);
    return;
  }
  
  const errors = [];
  const nameMap = {};
  
  items.forEach((item, index) => {
    // 检查重复
    if (item.name && nameMap[item.name]) {
      errors[index] = new Error(`名称"${item.name}"与第${nameMap[item.name]}项重复`);
    } else if (item.name) {
      nameMap[item.name] = index + 1;
    }
    
    // 检查关联
    if (item.parentId && !items.find(i => i.id === item.parentId)) {
      errors[index] = new Error('父级项目不存在');
    }
  });
  
  // 3.5.1 之前：返回错误数组可能导致校验异常
  callback(errors.some(e => e) ? errors : true);
};

<Form>
  <Form.FieldSet 
    name="relatedItems" 
    defaultValue={[{ id: '1', name: 'Item 1', parentId: null }]}
    rules={[dynamicValidation]}
  >
    {({ value, onChange, onAppend, onRemove, error, index, list }) => (
      <div style={{ border: '1px solid #eee', padding: 12, marginBottom: 8 }}>
        <Input 
          name="id" 
          placeholder="ID" 
          style={{ width: 100, marginRight: 8 }}
        />
        <Input 
          name="name" 
          placeholder="名称" 
          style={{ width: 150, marginRight: 8 }}
        />
        <Select 
          name="parentId" 
          placeholder="父级" 
          data={list.filter((_, i) => i !== index).map(item => ({
            value: item.id,
            text: item.name || `项目 ${item.id}`
          }))}
          style={{ width: 150, marginRight: 8 }}
        />
        
        <Button onClick={() => onAppend({ 
          id: `item_${Date.now()}`, 
          name: '', 
          parentId: null 
        })}>
          添加
        </Button>
        
        {list.length > 1 && (
          <Button onClick={onRemove}>删除</Button>
        )}
        
        {/* 3.5.1 之前：错误信息显示可能异常 */}
        {error[index] && (
          <div style={{ color: 'red', marginTop: 4 }}>
            {error[index].message}
          </div>
        )}
      </div>
    )}
  </Form.FieldSet>
</Form>
```

## Breaking Changes

无破坏性变更

## 风险等级

低风险 - 修复了特定场景下的校验问题，提升了 FieldSet 的校验可靠性