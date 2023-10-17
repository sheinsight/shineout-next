/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Collapse } from 'shineout';

export default () => {
  return (
    <div>
      <Collapse
        defaultActive={['1', '3']}
        style={{ maxWidth: 1180 }}
        triggerRegion='icon'
        expandContentPosition='left'
        border
        onChange={() => {
          console.log(1);
        }}
      >
        <Collapse.Item title='dads' name='0'>
          <Collapse style={{ maxWidth: 1180 }} triggerRegion='header' expandContentPosition='right'>
            <Collapse.Item title='Beijing Toutiao Technology Co., Ltd.' name='1' extra='hello'>
              Beijing Toutiao Technology Co., Ltd.
            </Collapse.Item>
          </Collapse>
        </Collapse.Item>
        <Collapse.Item title='Beijing Toutiao Technology Co., Ltd.' name='1' extra='hello'>
          Beijing Toutiao Technology Co., Ltd.
        </Collapse.Item>

        <Collapse.Item title='Introduce' name='2' disabled>
          is a content platform in China and around the world. Toutiao started out as a news
          recommendation engine and gradually evolved into a platform delivering content in various
          formats, such as texts, images, question-and-answer posts, microblogs, and videos.
        </Collapse.Item>

        <Collapse.Item title='The Underlying AI Technology' name='3'>
          artificial intelligence bot that writes news articles. The bot published 450 articles
          during the 15-day 2016 Summer Olympics in Rio de Janeiro. In general, Xiaomingbot
          published stories approximately two seconds after the event ended.
        </Collapse.Item>
      </Collapse>
    </div>
  );
};
