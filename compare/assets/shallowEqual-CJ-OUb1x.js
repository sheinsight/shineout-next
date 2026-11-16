import{e as j}from"./registry-CoINQWyI.js";var q={exports:{}},I={exports:{}},F=I.exports,N;function G(){return N||(N=1,(function(n,u){(function(a,c){n.exports=c()})(F,(function(){var a=typeof Promise=="function",c=(function(e){if(typeof globalThis=="object")return globalThis;Object.defineProperty(e,"typeDetectGlobalObject",{get:function(){return this},configurable:!0});var r=typeDetectGlobalObject;return delete e.typeDetectGlobalObject,r})(Object.prototype),s=typeof Symbol<"u",f=typeof Map<"u",y=typeof Set<"u",p=typeof WeakMap<"u",l=typeof WeakSet<"u",T=typeof DataView<"u",b=s&&typeof Symbol.iterator<"u",g=s&&typeof Symbol.toStringTag<"u",z=y&&typeof Set.prototype.entries=="function",L=f&&typeof Map.prototype.entries=="function",h=z&&Object.getPrototypeOf(new Set().entries()),x=L&&Object.getPrototypeOf(new Map().entries()),D=b&&typeof Array.prototype[Symbol.iterator]=="function",P=D&&Object.getPrototypeOf([][Symbol.iterator]()),M=b&&typeof String.prototype[Symbol.iterator]=="function",k=M&&Object.getPrototypeOf(""[Symbol.iterator]()),w=8,A=-1;function t(e){var r=typeof e;if(r!=="object")return r;if(e===null)return"null";if(e===c)return"global";if(Array.isArray(e)&&(g===!1||!(Symbol.toStringTag in e)))return"Array";if(typeof window=="object"&&window!==null){if(typeof window.location=="object"&&e===window.location)return"Location";if(typeof window.document=="object"&&e===window.document)return"Document";if(typeof window.navigator=="object"){if(typeof window.navigator.mimeTypes=="object"&&e===window.navigator.mimeTypes)return"MimeTypeArray";if(typeof window.navigator.plugins=="object"&&e===window.navigator.plugins)return"PluginArray"}if((typeof window.HTMLElement=="function"||typeof window.HTMLElement=="object")&&e instanceof window.HTMLElement){if(e.tagName==="BLOCKQUOTE")return"HTMLQuoteElement";if(e.tagName==="TD")return"HTMLTableDataCellElement";if(e.tagName==="TH")return"HTMLTableHeaderCellElement"}}var o=g&&e[Symbol.toStringTag];if(typeof o=="string")return o;var i=Object.getPrototypeOf(e);return i===RegExp.prototype?"RegExp":i===Date.prototype?"Date":a&&i===Promise.prototype?"Promise":y&&i===Set.prototype?"Set":f&&i===Map.prototype?"Map":l&&i===WeakSet.prototype?"WeakSet":p&&i===WeakMap.prototype?"WeakMap":T&&i===DataView.prototype?"DataView":f&&i===x?"Map Iterator":y&&i===h?"Set Iterator":D&&i===P?"Array Iterator":M&&i===k?"String Iterator":i===null?"Object":Object.prototype.toString.call(e).slice(w,A)}return t}))})(I)),I.exports}var W;function K(){if(W)return q.exports;W=1;/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var n=G();function u(){this._key="chai/deep-eql__"+Math.random()+Date.now()}u.prototype={get:function(e){return e[this._key]},set:function(e,r){Object.isExtensible(e)&&Object.defineProperty(e,this._key,{value:r,configurable:!0})}};var a=typeof WeakMap=="function"?WeakMap:u;/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/function c(t,e,r){if(!r||w(t)||w(e))return null;var o=r.get(t);if(o){var i=o.get(e);if(typeof i=="boolean")return i}return null}/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/function s(t,e,r,o){if(!(!r||w(t)||w(e))){var i=r.get(t);i?i.set(e,o):(i=new a,i.set(e,o),r.set(t,i))}}/*!
 * Primary Export
 */q.exports=f,q.exports.MemoizeMap=a;function f(t,e,r){if(r&&r.comparator)return p(t,e,r);var o=y(t,e);return o!==null?o:p(t,e,r)}function y(t,e){return t===e?t!==0||1/t===1/e:t!==t&&e!==e?!0:w(t)||w(e)?!1:null}/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/function p(t,e,r){r=r||{},r.memoize=r.memoize===!1?!1:r.memoize||new a;var o=r&&r.comparator,i=c(t,e,r.memoize);if(i!==null)return i;var m=c(e,t,r.memoize);if(m!==null)return m;if(o){var E=o(t,e);if(E===!1||E===!0)return s(t,e,r.memoize,E),E;var v=y(t,e);if(v!==null)return v}var S=n(t);if(S!==n(e))return s(t,e,r.memoize,!1),!1;s(t,e,r.memoize,!0);var C=l(t,e,S,r);return s(t,e,r.memoize,C),C}function l(t,e,r,o){switch(r){case"String":case"Number":case"Boolean":case"Date":return f(t.valueOf(),e.valueOf());case"Promise":case"Symbol":case"function":case"WeakMap":case"WeakSet":return t===e;case"Error":return M(t,e,["name","message","code"],o);case"Arguments":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"Array":return g(t,e,o);case"RegExp":return T(t,e);case"Generator":return z(t,e,o);case"DataView":return g(new Uint8Array(t.buffer),new Uint8Array(e.buffer),o);case"ArrayBuffer":return g(new Uint8Array(t),new Uint8Array(e),o);case"Set":return b(t,e,o);case"Map":return b(t,e,o);case"Temporal.PlainDate":case"Temporal.PlainTime":case"Temporal.PlainDateTime":case"Temporal.Instant":case"Temporal.ZonedDateTime":case"Temporal.PlainYearMonth":case"Temporal.PlainMonthDay":return t.equals(e);case"Temporal.Duration":return t.total("nanoseconds")===e.total("nanoseconds");case"Temporal.TimeZone":case"Temporal.Calendar":return t.toString()===e.toString();default:return k(t,e,o)}}/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */function T(t,e){return t.toString()===e.toString()}/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function b(t,e,r){try{if(t.size!==e.size)return!1;if(t.size===0)return!0}catch{return!1}var o=[],i=[];return t.forEach(function(E,v){o.push([E,v])}),e.forEach(function(E,v){i.push([E,v])}),g(o.sort(),i.sort(),r)}/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function g(t,e,r){var o=t.length;if(o!==e.length)return!1;if(o===0)return!0;for(var i=-1;++i<o;)if(f(t[i],e[i],r)===!1)return!1;return!0}/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function z(t,e,r){return g(x(t),x(e),r)}/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */function L(t){return typeof Symbol<"u"&&typeof t=="object"&&typeof Symbol.iterator<"u"&&typeof t[Symbol.iterator]=="function"}/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */function h(t){if(L(t))try{return x(t[Symbol.iterator]())}catch{return[]}return[]}/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */function x(t){for(var e=t.next(),r=[e.value];e.done===!1;)e=t.next(),r.push(e.value);return r}/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */function D(t){var e=[];for(var r in t)e.push(r);return e}function P(t){for(var e=[],r=Object.getOwnPropertySymbols(t),o=0;o<r.length;o+=1){var i=r[o];Object.getOwnPropertyDescriptor(t,i).enumerable&&e.push(i)}return e}/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function M(t,e,r,o){var i=r.length;if(i===0)return!0;for(var m=0;m<i;m+=1)if(f(t[r[m]],e[r[m]],o)===!1)return!1;return!0}/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function k(t,e,r){var o=D(t),i=D(e),m=P(t),E=P(e);if(o=o.concat(m),i=i.concat(E),o.length&&o.length===i.length)return g(A(o).sort(),A(i).sort())===!1?!1:M(t,e,o,r);var v=h(t),S=h(e);return v.length&&v.length===S.length?(v.sort(),S.sort(),g(v,S,r)):o.length===0&&v.length===0&&i.length===0&&S.length===0}/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */function w(t){return t===null||typeof t!="object"}function A(t){return t.map(function(r){return typeof r=="symbol"?r.toString():r})}return q.exports}var V=K();const _=j(V);var Q=Object.prototype.hasOwnProperty;function U(n,u){return n===u?n!==0||u!==0||1/n===1/u:n!==n&&u!==u}function R(n,u){if(!n[u])return[];var a=n[u];return Array.isArray(a)?a:[a]}function Y(n,u){if(!n||!u)return!0;if(n.length!==u.length)return!1;var a=n.every(function(s,f){return s.width===u[f].width||Number.isNaN(s.width)&&Number.isNaN(u[f].width)});if(!a)return!1;var c=n.every(function(s,f){return Array.isArray(s.group)&&Array.isArray(u[f].group)?s.group.every(function(y,p){return y===u[f].group[p]}):s.group===u[f].group});return c}function $(n,u,a){if(a===void 0&&(a={}),U(n,u))return!0;if(typeof n!="object"||n===null||typeof u!="object"||u===null)return!1;var c=Object.keys(n),s=Object.keys(u),f=R(a,"skip"),y=R(a,"deep");if(c.length!==s.length)return!1;c.sort(function(T,b){return y.indexOf(T)-y.indexOf(b)});for(var p=0;p<c.length;p++){var l=c[p];if(!f.includes(l)&&(!Q.call(u,l)||!U(n[l],u[l]))){if(n[l]instanceof Error&&u[l]instanceof Error){if(n[l].message!==u[l].message)return!1;continue}if(y.includes(l)){if(!_(n[l],u[l]))return!1}else return!1}}return!0}export{Y as c,_ as d,$ as s};
