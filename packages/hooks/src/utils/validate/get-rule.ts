import { FormItemRule, RuleResultValue, ValidFunc } from '../rule/rule.type';
import { ObjectType } from '../../common/type';
import nullable from './nullable';
import { isEmpty } from '../is';
import typeOf from './type';
import { FormError } from './error';
import { substitute } from '../string';

export default function getRule<Value>(
  rule: FormItemRule<Value>[number],
  props: ObjectType,
): ValidFunc<Value> {
  let po = props;
  let rulePo = rule;
  if (typeof rulePo === 'function') {
    if ((rulePo as RuleResultValue).isInnerValidator) rulePo = (rulePo as RuleResultValue)();
    else return rulePo as ValidFunc;
  }

  const { type = props.type, message, regExp, func, required, min, max, args } = rulePo;

  po = Object.assign({}, po, { min, max, args });
  po.message = typeof message === 'function' ? message(po) : substitute(message!, po);
  let cb: ValidFunc<Value> = () => {};
  if (func) {
    cb = (value, formData, callback) => {
      return func(value, formData, callback, po);
    };
  } else if (required !== undefined) {
    //必填
    cb = (value, _formData, callback) => {
      if (required === false) {
        callback(true);
        return;
      }
      // eslint-disable-next-line eqeqeq
      if ((value as any) == null || (value as any[]).length === 0) {
        callback(new FormError(po.message, po));
        return;
      } else {
        callback(true);
      }
    };
  } else if (regExp) {
    // 正则
    cb = (value, _formData, callback) => {
      const reg = typeof regExp === 'string' ? new RegExp(regExp) : regExp;
      if (!reg) {
        callback(new FormError(po.message, po));
        return;
      }
      if (reg.global) reg.lastIndex = 0;
      if (reg.test(value as string)) {
        callback(true);
      } else {
        callback(new FormError(po.message, po));
        return;
      }
      callback(true);
    };
    cb = nullable(cb);
  } else if (min !== undefined || max !== undefined) {
    // 数字 min max
    if (type === 'number' || type === 'integer') {
      cb = nullable((value, _formData, callback) => {
        if (value === undefined || value === '') {
          callback(true);
          return;
        }

        const val = parseFloat(String(value));

        if (Number.isNaN(val)) {
          callback(new FormError(po.message, po));
          return;
        }

        if ((typeof min === 'number' && val < min) || (typeof max === 'number' && val > max)) {
          callback(new FormError(po.message, po));
        } else {
          callback(true);
        }
      });
    } else {
      // 长度 min max
      cb = (value, _formData, callback) => {
        const error = new FormError(po.message, po);

        if (isEmpty(value)) {
          if (min) callback(error);
          else callback(true);
          return;
        }

        const len = typeof value === 'number' ? value.toString().length : (value as string).length;

        if (
          (len !== undefined && typeof min === 'number' && len < min) ||
          (len !== undefined && typeof max === 'number' && len > max)
        ) {
          callback(error);
        } else {
          callback(true);
        }
      };
    }
  } else if (type) {
    cb = typeOf(type, po.message);
  } else {
    const err = new FormError(`[shineout] Rule ${JSON.stringify(rule)} is not valid.`, po);
    console.error(err);
    throw err;
  }
  return cb;
}
