# Shineout 3.6.2 → 3.7.8 升级风险评估报告

## 一、升级概览

| 项目 | 详情 |
|------|------|
| **当前版本** | 3.6.2 |
| **目标版本** | 3.7.8 |
| **版本跨度** | 14个正式版本 (3.6.3 - 3.7.8) |
| **受影响组件** | Form、Input |
| **总体风险等级** | **中等** |

## 二、Form 组件风险报告表

### 高风险文件

| 文件路径 | 问题场景 | 相关版本及问题 | 风险等级 |
|---------|----------|---------------|----------|
| `src/pages/quality-rule-management/sample-material-appearance-management/rule-config/detail/tsx/Basic.tsx:30-69` | 受控表单与defaultValue冲突 | 3.6.3-beta.1~3.6.3-beta.3：defaultValue通过setTimeout异步设置导致与外部value更新冲突 | **高** |

### 中风险文件

| 文件路径 | 问题场景 | 相关版本及问题 | 风险等级 |
|---------|----------|---------------|----------|
| `src/public-component/BatchInput/index.tsx:81-94` | Form.Flow未设置strict | 3.6.5-beta.1~3.6.5-beta.4：Form.Flow的strict属性未设置默认值 | **中** |
| `src/public-component/BatchInput/FormFlow.tsx:28-41` | Form.Flow未设置strict | 3.6.5-beta.1~3.6.5-beta.4：同上 | **中** |

### 潜在风险

| 文件路径 | 问题场景 | 相关版本及问题 | 风险等级 |
|---------|----------|---------------|----------|
| `src/pages/quality-compliance-management/safety-sign-configuration/detail/jsx/CertificateTable.jsx:176` | onChange参数处理 | 3.7.8-beta.1~3.7.8-beta.5：Form对onChange的返回值直接修改不生效 | **低** |

## 三、Input 组件风险报告表  

### 中风险文件

| 文件路径 | 问题场景 | 相关版本及问题 | 风险等级 |
|---------|----------|---------------|----------|
| `src/public/conf/component-props/input.ts` | 全局精度配置 | 3.7.3-beta.1：digits和autoFix组合使用时精度丢失 | **中** |
| `src/pages/batch-quality/quality-inspection/quality-control-rule/list/tsx/quality-inspection-info/risk-business-score-rule/risk-ratio-config-modal.tsx:221-228` | 精度配置冲突 | 3.7.3-beta.1：同时使用digits和autoFix导致精度问题 | **中** |

### 低风险文件

| 文件路径 | 问题场景 | 相关版本及问题 | 风险等级 |
|---------|----------|---------------|----------|
| `src/pages/quality-rule-management/fabric-prohibition-rule-management/rules-check/list/tsx/similarity-drawer/search.tsx:61,72,83` | onEnterPress使用 | 3.7.3-beta.4：onEnterPress与scrollToError冲突（项目未使用scrollToError） | **低** |
| `src/pages/quality-improve-management/photo-control/result-details/list/tsx/Header.tsx:38` | onEnterPress使用 | 同上 | **低** |
| `src/public-component/PdaCard/index.jsx:172` | onEnterPress使用 | 同上 | **低** |

## 四、受影响文件统计

### Form 组件相关
- **高风险文件**：1个
- **中风险文件**：2个
- **潜在风险文件**：1个

### Input 组件相关
- **中风险文件**：2个
- **低风险文件**：3个
- **使用INPUT_NUMBER配置的文件**：16个
- **使用onBlur/onFocus的文件**：25个

---

*报告生成时间：2025-08-06*  
*分析工具：Claude Code*  
*项目路径：/root/shineout-next/project/qmc-front*