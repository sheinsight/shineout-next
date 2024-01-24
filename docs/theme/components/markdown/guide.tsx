import React from 'react';
import classNames from 'classnames';
import store from '../../store';
import useStyles from '../style';
import { useSnapshot } from 'valtio';
import { Guides } from 'docs/types';
import Anchor from 'docs/theme/layout/desktop/anchor';

export interface GuideProps {
  guides: Guides;
}

const Guide = (props: GuideProps) => {
  const { guides } = props;
  const classes = useStyles();
  const state = useSnapshot(store);

  const anchors = guides[state.locales].map((i) => i.title);

  const renderIcon = (icon: string) => {
    if (icon === 'success') {
      return (
        <svg
          width='14'
          height='14'
          viewBox='0 0 14 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_1810_1612)'>
            <path
              d='M6.99998 13.4167C3.45615 13.4167 0.583313 10.5439 0.583313 7.00008C0.583313 3.45625 3.45615 0.583414 6.99998 0.583414C10.5438 0.583414 13.4166 3.45625 13.4166 7.00008C13.4166 10.5439 10.5438 13.4167 6.99998 13.4167ZM3.70015 8.06666L4.93676 9.30328C5.39296 9.75948 6.13212 9.75948 6.58833 9.30328L10.2998 5.59179C10.5275 5.3641 10.5275 4.99452 10.2998 4.76683C10.0721 4.53914 9.70254 4.53914 9.47485 4.76683L6.17585 8.06584C5.94775 8.29394 5.57734 8.29394 5.34924 8.06584L4.52511 7.24171C4.29742 7.01402 3.92784 7.01402 3.70015 7.24171C3.47246 7.46939 3.47246 7.83898 3.70015 8.06666Z'
              fill='#00A85F'
            />
          </g>
          <defs>
            <clipPath id='clip0_1810_1612'>
              <rect width='14' height='14' fill='white' />
            </clipPath>
          </defs>
        </svg>
      );
    }

    if (icon === 'warning') {
      return (
        <svg
          width='14'
          height='14'
          viewBox='0 0 14 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_1810_1619)'>
            <path
              d='M7 0.583374C3.45617 0.583374 0.583336 3.45621 0.583336 7.00004C0.583336 10.5439 3.45617 13.4167 7 13.4167C10.5438 13.4167 13.4167 10.5439 13.4167 7.00004C13.4167 3.45621 10.5438 0.583374 7 0.583374ZM7 9.33337C7.32217 9.33337 7.58334 9.59454 7.58334 9.91671C7.58334 10.2389 7.32217 10.5 7 10.5C6.67784 10.5 6.41667 10.2389 6.41667 9.91671C6.41667 9.59454 6.67784 9.33337 7 9.33337ZM7 2.91671C7.32217 2.91671 7.58334 3.17787 7.58334 3.50004V8.16671C7.58334 8.48887 7.32217 8.75004 7 8.75004C6.67784 8.75004 6.41667 8.48887 6.41667 8.16671V3.50004C6.41667 3.17787 6.67784 2.91671 7 2.91671Z'
              fill='#F56C0A'
            />
          </g>
          <defs>
            <clipPath id='clip0_1810_1619'>
              <rect width='14' height='14' fill='white' />
            </clipPath>
          </defs>
        </svg>
      );
    }
  };
  console.log(guides[state.locales]);
  return (
    <div className={classes.guide}>
      <div className='guides'>
        {guides[state.locales].map((guide, index) => {
          return (
            <div className='guide' key={index}>
              <h2
                className={classNames('title', 'anchor-title', index === 0 ? 'first' : '')}
                id={`guide-${guide.title}`}
              >
                {guide.title}
              </h2>
              {guide.paragraphs.map((p, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {p.paragraph &&
                      p.paragraph.split('\n').map((p, paragraph_idx) => {
                        return (
                          <p
                            key={paragraph_idx}
                            className={classNames(
                              classes.paragraph,
                              idx === 0 && classes.firstParagraph,
                            )}
                          >
                            {p}
                          </p>
                        );
                      })}
                    {p.image && p.image.length > 0 && (
                      <div className={classes.imageWrapper}>
                        {p.image.map((i, idx) => {
                          return (
                            <div key={idx} className={classes.imageContent}>
                              <img className={classes.image} src={i.image} alt='' />
                              {i.type && (
                                <div className={classes.imageType}>
                                  {renderIcon(i.type)}
                                  <span
                                    style={{ color: i.type === 'success' ? '#00A85F' : '#F56C0A' }}
                                  >
                                    {i.type === 'success' ? '推荐' : '慎用'}
                                  </span>
                                </div>
                              )}
                              {i.description && (
                                <div className={classes.imageDescription}>{i.description}</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className='anchor'>
        <Anchor anchorName='guide' data={anchors}></Anchor>
      </div>
    </div>
  );
};

export default Guide;
