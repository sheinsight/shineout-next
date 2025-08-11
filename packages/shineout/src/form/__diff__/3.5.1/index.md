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
- `packages/base/src/form/form-fieldset.tsx`
- `packages/base/src/form/form-item.tsx`
- `packages/hooks/src/components/use-form/use-form-control/use-form-control.ts`
- `packages/hooks/src/components/use-form/use-form-fieldset/use-form-fieldset.ts`
- `packages/hooks/src/components/use-form/use-form.ts`

### 关键改动
修复了 FieldSet 处理自定义校验函数返回值的逻辑：
1. 正确处理稀疏 Error 数组（部分索引为 undefined）
2. 支持嵌套对象结构（如 `{ fieldName: Error }` 格式）
3. 避免内部解析时的类型错误

## 受影响的使用场景

### 核心问题分析
当使用 Form.FieldSet 管理数组数据，并且自定义校验规则返回 Error 数组时，特别是返回稀疏数组（仅部分索引有错误）或嵌套对象结构时，FieldSet 内部处理逻辑没有考虑这些场景，导致解析错误报错。

### 场景 1: FieldSet 返回稀疏 Error 数组（最典型问题）
**检查点**: 查 Form.FieldSet 校验函数返回稀疏数组或嵌套对象的场景
```jsx
// 需要检查的代码模式 - 用户实际遇到的问题示例
const isExist: RuleFunc = (values, _, callback: any) => {
  const result: any[] = []  // 稀疏数组
  const valueMap: ValueMap = {}
  
  values.forEach(({ name }: Value, i: number) => {
    if (!name) return
    if (valueMap[name]) {
      // 仅在有错误的索引位置设置值，其他位置为 undefined
      result[i] = { name: new Error(`Name "${name}" is existed.`) }
    } else {
      valueMap[name] = true
    }
  })
  
  // 3.5.1 之前：返回包含嵌套对象的稀疏数组会导致解析错误
  // 例如：[undefined, {name: Error}, undefined, {name: Error}]
  callback(result.length > 0 ? result : true)
}

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

### 场景 2: 返回简单 Error 数组
**检查点**: 查 FieldSet 校验函数返回简单 Error 数组的场景
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

### 场景 3: 混合返回格式
**检查点**: 查 FieldSet 校验函数根据不同条件返回不同格式错误的场景
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

### 场景 6: 检查重复项的校验
**检查点**: 查检查数组项重复并返回稀疏错误数组的场景
```jsx
// 需要检查的代码模式 - 类似用户提供的 isExist 函数
const checkDuplicate = (items, formData, callback) => {
  const errors = [];  // 稀疏数组
  const seen = {};
  
  items.forEach((item, index) => {
    if (item.key && seen[item.key]) {
      // 仅在重复项处设置错误
      errors[index] = new Error(`Key "${item.key}" 已存在`);
    } else if (item.key) {
      seen[item.key] = true;
    }
  });
  
  // 3.5.1 之前：返回稀疏数组可能导致解析异常
  // errors 可能是：[undefined, undefined, Error, undefined, Error]
  callback(errors.filter(Boolean).length > 0 ? errors : true);
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

低风险 - 修复了特定场景下的校验问题，提升了 FieldSet 处理复杂校验返回值的能力

## 问题特征总结

**如果你的项目满足以下条件，可能受影响**：
1. 使用 Form.FieldSet 组件
2. 自定义校验函数通过 callback 返回 Error 数组
3. 返回的 Error 数组是稀疏数组或包含嵌套对象

**升级后的收益**：
- 解决校验函数执行报错问题
- 错误信息能正确显示在对应的数组项上