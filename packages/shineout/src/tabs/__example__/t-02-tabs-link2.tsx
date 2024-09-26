/**
 * cn - lcd-link
 *    -- 选项卡的基本用法
 * en - Basic
 *    -- Basic usage of Tabs
 */
import { Tabs } from 'shineout';
import {Link as ReactRouterLink} from 'react-router-dom'
// import { createLocation } from 'history';
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { let hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { let Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { let NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

const createLocation = (str) => str
const isModifiedEvent = () => false
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import gud from 'gud';
// import warning from 'tiny-warning';
const warning = str => str
const gud = () => ''
let MAX_SIGNED_31_BIT_INT = 1073741823; // Inlined Object.is polyfill.1
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is

function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }

  return x !== x && y !== y;
}

function createEventEmitter(value) {
  let handlers = [];
  return {
    on: function on(handler) {
      handlers.push(handler);
    },
    off: function off(handler) {
      handlers = handlers.filter(function (h) {
        return h !== handler;
      });
    },
    get: function get() {
      return value;
    },
    set: function set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(function (handler) {
        return handler(value, changedBits);
      });
    }
  };
}

function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}

function createReactContext(defaultValue, calculateChangedBits) {
  let contextProp = '__create-react-context-' + gud() + '__';

  let Provider = /*#__PURE__*/function (_Component) {
    _inherits(Provider, _Component);

    let _super = _createSuper(Provider);

    function Provider(props, context) {
      let _this;

      _classCallCheck(this, Provider);

      _this = _super.call(this, props, context);
      _this.emitter = createEventEmitter(_this.props.value);
      return _this;
    }

    _createClass(Provider, [{
      key: "getChildContext",
      value: function getChildContext() {
        return _defineProperty({}, contextProp, this.emitter);
      }
    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
          let oldValue = this.props.value;
          let newValue = nextProps.value;
          let changedBits = 0;

          if (objectIs(oldValue, newValue)) {
            changedBits = 0; // No change
          } else {
            changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;

            if (process.env.NODE_ENV !== 'production') {
              warning((changedBits & MAX_SIGNED_31_BIT_INT) === changedBits, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: ' + changedBits);
            }

            changedBits |= 0;

            if (changedBits !== 0) {
              this.emitter.set(nextProps.value, changedBits);
            }
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        return this.props.children;
      }
    }]);

    return Provider;
  }(Component);

  // Provider.childContextTypes = _defineProperty({}, contextProp, PropTypes.object.isRequired);

  let Consumer = /*#__PURE__*/function (_Component2) {
    _inherits(Consumer, _Component2);

    let _super2 = _createSuper(Consumer);

    function Consumer(props, context) {
      let _this2;

      _classCallCheck(this, Consumer);

      _this2 = _super2.call(this, props, context);
      _this2.state = {
        value: _this2.getValue()
      };
      _this2.observedBits = 0;

      _this2.onUpdate = function (newValue, changedBits) {
        let observedBits = _this2.observedBits | 0;

        if ((observedBits & changedBits) !== 0) {
          _this2.setState({
            value: _this2.getValue()
          });
        }
      };

      return _this2;
    }

    _createClass(Consumer, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.context[contextProp]) {
          this.context[contextProp].on(this.onUpdate);
        }

        let observedBits = this.props.observedBits;
        this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
        : observedBits;
      }
    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        let observedBits = nextProps.observedBits;
        this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
        : observedBits;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.context[contextProp]) {
          this.context[contextProp].off(this.onUpdate);
        }
      }
    }, {
      key: "getValue",
      value: function getValue() {
        if (this.context[contextProp]) {
          return this.context[contextProp].get();
        }

        return defaultValue;
      }
    }, {
      key: "render",
      value: function render() {
        return onlyChild(this.props.children)(this.state.value);
      }
    }]);

    return Consumer;
  }(Component);

  // Consumer.contextTypes = _defineProperty({}, contextProp, PropTypes.object);
  return {
    Provider: Provider,
    Consumer: Consumer
  };
}


let RouterContext = createReactContext(null);
RouterContext.displayName = 'RRC-Router';





let Link = /*#__PURE__*/function (_React$Component) {
  _inherits(Link, _React$Component);

  let _super = _createSuper(Link);

  function Link() {
    _classCallCheck(this, Link);

    return _super.apply(this, arguments);
  }

  _createClass(Link, [{
    key: "handleClick",
    value: function handleClick(event, context, linkExtendable, to) {
      let _this$props = this.props,
          onClick = _this$props.onClick,
          target = _this$props.target,
          replace = _this$props.replace;

      if (onClick) {
        onClick(event);
      }

      let nextUrl = linkExtendable && context.linkExtendable ? context.genNextUrl(to) : to;

      if (!event.defaultPrevented // onClick prevented default
      && event.button === 0 // ignore everything but left clicks
      && (!target || target === '_self') // let browser handle "target=_blank" etc.
      && !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();
          let method = replace ? context.history.replace : context.history.push;
          method(nextUrl);
        }
    }
  }, {
    key: "render",
    value: function render() {
      let _this = this;

      let _this$props2 = this.props,
          innerRef = _this$props2.innerRef,
          replace = _this$props2.replace,
          to = _this$props2.to,
          children = _this$props2.children,
          linkExtendable = _this$props2.linkExtendable,
          rest = _objectWithoutProperties(_this$props2, ["innerRef", "replace", "to", "children", "linkExtendable"]);

      return /*#__PURE__*/React.createElement(RouterContext.Consumer, null, function (context) {
        // if (!context) {
        //   throw new Error('You should not use <Link> outside a <Router>');
        // }

        let location = '';
        let href = location ? context.history.createHref(location) : '';
        return /*#__PURE__*/React.createElement("a", _extends({}, rest, {
          onClick: function onClick(event) {
            return _this.handleClick(event, context, linkExtendable, to);
          },
          href: href,
          ref: innerRef
        }), children);
      });
    }
  }]);

  return Link;
}(React.Component);

function MyLink(props) {
  return <span>{props.children}</span>
}
export default () => {
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}`, link: '/cn/component/shineout/Table' });
  }
  // const renderTab = (title) => {
  //   return <Link to="/">{title}</Link>
  // }
  return (
    <div style={{ height: 100 }}>
      <Tabs shape='line' defaultActive={0}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={<Link to={'/'}>{tab.title}</Link>}>
              <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};
