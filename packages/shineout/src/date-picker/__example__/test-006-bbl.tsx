/**
 * cn - 远程多语言
 *    -- 测试从远程获取多语言数据
 * en - Remote Multi-language
 *    -- Test getting multi-language data from remote
 */
import React, { useEffect } from 'react';
import { Radio, DatePicker, setLocale } from 'shineout';

function  transData(data) {
  // 拍平数据
  if (!data || typeof data !== 'object') {
    return data
  }
  const keys = Object.keys(data)
  const lans = Object.keys(data[keys[0]]).filter(name => name!== 'nid')
  const result = lans.reduce((result, lan)=> {
    result[lan] = {}
    return result
  }, {})

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const myRe = /(^[^\.^\[]+)|(\.([^\.^\[]+))|\[([\d]+?)\]/g
    let myArray;
    let temp = {...result}
    const path = lans.reduce((r, lan)=>{r[lan] = []; return r}, {})
    while ((myArray = myRe.exec(key)) !== null) {
      const  msg = myArray[0]
      const isArr = msg[0] === '['
      const name = msg.replace(/\.|\[|\]/g, '')
      const isLast = myRe.lastIndex === key.length
      lans.forEach((lan)=>{
        const before = path[lan].reduce((vv, kk) => {
          if (!vv[kk]) {
            vv[kk]= isArr ? [] : {}
          }
          return vv[kk]
        }, temp[lan])
        if (isLast) {
          before[name] = data[key][lan]
        } else {
          path[lan].push(name)
        }
      })
    }
  }
  return result
}

function handleWeek(data) {
  if (!data) return
  const lans = Object.keys(data)
  lans.forEach((lan)=>{
    const locale = data[lan]
    locale.startOfWeek = Number(locale.startOfWeek)
    const {long, narrow, short} = locale.weekdayValues
    locale.weekdayValues.long = long.slice(locale.startOfWeek).concat(long.slice(0, locale.startOfWeek))
    locale.weekdayValues.narrow = narrow.slice(locale.startOfWeek).concat(narrow.slice(0, locale.startOfWeek))
    locale.weekdayValues.short = short.slice(locale.startOfWeek).concat(short.slice(0, locale.startOfWeek))
  })

}
interface getLocaleType{
  (lan: string, config?: {version?: string, timeout?: number, project?: 'shineout' | 'shineout-mobile' | 'shineout-next'}) : Promise<unknown>
}
let getLocale:getLocaleType
getLocale = function (lan: string, {version = 'latest', timeout= 5000, project = 'shineout'} = {}): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let timer
    if (!lan) {reject(new Error('语言必传'))}
    if (window.XMLHttpRequest)
    {
      const xmlhttp: XMLHttpRequest = new window.XMLHttpRequest();
      const nid = {
        'shineout': 117,
        'shineout-next': 117,
        'shineout-mobile': 125
      }[project] || 117

      const url = 'https://assets.dotfashion.cn/webassets/babel_tower_snap/frontend/production/'+ nid + '/' + version +'/'+ lan +'.json'
      xmlhttp.open("get", url, true)
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          if (timer) {clearTimeout(timer)}
          const data  = JSON.parse(this.responseText);
          if (data && data.code === 0) {
            const ret = transData(data.data)
            // shineout-next 不需要处理周数据
            if (nid === 117 && project === 'shineout') {
              handleWeek(ret)
            }
            resolve(ret[lan])
          } else {
            reject(new Error('获取数据异常'))
          }
        }
      }
      xmlhttp.onerror = function () {
        reject(new Error('获取数据失败'))
      }
       timer = setTimeout(()=>{
          xmlhttp.abort()
          reject(new Error('请求数据超时 10s'))
      }, timeout)
      xmlhttp.send();
    } else {
      reject(new Error('浏览器版本过低无法加载语言包'))
    }
  })
}


const App: React.FC = () => {
  const [lang, setLang] = React.useState('CN')

  useEffect(()=>{
    getLocale(lang, {project: 'shineout-next'}).then((res)=>{
      console.log('remote locale: >>', res)
      setLocale(res)
    })
  }, [lang])


  return <div>
    <Radio.Group keygen data={['CN', 'US']} value={lang} onChange={(v) => setLang(v)}>

    </Radio.Group>
    <DatePicker showSelNow range onChange={(v) => console.log(v)} />
  </div>
};

export default App;
