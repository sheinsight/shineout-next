/**
 * cn - scroll-y-debug
 *    -- scroll-y-debug
 * en - scroll-y-debug
 *    -- scroll-y-debug
 */
import React from 'react';
import { Table } from 'shineout';

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
function flattenArray(arrs) {
  return arrs.reduce((acc, current) => {
    if (current.children && Object.keys(current.children).length) {
      return [...acc, current, ...flattenArray(current.children)]
    }
    return [...acc, current]
  }, [])
}

const data = [
  {
    "name": "手动调用接口",
    "statistics": {
      "caseView": {
        "success": 8,
        "failure": 8,
        "blocked": 0,
        "averageRunningTime": 528.2589486250001,
        "numberOfRuns": 16,
        "number": 16,
        "sumRunningTime": 8452.143178000002,
        "baseCaseNumber": 0,
        "baseCaseSuccessNumber": 0,
        "baseCaseFailureNumber": 0,
        "baseCaseBlockedNumber": 0
      },
      "stepView": {
        "success": 62,
        "failure": 8,
        "blocked": 44,
        "detail": [
          {
            "stepId": "4296291",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296292",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296293",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296294",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296295",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296296",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296297",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296298",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296304",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296305",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296306",
            "averageRunningTime": 172.25686200000004,
            "sumRunningTime": 516.7705860000001,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296307",
            "averageRunningTime": 123.35909700000002,
            "sumRunningTime": 370.07729100000006,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296308",
            "averageRunningTime": 6.683418,
            "sumRunningTime": 20.050254,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296309",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296310",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296311",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296312",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296313",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296314",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296315",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296316",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296317",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296318",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296319",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 3
          },
          {
            "stepId": "4296376",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296377",
            "averageRunningTime": 724.690413,
            "sumRunningTime": 1449.380826,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296378",
            "averageRunningTime": 11.846509,
            "sumRunningTime": 23.693018,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296379",
            "averageRunningTime": 835.059709,
            "sumRunningTime": 1670.119418,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296380",
            "averageRunningTime": 20.305358,
            "sumRunningTime": 40.610716,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296381",
            "averageRunningTime": 712.853262,
            "sumRunningTime": 1425.706524,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296382",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296408",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296409",
            "averageRunningTime": 359.79409799999996,
            "sumRunningTime": 719.5881959999999,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296410",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296411",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296412",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 2
          },
          {
            "stepId": "4296508",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296509",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296510",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296511",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296512",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4296513",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4366774",
            "averageRunningTime": 73.045,
            "sumRunningTime": 73.045,
            "numberOfRuns": 1
          },
          {
            "stepId": "4366775",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4366776",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4366780",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4392816",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4392817",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4392818",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4393063",
            "averageRunningTime": 162.151422,
            "sumRunningTime": 162.151422,
            "numberOfRuns": 1
          },
          {
            "stepId": "4393376",
            "averageRunningTime": 281.221116,
            "sumRunningTime": 562.442232,
            "numberOfRuns": 2
          },
          {
            "stepId": "4393893",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4393894",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4393895",
            "averageRunningTime": 148.598739,
            "sumRunningTime": 148.598739,
            "numberOfRuns": 1
          },
          {
            "stepId": "4393896",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4398153",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4415689",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4415690",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4415691",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4415692",
            "averageRunningTime": 135.499824,
            "sumRunningTime": 135.499824,
            "numberOfRuns": 1
          },
          {
            "stepId": "4415693",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4430862",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4430863",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4430864",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4430865",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4431089",
            "averageRunningTime": 1134.409132,
            "sumRunningTime": 1134.409132,
            "numberOfRuns": 1
          },
          {
            "stepId": "4431090",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4431091",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          },
          {
            "stepId": "4431093",
            "averageRunningTime": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1
          }
        ],
        "number": 0,
        "numberOfRuns": 0
      },
      "interfaceView": {
        "success": 24,
        "failure": 8,
        "blocked": 0,
        "numberOfRuns": 32,
        "number": 24,
        "sumRunningTime": 8452.143178000002,
        "averageRunningTime": 264.12947431250007,
        "detail": [
          {
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTYsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9hcGkvbWluZG1hcC9wbGFuIn0=",
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1,
            "averageRunningTime": 0
          },
          {
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
            "success": 3,
            "failure": 0,
            "blocked": 0,
            "sumRunningTime": 516.7705860000001,
            "numberOfRuns": 3,
            "averageRunningTime": 172.25686200000004
          },
          {
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
            "success": 3,
            "failure": 0,
            "blocked": 0,
            "sumRunningTime": 370.07729100000006,
            "numberOfRuns": 3,
            "averageRunningTime": 123.35909700000002
          },
          {
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
            "success": 0,
            "failure": 3,
            "blocked": 0,
            "sumRunningTime": 20.050254,
            "numberOfRuns": 3,
            "averageRunningTime": 6.683418
          },
          {
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50In0=",
            "success": 6,
            "failure": 0,
            "blocked": 0,
            "sumRunningTime": 1513.68456,
            "numberOfRuns": 6,
            "averageRunningTime": 252.28076
          },
          {
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50L2RldGFpbHMifQ==",
            "success": 4,
            "failure": 0,
            "blocked": 0,
            "sumRunningTime": 3095.825942,
            "numberOfRuns": 4,
            "averageRunningTime": 773.9564855
          },
          {
            "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cHM6Ly9wZGMtdGVzdDAxLnNoZWluLmNvbS9waW0vZ2V0X3Byb2R1Y3RfbGlzdCJ9",
            "success": 2,
            "failure": 0,
            "blocked": 0,
            "sumRunningTime": 562.442232,
            "numberOfRuns": 2,
            "averageRunningTime": 281.221116
          },
          {
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL3BsYW4ifQ==",
            "success": 2,
            "failure": 0,
            "blocked": 0,
            "sumRunningTime": 719.5881959999999,
            "numberOfRuns": 2,
            "averageRunningTime": 359.79409799999996
          },
          {
            "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwOi8vbWV0YWRhdGEudGVuY2VudHl1bi5jb20vbGF0ZXN0L21ldGEtZGF0YSJ9",
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1,
            "averageRunningTime": 0
          },
          {
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjY2NTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2xhdGVzdC9tZXRhLWRhdGEifQ==",
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1,
            "averageRunningTime": 0
          },
          {
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL3Jldmlld1Rhc2svcmV2aWV3L3N0YXJ0In0=",
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "sumRunningTime": 73.045,
            "numberOfRuns": 1,
            "averageRunningTime": 73.045
          },
          {
            "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
            "success": 3,
            "failure": 0,
            "blocked": 0,
            "sumRunningTime": 446.249985,
            "numberOfRuns": 3,
            "averageRunningTime": 148.74999499999998
          },
          {
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOiIiLCJtZXRob2QiOiJnZXQiLCJwYXRobmFtZSI6IiJ9",
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "sumRunningTime": 0,
            "numberOfRuns": 1,
            "averageRunningTime": 0
          },
          {
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9maWxlLXN0b3JhZ2UifQ==",
            "success": 1,
            "failure": 0,
            "blocked": 0,
            "sumRunningTime": 1134.409132,
            "numberOfRuns": 1,
            "averageRunningTime": 1134.409132
          }
        ],
        "speedDistribution": {
          "0": 12,
          "100": 9,
          "200": 4,
          "500": 7
        }
      }
    },
    "children": [
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTYsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9hcGkvbWluZG1hcC9wbGFuIn0=",
        "statistics": {
          "caseView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "averageRunningTime": 0,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 0,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 1,
            "failure": 1,
            "blocked": 6,
            "detail": [
              {
                "stepId": "4296291",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296292",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296293",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296294",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296295",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296296",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296297",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296298",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 0,
            "averageRunningTime": 0,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTYsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9hcGkvbWluZG1hcC9wbGFuIn0=",
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1,
                "averageRunningTime": 0
              }
            ],
            "speedDistribution": {
              "0": 1
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "计划创建编辑删除基本场景",
            "statistics": {
              "caseView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "averageRunningTime": 0,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 0,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 1,
                "failure": 1,
                "blocked": 6,
                "number": 8,
                "numberOfRuns": 8,
                "detail": [
                  {
                    "stepId": "4296291",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296292",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296293",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296294",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296295",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296296",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296297",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296298",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "number": 1,
                "numberOfRuns": 1,
                "sumRunningTime": 0,
                "averageRunningTime": 0,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTYsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9hcGkvbWluZG1hcC9wbGFuIn0=",
                    "success": 0,
                    "failure": 1,
                    "blocked": 0,
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "0": 1
                }
              }
            },
            "children": [],
            "caseId": "973317",
            "interfaceId": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTYsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9hcGkvbWluZG1hcC9wbGFuIn0=",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTYsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9hcGkvbWluZG1hcC9wbGFuIn0=",
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTYsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9hcGkvbWluZG1hcC9wbGFuIn0=",
            "uuid": "f3d1f9a9-9217-4b46-8284-4d07e5abf65e"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTYsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9hcGkvbWluZG1hcC9wbGFuIn0=",
        "uuid": "65ff33b8-f8f1-43c6-99a4-641bfbfabb2b"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
        "statistics": {
          "caseView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "averageRunningTime": 302.29937700000005,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 302.29937700000005,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 4,
            "failure": 1,
            "blocked": 11,
            "detail": [
              {
                "stepId": "4296304",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296305",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296306",
                "averageRunningTime": 172.256862,
                "sumRunningTime": 172.256862,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296307",
                "averageRunningTime": 123.35909700000002,
                "sumRunningTime": 123.35909700000002,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296308",
                "averageRunningTime": 6.683418,
                "sumRunningTime": 6.683418,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296309",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296310",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296311",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296312",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296313",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296314",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296315",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296316",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296317",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296318",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296319",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 2,
            "failure": 1,
            "blocked": 0,
            "numberOfRuns": 3,
            "number": 3,
            "sumRunningTime": 302.29937700000005,
            "averageRunningTime": 100.76645900000001,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 172.256862,
                "numberOfRuns": 1,
                "averageRunningTime": 172.256862
              },
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 123.35909700000002,
                "numberOfRuns": 1,
                "averageRunningTime": 123.35909700000002
              },
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "sumRunningTime": 6.683418,
                "numberOfRuns": 1,
                "averageRunningTime": 6.683418
              }
            ],
            "speedDistribution": {
              "0": 1,
              "100": 2
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "执行任务正常流程",
            "statistics": {
              "caseView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "averageRunningTime": 302.29937700000005,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 302.29937700000005,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 4,
                "failure": 1,
                "blocked": 11,
                "number": 16,
                "numberOfRuns": 16,
                "detail": [
                  {
                    "stepId": "4296304",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296305",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296306",
                    "averageRunningTime": 172.256862,
                    "sumRunningTime": 172.256862,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296307",
                    "averageRunningTime": 123.35909700000002,
                    "sumRunningTime": 123.35909700000002,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296308",
                    "averageRunningTime": 6.683418,
                    "sumRunningTime": 6.683418,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296309",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296310",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296311",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296312",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296313",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296314",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296315",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296316",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296317",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296318",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296319",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 2,
                "failure": 1,
                "blocked": 0,
                "number": 3,
                "numberOfRuns": 3,
                "sumRunningTime": 302.29937700000005,
                "averageRunningTime": 100.76645900000001,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 172.256862,
                    "sumRunningTime": 172.256862,
                    "numberOfRuns": 1
                  },
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 123.35909700000002,
                    "sumRunningTime": 123.35909700000002,
                    "numberOfRuns": 1
                  },
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
                    "success": 0,
                    "failure": 1,
                    "blocked": 0,
                    "averageRunningTime": 6.683418,
                    "sumRunningTime": 6.683418,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "0": 1,
                  "100": 2
                }
              }
            },
            "children": [],
            "caseId": "973319",
            "interfaceId": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
            "uuid": "77d0bc71-666b-480a-afbc-eb4db6a925fd"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
        "uuid": "04bd8b2c-c09c-4605-a6a6-bc22095aee35"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
        "statistics": {
          "caseView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "averageRunningTime": 302.29937700000005,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 302.29937700000005,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 4,
            "failure": 1,
            "blocked": 11,
            "detail": [
              {
                "stepId": "4296304",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296305",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296306",
                "averageRunningTime": 172.256862,
                "sumRunningTime": 172.256862,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296307",
                "averageRunningTime": 123.35909700000002,
                "sumRunningTime": 123.35909700000002,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296308",
                "averageRunningTime": 6.683418,
                "sumRunningTime": 6.683418,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296309",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296310",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296311",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296312",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296313",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296314",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296315",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296316",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296317",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296318",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296319",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 2,
            "failure": 1,
            "blocked": 0,
            "numberOfRuns": 3,
            "number": 3,
            "sumRunningTime": 302.29937700000005,
            "averageRunningTime": 100.76645900000001,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 172.256862,
                "numberOfRuns": 1,
                "averageRunningTime": 172.256862
              },
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 123.35909700000002,
                "numberOfRuns": 1,
                "averageRunningTime": 123.35909700000002
              },
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "sumRunningTime": 6.683418,
                "numberOfRuns": 1,
                "averageRunningTime": 6.683418
              }
            ],
            "speedDistribution": {
              "0": 1,
              "100": 2
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "执行任务正常流程",
            "statistics": {
              "caseView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "averageRunningTime": 302.29937700000005,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 302.29937700000005,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 4,
                "failure": 1,
                "blocked": 11,
                "number": 16,
                "numberOfRuns": 16,
                "detail": [
                  {
                    "stepId": "4296304",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296305",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296306",
                    "averageRunningTime": 172.256862,
                    "sumRunningTime": 172.256862,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296307",
                    "averageRunningTime": 123.35909700000002,
                    "sumRunningTime": 123.35909700000002,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296308",
                    "averageRunningTime": 6.683418,
                    "sumRunningTime": 6.683418,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296309",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296310",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296311",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296312",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296313",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296314",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296315",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296316",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296317",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296318",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296319",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 2,
                "failure": 1,
                "blocked": 0,
                "number": 3,
                "numberOfRuns": 3,
                "sumRunningTime": 302.29937700000005,
                "averageRunningTime": 100.76645900000001,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 172.256862,
                    "sumRunningTime": 172.256862,
                    "numberOfRuns": 1
                  },
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 123.35909700000002,
                    "sumRunningTime": 123.35909700000002,
                    "numberOfRuns": 1
                  },
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
                    "success": 0,
                    "failure": 1,
                    "blocked": 0,
                    "averageRunningTime": 6.683418,
                    "sumRunningTime": 6.683418,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "0": 1,
                  "100": 2
                }
              }
            },
            "children": [],
            "caseId": "973319",
            "interfaceId": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
            "uuid": "3f2495da-25c1-4b85-b806-5f9094ab06d0"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
        "uuid": "df284dd2-1de6-4a2e-b596-03db376661d9"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
        "statistics": {
          "caseView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "averageRunningTime": 302.29937700000005,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 302.29937700000005,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 4,
            "failure": 1,
            "blocked": 11,
            "detail": [
              {
                "stepId": "4296304",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296305",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296306",
                "averageRunningTime": 172.256862,
                "sumRunningTime": 172.256862,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296307",
                "averageRunningTime": 123.35909700000002,
                "sumRunningTime": 123.35909700000002,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296308",
                "averageRunningTime": 6.683418,
                "sumRunningTime": 6.683418,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296309",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296310",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296311",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296312",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296313",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296314",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296315",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296316",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296317",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296318",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296319",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 2,
            "failure": 1,
            "blocked": 0,
            "numberOfRuns": 3,
            "number": 3,
            "sumRunningTime": 302.29937700000005,
            "averageRunningTime": 100.76645900000001,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 172.256862,
                "numberOfRuns": 1,
                "averageRunningTime": 172.256862
              },
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 123.35909700000002,
                "numberOfRuns": 1,
                "averageRunningTime": 123.35909700000002
              },
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "sumRunningTime": 6.683418,
                "numberOfRuns": 1,
                "averageRunningTime": 6.683418
              }
            ],
            "speedDistribution": {
              "0": 1,
              "100": 2
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "执行任务正常流程",
            "statistics": {
              "caseView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "averageRunningTime": 302.29937700000005,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 302.29937700000005,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 4,
                "failure": 1,
                "blocked": 11,
                "number": 16,
                "numberOfRuns": 16,
                "detail": [
                  {
                    "stepId": "4296304",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296305",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296306",
                    "averageRunningTime": 172.256862,
                    "sumRunningTime": 172.256862,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296307",
                    "averageRunningTime": 123.35909700000002,
                    "sumRunningTime": 123.35909700000002,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296308",
                    "averageRunningTime": 6.683418,
                    "sumRunningTime": 6.683418,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296309",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296310",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296311",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296312",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296313",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296314",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296315",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296316",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296317",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296318",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296319",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 2,
                "failure": 1,
                "blocked": 0,
                "number": 3,
                "numberOfRuns": 3,
                "sumRunningTime": 302.29937700000005,
                "averageRunningTime": 100.76645900000001,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL21pbmRtYXAvbm9kZS9kZXNjZW5kYW50cy9jYXNlIn0=",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 172.256862,
                    "sumRunningTime": 172.256862,
                    "numberOfRuns": 1
                  },
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9taW5kbWFwL25vZGUvYW5jZXN0b3JzIn0=",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 123.35909700000002,
                    "sumRunningTime": 123.35909700000002,
                    "numberOfRuns": 1
                  },
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
                    "success": 0,
                    "failure": 1,
                    "blocked": 0,
                    "averageRunningTime": 6.683418,
                    "sumRunningTime": 6.683418,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "0": 1,
                  "100": 2
                }
              }
            },
            "children": [],
            "caseId": "973319",
            "interfaceId": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
            "uuid": "dae4c59d-b189-4eb6-bf67-6e5af9d4ffe6"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9leGVjdXRlVGFzayJ9",
        "uuid": "dd808d79-0d37-4fb5-ba1a-aa7dc1f258fb"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50In0=",
        "statistics": {
          "caseView": {
            "success": 1,
            "failure": 0,
            "blocked": 0,
            "averageRunningTime": 2304.755251,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 2304.755251,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 7,
            "failure": 0,
            "blocked": 0,
            "detail": [
              {
                "stepId": "4296376",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296377",
                "averageRunningTime": 724.690413,
                "sumRunningTime": 724.690413,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296378",
                "averageRunningTime": 11.846509,
                "sumRunningTime": 11.846509,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296379",
                "averageRunningTime": 835.059709,
                "sumRunningTime": 835.059709,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296380",
                "averageRunningTime": 20.305358,
                "sumRunningTime": 20.305358,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296381",
                "averageRunningTime": 712.853262,
                "sumRunningTime": 712.853262,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296382",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 5,
            "failure": 0,
            "blocked": 0,
            "numberOfRuns": 5,
            "number": 2,
            "sumRunningTime": 2304.755251,
            "averageRunningTime": 460.9510502,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50In0=",
                "success": 3,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 756.84228,
                "numberOfRuns": 3,
                "averageRunningTime": 252.28076
              },
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50L2RldGFpbHMifQ==",
                "success": 2,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 1547.912971,
                "numberOfRuns": 2,
                "averageRunningTime": 773.9564855
              }
            ],
            "speedDistribution": {
              "0": 2,
              "500": 3
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "项目信息-执行环境",
            "statistics": {
              "caseView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "averageRunningTime": 2304.755251,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 2304.755251,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 7,
                "failure": 0,
                "blocked": 0,
                "number": 7,
                "numberOfRuns": 7,
                "detail": [
                  {
                    "stepId": "4296376",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296377",
                    "averageRunningTime": 724.690413,
                    "sumRunningTime": 724.690413,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296378",
                    "averageRunningTime": 11.846509,
                    "sumRunningTime": 11.846509,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296379",
                    "averageRunningTime": 835.059709,
                    "sumRunningTime": 835.059709,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296380",
                    "averageRunningTime": 20.305358,
                    "sumRunningTime": 20.305358,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296381",
                    "averageRunningTime": 712.853262,
                    "sumRunningTime": 712.853262,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296382",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 5,
                "failure": 0,
                "blocked": 0,
                "number": 2,
                "numberOfRuns": 5,
                "sumRunningTime": 2304.755251,
                "averageRunningTime": 460.9510502,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50In0=",
                    "success": 3,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 252.28076,
                    "sumRunningTime": 756.84228,
                    "numberOfRuns": 3
                  },
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50L2RldGFpbHMifQ==",
                    "success": 2,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 773.9564855,
                    "sumRunningTime": 1547.912971,
                    "numberOfRuns": 2
                  }
                ],
                "speedDistribution": {
                  "0": 2,
                  "500": 3
                }
              }
            },
            "children": [],
            "caseId": "973328",
            "interfaceId": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50In0=",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50In0=",
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50In0=",
            "uuid": "6a2ef4aa-ae35-4c8f-b891-2d8844fa12c1"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50In0=",
        "uuid": "f3022df5-406c-4c48-ae38-971da612dc96"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50L2RldGFpbHMifQ==",
        "statistics": {
          "caseView": {
            "success": 1,
            "failure": 0,
            "blocked": 0,
            "averageRunningTime": 2304.755251,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 2304.755251,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 7,
            "failure": 0,
            "blocked": 0,
            "detail": [
              {
                "stepId": "4296376",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296377",
                "averageRunningTime": 724.690413,
                "sumRunningTime": 724.690413,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296378",
                "averageRunningTime": 11.846509,
                "sumRunningTime": 11.846509,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296379",
                "averageRunningTime": 835.059709,
                "sumRunningTime": 835.059709,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296380",
                "averageRunningTime": 20.305358,
                "sumRunningTime": 20.305358,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296381",
                "averageRunningTime": 712.853262,
                "sumRunningTime": 712.853262,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296382",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 5,
            "failure": 0,
            "blocked": 0,
            "numberOfRuns": 5,
            "number": 2,
            "sumRunningTime": 2304.755251,
            "averageRunningTime": 460.9510502,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50In0=",
                "success": 3,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 756.84228,
                "numberOfRuns": 3,
                "averageRunningTime": 252.28076
              },
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50L2RldGFpbHMifQ==",
                "success": 2,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 1547.912971,
                "numberOfRuns": 2,
                "averageRunningTime": 773.9564855
              }
            ],
            "speedDistribution": {
              "0": 2,
              "500": 3
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "项目信息-执行环境",
            "statistics": {
              "caseView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "averageRunningTime": 2304.755251,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 2304.755251,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 7,
                "failure": 0,
                "blocked": 0,
                "number": 7,
                "numberOfRuns": 7,
                "detail": [
                  {
                    "stepId": "4296376",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296377",
                    "averageRunningTime": 724.690413,
                    "sumRunningTime": 724.690413,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296378",
                    "averageRunningTime": 11.846509,
                    "sumRunningTime": 11.846509,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296379",
                    "averageRunningTime": 835.059709,
                    "sumRunningTime": 835.059709,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296380",
                    "averageRunningTime": 20.305358,
                    "sumRunningTime": 20.305358,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296381",
                    "averageRunningTime": 712.853262,
                    "sumRunningTime": 712.853262,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296382",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 5,
                "failure": 0,
                "blocked": 0,
                "number": 2,
                "numberOfRuns": 5,
                "sumRunningTime": 2304.755251,
                "averageRunningTime": 460.9510502,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50In0=",
                    "success": 3,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 252.28076,
                    "sumRunningTime": 756.84228,
                    "numberOfRuns": 3
                  },
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50L2RldGFpbHMifQ==",
                    "success": 2,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 773.9564855,
                    "sumRunningTime": 1547.912971,
                    "numberOfRuns": 2
                  }
                ],
                "speedDistribution": {
                  "0": 2,
                  "500": 3
                }
              }
            },
            "children": [],
            "caseId": "973328",
            "interfaceId": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50L2RldGFpbHMifQ==",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50L2RldGFpbHMifQ==",
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50L2RldGFpbHMifQ==",
            "uuid": "ff3cf260-1bd0-4414-af43-c5a4ea265610"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2Vudmlyb25tZW50L2RldGFpbHMifQ==",
        "uuid": "9714bcda-d0b5-40c6-b04f-6635fddf326e"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cHM6Ly9wZGMtdGVzdDAxLnNoZWluLmNvbS9waW0vZ2V0X3Byb2R1Y3RfbGlzdCJ9",
        "statistics": {
          "caseView": {
            "success": 1,
            "failure": 0,
            "blocked": 0,
            "averageRunningTime": 641.015214,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 641.015214,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 6,
            "failure": 0,
            "blocked": 0,
            "detail": [
              {
                "stepId": "4296408",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296409",
                "averageRunningTime": 359.79409799999996,
                "sumRunningTime": 359.79409799999996,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296410",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296411",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296412",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4393376",
                "averageRunningTime": 281.221116,
                "sumRunningTime": 281.221116,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 2,
            "failure": 0,
            "blocked": 0,
            "numberOfRuns": 2,
            "number": 2,
            "sumRunningTime": 641.015214,
            "averageRunningTime": 320.507607,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cHM6Ly9wZGMtdGVzdDAxLnNoZWluLmNvbS9waW0vZ2V0X3Byb2R1Y3RfbGlzdCJ9",
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 281.221116,
                "numberOfRuns": 1,
                "averageRunningTime": 281.221116
              },
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL3BsYW4ifQ==",
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 359.79409799999996,
                "numberOfRuns": 1,
                "averageRunningTime": 359.79409799999996
              }
            ],
            "speedDistribution": {
              "200": 2
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "发送Kafka消息",
            "statistics": {
              "caseView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "averageRunningTime": 641.015214,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 641.015214,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 6,
                "failure": 0,
                "blocked": 0,
                "number": 6,
                "numberOfRuns": 6,
                "detail": [
                  {
                    "stepId": "4296408",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296409",
                    "averageRunningTime": 359.79409799999996,
                    "sumRunningTime": 359.79409799999996,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296410",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296411",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296412",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4393376",
                    "averageRunningTime": 281.221116,
                    "sumRunningTime": 281.221116,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 2,
                "failure": 0,
                "blocked": 0,
                "number": 2,
                "numberOfRuns": 2,
                "sumRunningTime": 641.015214,
                "averageRunningTime": 320.507607,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cHM6Ly9wZGMtdGVzdDAxLnNoZWluLmNvbS9waW0vZ2V0X3Byb2R1Y3RfbGlzdCJ9",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 281.221116,
                    "sumRunningTime": 281.221116,
                    "numberOfRuns": 1
                  },
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL3BsYW4ifQ==",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 359.79409799999996,
                    "sumRunningTime": 359.79409799999996,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "200": 2
                }
              }
            },
            "children": [],
            "caseId": "973330",
            "interfaceId": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cHM6Ly9wZGMtdGVzdDAxLnNoZWluLmNvbS9waW0vZ2V0X3Byb2R1Y3RfbGlzdCJ9",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cHM6Ly9wZGMtdGVzdDAxLnNoZWluLmNvbS9waW0vZ2V0X3Byb2R1Y3RfbGlzdCJ9",
            "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cHM6Ly9wZGMtdGVzdDAxLnNoZWluLmNvbS9waW0vZ2V0X3Byb2R1Y3RfbGlzdCJ9",
            "uuid": "e546ffb8-ad9b-4430-98e0-a1b1f7458c13"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cHM6Ly9wZGMtdGVzdDAxLnNoZWluLmNvbS9waW0vZ2V0X3Byb2R1Y3RfbGlzdCJ9",
        "uuid": "4d03021a-af2f-41d2-add4-2f782bdaeece"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL3BsYW4ifQ==",
        "statistics": {
          "caseView": {
            "success": 1,
            "failure": 0,
            "blocked": 0,
            "averageRunningTime": 641.015214,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 641.015214,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 6,
            "failure": 0,
            "blocked": 0,
            "detail": [
              {
                "stepId": "4296408",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296409",
                "averageRunningTime": 359.79409799999996,
                "sumRunningTime": 359.79409799999996,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296410",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296411",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296412",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4393376",
                "averageRunningTime": 281.221116,
                "sumRunningTime": 281.221116,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 2,
            "failure": 0,
            "blocked": 0,
            "numberOfRuns": 2,
            "number": 2,
            "sumRunningTime": 641.015214,
            "averageRunningTime": 320.507607,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cHM6Ly9wZGMtdGVzdDAxLnNoZWluLmNvbS9waW0vZ2V0X3Byb2R1Y3RfbGlzdCJ9",
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 281.221116,
                "numberOfRuns": 1,
                "averageRunningTime": 281.221116
              },
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL3BsYW4ifQ==",
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 359.79409799999996,
                "numberOfRuns": 1,
                "averageRunningTime": 359.79409799999996
              }
            ],
            "speedDistribution": {
              "200": 2
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "发送Kafka消息",
            "statistics": {
              "caseView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "averageRunningTime": 641.015214,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 641.015214,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 6,
                "failure": 0,
                "blocked": 0,
                "number": 6,
                "numberOfRuns": 6,
                "detail": [
                  {
                    "stepId": "4296408",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296409",
                    "averageRunningTime": 359.79409799999996,
                    "sumRunningTime": 359.79409799999996,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296410",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296411",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296412",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4393376",
                    "averageRunningTime": 281.221116,
                    "sumRunningTime": 281.221116,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 2,
                "failure": 0,
                "blocked": 0,
                "number": 2,
                "numberOfRuns": 2,
                "sumRunningTime": 641.015214,
                "averageRunningTime": 320.507607,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJQT1NUIiwidXJsIjoiaHR0cHM6Ly9wZGMtdGVzdDAxLnNoZWluLmNvbS9waW0vZ2V0X3Byb2R1Y3RfbGlzdCJ9",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 281.221116,
                    "sumRunningTime": 281.221116,
                    "numberOfRuns": 1
                  },
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL3BsYW4ifQ==",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 359.79409799999996,
                    "sumRunningTime": 359.79409799999996,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "200": 2
                }
              }
            },
            "children": [],
            "caseId": "973330",
            "interfaceId": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL3BsYW4ifQ==",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL3BsYW4ifQ==",
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL3BsYW4ifQ==",
            "uuid": "59f40510-bd3b-47f9-a060-f3b2f4c8aae5"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL3BsYW4ifQ==",
        "uuid": "9310ff0a-e387-455f-b772-93dcde46f96e"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwOi8vbWV0YWRhdGEudGVuY2VudHl1bi5jb20vbGF0ZXN0L21ldGEtZGF0YSJ9",
        "statistics": {
          "caseView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "averageRunningTime": 0,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 0,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 1,
            "failure": 1,
            "blocked": 1,
            "detail": [
              {
                "stepId": "4296508",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296509",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296510",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 0,
            "averageRunningTime": 0,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwOi8vbWV0YWRhdGEudGVuY2VudHl1bi5jb20vbGF0ZXN0L21ldGEtZGF0YSJ9",
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1,
                "averageRunningTime": 0
              }
            ],
            "speedDistribution": {
              "0": 1
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "手工请求黑名单域名",
            "statistics": {
              "caseView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "averageRunningTime": 0,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 0,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 1,
                "failure": 1,
                "blocked": 1,
                "number": 3,
                "numberOfRuns": 3,
                "detail": [
                  {
                    "stepId": "4296508",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296509",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296510",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "number": 1,
                "numberOfRuns": 1,
                "sumRunningTime": 0,
                "averageRunningTime": 0,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwOi8vbWV0YWRhdGEudGVuY2VudHl1bi5jb20vbGF0ZXN0L21ldGEtZGF0YSJ9",
                    "success": 0,
                    "failure": 1,
                    "blocked": 0,
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "0": 1
                }
              }
            },
            "children": [],
            "caseId": "973340",
            "interfaceId": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwOi8vbWV0YWRhdGEudGVuY2VudHl1bi5jb20vbGF0ZXN0L21ldGEtZGF0YSJ9",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwOi8vbWV0YWRhdGEudGVuY2VudHl1bi5jb20vbGF0ZXN0L21ldGEtZGF0YSJ9",
            "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwOi8vbWV0YWRhdGEudGVuY2VudHl1bi5jb20vbGF0ZXN0L21ldGEtZGF0YSJ9",
            "uuid": "717d9a90-ef1a-408e-b0eb-40791dfd9c4c"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwOi8vbWV0YWRhdGEudGVuY2VudHl1bi5jb20vbGF0ZXN0L21ldGEtZGF0YSJ9",
        "uuid": "e04e1260-bd60-4a99-9995-1cdb2abd3dc4"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjY2NTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2xhdGVzdC9tZXRhLWRhdGEifQ==",
        "statistics": {
          "caseView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "averageRunningTime": 0,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 0,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 1,
            "failure": 1,
            "blocked": 1,
            "detail": [
              {
                "stepId": "4296511",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296512",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4296513",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 0,
            "averageRunningTime": 0,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjY2NTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2xhdGVzdC9tZXRhLWRhdGEifQ==",
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1,
                "averageRunningTime": 0
              }
            ],
            "speedDistribution": {
              "0": 1
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "api请求黑名单域名",
            "statistics": {
              "caseView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "averageRunningTime": 0,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 0,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 1,
                "failure": 1,
                "blocked": 1,
                "number": 3,
                "numberOfRuns": 3,
                "detail": [
                  {
                    "stepId": "4296511",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296512",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4296513",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "number": 1,
                "numberOfRuns": 1,
                "sumRunningTime": 0,
                "averageRunningTime": 0,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjY2NTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2xhdGVzdC9tZXRhLWRhdGEifQ==",
                    "success": 0,
                    "failure": 1,
                    "blocked": 0,
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "0": 1
                }
              }
            },
            "children": [],
            "caseId": "973341",
            "interfaceId": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjY2NTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2xhdGVzdC9tZXRhLWRhdGEifQ==",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjY2NTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2xhdGVzdC9tZXRhLWRhdGEifQ==",
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjY2NTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2xhdGVzdC9tZXRhLWRhdGEifQ==",
            "uuid": "13b6ef3b-8ee1-4957-ad50-a857df23bd2c"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjY2NTIsIm1ldGhvZCI6IkdFVCIsInBhdGhuYW1lIjoiL2xhdGVzdC9tZXRhLWRhdGEifQ==",
        "uuid": "94600007-9818-48a5-bf55-ab6c44950e60"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL3Jldmlld1Rhc2svcmV2aWV3L3N0YXJ0In0=",
        "statistics": {
          "caseView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "averageRunningTime": 73.045,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 73.045,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 1,
            "failure": 1,
            "blocked": 2,
            "detail": [
              {
                "stepId": "4366774",
                "averageRunningTime": 73.045,
                "sumRunningTime": 73.045,
                "numberOfRuns": 1
              },
              {
                "stepId": "4366775",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4366776",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4366780",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 73.045,
            "averageRunningTime": 73.045,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL3Jldmlld1Rhc2svcmV2aWV3L3N0YXJ0In0=",
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "sumRunningTime": 73.045,
                "numberOfRuns": 1,
                "averageRunningTime": 73.045
              }
            ],
            "speedDistribution": {
              "0": 1
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "模板校验",
            "statistics": {
              "caseView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "averageRunningTime": 73.045,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 73.045,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 1,
                "failure": 1,
                "blocked": 2,
                "number": 4,
                "numberOfRuns": 4,
                "detail": [
                  {
                    "stepId": "4366774",
                    "averageRunningTime": 73.045,
                    "sumRunningTime": 73.045,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4366775",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4366776",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4366780",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "number": 1,
                "numberOfRuns": 1,
                "sumRunningTime": 73.045,
                "averageRunningTime": 73.045,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL3Jldmlld1Rhc2svcmV2aWV3L3N0YXJ0In0=",
                    "success": 0,
                    "failure": 1,
                    "blocked": 0,
                    "averageRunningTime": 73.045,
                    "sumRunningTime": 73.045,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "0": 1
                }
              }
            },
            "children": [],
            "caseId": "986288",
            "interfaceId": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL3Jldmlld1Rhc2svcmV2aWV3L3N0YXJ0In0=",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL3Jldmlld1Rhc2svcmV2aWV3L3N0YXJ0In0=",
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL3Jldmlld1Rhc2svcmV2aWV3L3N0YXJ0In0=",
            "uuid": "0568bb3c-423a-4ab7-b106-ca8d88c30d02"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjU0OTEsIm1ldGhvZCI6IlBVVCIsInBhdGhuYW1lIjoiL3Jldmlld1Rhc2svcmV2aWV3L3N0YXJ0In0=",
        "uuid": "6eff46e7-573e-4506-9eb4-f554acc4533b"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
        "statistics": {
          "caseView": {
            "success": 3,
            "failure": 0,
            "blocked": 0,
            "averageRunningTime": 148.74999499999998,
            "numberOfRuns": 3,
            "number": 3,
            "sumRunningTime": 446.249985,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 14,
            "failure": 0,
            "blocked": 0,
            "detail": [
              {
                "stepId": "4392816",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4392817",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4392818",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4393063",
                "averageRunningTime": 162.151422,
                "sumRunningTime": 162.151422,
                "numberOfRuns": 1
              },
              {
                "stepId": "4393893",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4393894",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4393895",
                "averageRunningTime": 148.598739,
                "sumRunningTime": 148.598739,
                "numberOfRuns": 1
              },
              {
                "stepId": "4393896",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4398153",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4415689",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4415690",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4415691",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4415692",
                "averageRunningTime": 135.499824,
                "sumRunningTime": 135.499824,
                "numberOfRuns": 1
              },
              {
                "stepId": "4415693",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 3,
            "failure": 0,
            "blocked": 0,
            "numberOfRuns": 3,
            "number": 1,
            "sumRunningTime": 446.249985,
            "averageRunningTime": 148.74999499999998,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
                "success": 3,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 446.249985,
                "numberOfRuns": 3,
                "averageRunningTime": 148.74999499999998
              }
            ],
            "speedDistribution": {
              "100": 3
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "获取自定义kafka消息函数",
            "statistics": {
              "caseView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "averageRunningTime": 162.151422,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 162.151422,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 4,
                "failure": 0,
                "blocked": 0,
                "number": 4,
                "numberOfRuns": 4,
                "detail": [
                  {
                    "stepId": "4392816",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4392817",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4392818",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4393063",
                    "averageRunningTime": 162.151422,
                    "sumRunningTime": 162.151422,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "number": 1,
                "numberOfRuns": 1,
                "sumRunningTime": 162.151422,
                "averageRunningTime": 162.151422,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 162.151422,
                    "sumRunningTime": 162.151422,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "100": 1
                }
              }
            },
            "children": [],
            "caseId": "990809",
            "interfaceId": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
            "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
            "uuid": "26dee6cb-17d5-457c-9273-486c7428a763"
          },
          {
            "type": "case",
            "name": "获取消息平台kafka消息函数",
            "statistics": {
              "caseView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "averageRunningTime": 148.598739,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 148.598739,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 5,
                "failure": 0,
                "blocked": 0,
                "number": 5,
                "numberOfRuns": 5,
                "detail": [
                  {
                    "stepId": "4393893",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4393894",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4393895",
                    "averageRunningTime": 148.598739,
                    "sumRunningTime": 148.598739,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4393896",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4398153",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "number": 1,
                "numberOfRuns": 1,
                "sumRunningTime": 148.598739,
                "averageRunningTime": 148.598739,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 148.598739,
                    "sumRunningTime": 148.598739,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "100": 1
                }
              }
            },
            "children": [],
            "caseId": "990911",
            "interfaceId": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
            "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
            "uuid": "55aabfee-810d-482b-b77c-2686f517527f"
          },
          {
            "type": "case",
            "name": "测试kafka函数",
            "statistics": {
              "caseView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "averageRunningTime": 135.499824,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 135.499824,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 5,
                "failure": 0,
                "blocked": 0,
                "number": 5,
                "numberOfRuns": 5,
                "detail": [
                  {
                    "stepId": "4415689",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4415690",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4415691",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4415692",
                    "averageRunningTime": 135.499824,
                    "sumRunningTime": 135.499824,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4415693",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "number": 1,
                "numberOfRuns": 1,
                "sumRunningTime": 135.499824,
                "averageRunningTime": 135.499824,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 135.499824,
                    "sumRunningTime": 135.499824,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "100": 1
                }
              }
            },
            "children": [],
            "caseId": "995260",
            "interfaceId": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
            "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
            "uuid": "a005ed64-26f0-4517-9495-d822f39b4c4f"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoibWFudWFsLXJlcXVlc3QiLCJtZXRob2QiOiJnZXQiLCJ1cmwiOiJodHRwczovL3NvdGVzdC5iaXouc2hlaW5jb3JwLmNuLyJ9",
        "uuid": "637cd5a8-6ef8-487e-8faf-7d47d60bd7e6"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOiIiLCJtZXRob2QiOiJnZXQiLCJwYXRobmFtZSI6IiJ9",
        "statistics": {
          "caseView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "averageRunningTime": 0,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 0,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 2,
            "failure": 1,
            "blocked": 1,
            "detail": [
              {
                "stepId": "4430862",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4430863",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4430864",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4430865",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 0,
            "failure": 1,
            "blocked": 0,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 0,
            "averageRunningTime": 0,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOiIiLCJtZXRob2QiOiJnZXQiLCJwYXRobmFtZSI6IiJ9",
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1,
                "averageRunningTime": 0
              }
            ],
            "speedDistribution": {
              "0": 1
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "mysql使用",
            "statistics": {
              "caseView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "averageRunningTime": 0,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 0,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 2,
                "failure": 1,
                "blocked": 1,
                "number": 4,
                "numberOfRuns": 4,
                "detail": [
                  {
                    "stepId": "4430862",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4430863",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4430864",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4430865",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 0,
                "failure": 1,
                "blocked": 0,
                "number": 1,
                "numberOfRuns": 1,
                "sumRunningTime": 0,
                "averageRunningTime": 0,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOiIiLCJtZXRob2QiOiJnZXQiLCJwYXRobmFtZSI6IiJ9",
                    "success": 0,
                    "failure": 1,
                    "blocked": 0,
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "0": 1
                }
              }
            },
            "children": [],
            "caseId": "997190",
            "interfaceId": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOiIiLCJtZXRob2QiOiJnZXQiLCJwYXRobmFtZSI6IiJ9",
            "interfaceName": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOiIiLCJtZXRob2QiOiJnZXQiLCJwYXRobmFtZSI6IiJ9",
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOiIiLCJtZXRob2QiOiJnZXQiLCJwYXRobmFtZSI6IiJ9",
            "uuid": "ae86b513-5c59-41e2-bf3c-3eb11d829f30"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOiIiLCJtZXRob2QiOiJnZXQiLCJwYXRobmFtZSI6IiJ9",
        "uuid": "5e19dd9a-4c33-4dbd-af1a-3c996a9d4c8b"
      },
      {
        "type": "interface",
        "name": "获取步骤签名信息失败 eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9maWxlLXN0b3JhZ2UifQ==",
        "statistics": {
          "caseView": {
            "success": 1,
            "failure": 0,
            "blocked": 0,
            "averageRunningTime": 1134.409132,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 1134.409132,
            "baseCaseNumber": 0,
            "baseCaseSuccessNumber": 0,
            "baseCaseFailureNumber": 0,
            "baseCaseBlockedNumber": 0
          },
          "stepView": {
            "success": 4,
            "failure": 0,
            "blocked": 0,
            "detail": [
              {
                "stepId": "4431089",
                "averageRunningTime": 1134.409132,
                "sumRunningTime": 1134.409132,
                "numberOfRuns": 1
              },
              {
                "stepId": "4431090",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4431091",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              },
              {
                "stepId": "4431093",
                "averageRunningTime": 0,
                "sumRunningTime": 0,
                "numberOfRuns": 1
              }
            ],
            "number": 0,
            "numberOfRuns": 0
          },
          "interfaceView": {
            "success": 1,
            "failure": 0,
            "blocked": 0,
            "numberOfRuns": 1,
            "number": 1,
            "sumRunningTime": 1134.409132,
            "averageRunningTime": 1134.409132,
            "detail": [
              {
                "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9maWxlLXN0b3JhZ2UifQ==",
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "sumRunningTime": 1134.409132,
                "numberOfRuns": 1,
                "averageRunningTime": 1134.409132
              }
            ],
            "speedDistribution": {
              "500": 1
            }
          }
        },
        "children": [
          {
            "type": "case",
            "name": "问题复现",
            "statistics": {
              "caseView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "averageRunningTime": 1134.409132,
                "numberOfRuns": 1,
                "number": 1,
                "sumRunningTime": 1134.409132,
                "baseCaseNumber": 0,
                "baseCaseSuccessNumber": 0,
                "baseCaseFailureNumber": 0,
                "baseCaseBlockedNumber": 0
              },
              "stepView": {
                "success": 4,
                "failure": 0,
                "blocked": 0,
                "number": 4,
                "numberOfRuns": 4,
                "detail": [
                  {
                    "stepId": "4431089",
                    "averageRunningTime": 1134.409132,
                    "sumRunningTime": 1134.409132,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4431090",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4431091",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  },
                  {
                    "stepId": "4431093",
                    "averageRunningTime": 0,
                    "sumRunningTime": 0,
                    "numberOfRuns": 1
                  }
                ]
              },
              "interfaceView": {
                "success": 1,
                "failure": 0,
                "blocked": 0,
                "number": 1,
                "numberOfRuns": 1,
                "sumRunningTime": 1134.409132,
                "averageRunningTime": 1134.409132,
                "detail": [
                  {
                    "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9maWxlLXN0b3JhZ2UifQ==",
                    "success": 1,
                    "failure": 0,
                    "blocked": 0,
                    "averageRunningTime": 1134.409132,
                    "sumRunningTime": 1134.409132,
                    "numberOfRuns": 1
                  }
                ],
                "speedDistribution": {
                  "500": 1
                }
              }
            },
            "children": [],
            "caseId": "997224",
            "interfaceId": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9maWxlLXN0b3JhZ2UifQ==",
            "interfaceName": "我是最后一条",
            "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9maWxlLXN0b3JhZ2UifQ==",
            "uuid": "233e37ad-b03d-41aa-a54a-be54d9d38553"
          }
        ],
        "stepSignature": "eyJ0eXBlIjoic29hcGktcmVxdWVzdCIsInNvYXBpQXBwSWQiOjUzOTIsIm1ldGhvZCI6IlBPU1QiLCJwYXRobmFtZSI6Ii9maWxlLXN0b3JhZ2UifQ==",
        "uuid": "7a35885f-e64c-47df-b2b6-a68b32112c51"
      }
    ],
    "type": "dir",
    "uuid": "d94369c8-0941-4ee4-94a9-5d062f22efef"
  }
]

const columns  = [{
  title: '分组/接口名称',
  align: 'left',
  width: 300,
  fixed: 'left',
  treeColumnsName: 'children',
  rowSpan: (a, b) => a.interfaceId && b.interfaceId && a.interfaceId === b.interfaceId,
  render: (record) => record.interfaceName,
}, {
  title: '对应用例 / 用例执行次数',
  width: 300,
  render: (record) => record.statistics.caseView.numberOfRuns,
  filterName: 'name',
}, {
  title: '总数',
  group: '接口执行情况',
  width: 120,
  align: 'center',
  render: (record) => (
    <span>
      { record.statistics.interfaceView.success +
        record.statistics.interfaceView.failure +
        record.statistics.interfaceView.blocked }
    </span>
  ),
}, {
  title: '成功',
  group: '用例执行情况',
  align: 'center',
  width: 80,
  render: (record) => record.statistics.caseView.success,
}, {
  title: '失败',
  group: '用例执行情况',
  align: 'center',
  width: 80,
  render: (record) => record.statistics.caseView.failure,
}, {
  title: '受阻',
  group: '用例执行情况',
  align: 'center',
  width: 80,
  render: (record) => record.statistics.caseView.blocked,
}, {
  title: '接口速度（平均）',
  align: 'right',
  width: 160,
  render: (record) => record.statistics.interfaceView.averageRunningTime,
}]

const App: React.FC = () => (
  <>
    <div style={{
        height: 500,
        background: 'yellow',
        overflow: 'auto',
    }}>
      <Table
        bordered
        keygen='uuid'
        width={1500}
        columns={columns}
        data={data}
        bordered
        columnResizable
        verticalAlign="middle"
        // showTopScrollbar
        // virtual
        // rowsInView={0}
        sticky={{ top: 0, css: true }}
        defaultTreeExpandKeys={flattenArray(data).map((d) => d.uuid)}
      />
      {/* <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p> */}
    </div>
  </>
);

export default App;
