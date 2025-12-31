import React from 'react';
import clsx from 'clsx';
import store from '../../store';
import useStyles from '../style';
import { useSnapshot } from 'valtio';
import { Guides } from 'docs/types';
import { icons } from 'shineout';
import Anchor from 'docs/theme/layout/desktop/anchor';

export interface GuideProps {
  guides: Guides;
}

const Guide = (props: GuideProps) => {
  const { guides } = props;
  const classes = useStyles();
  const state = useSnapshot(store);

  const anchors = guides[state.locales].map((i) => i.title);

  const getDescription = (str: string) => {
    const regex = /\{[^}]*\}/g;
    return str.replace(regex, '');
  };

  const parseStringToObject = (str?: string) => {
    if (!str) return {};
    if (str.startsWith('{') && str.endsWith('}')) {
      const content = str.slice(1, -1).trim();
      const [key, value] = content.split(':').map((s) => s.trim());
      const obj: any = {};
      obj[key] = isNaN(value as any) ? value : parseInt(value, 10);
      return obj;
    }
    throw new Error('Invalid input string format');
  };

  const getImageCss = (str: string) => {
    const regex = /\{[^}]*\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(str)) !== null) {
      matches.push(match[0]);
    }

    return matches;
  };

  const renderIcon = (icon: string) => {
    if (icon === 'success') {
      return (
        <div className={clsx(classes.guideIcon, classes.guideIconSuccess)}>
          <svg viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'>
            <g clipPath='url(#clip0_1810_1612)'>
              <path d='M6.99998 13.4167C3.45615 13.4167 0.583313 10.5439 0.583313 7.00008C0.583313 3.45625 3.45615 0.583414 6.99998 0.583414C10.5438 0.583414 13.4166 3.45625 13.4166 7.00008C13.4166 10.5439 10.5438 13.4167 6.99998 13.4167ZM3.70015 8.06666L4.93676 9.30328C5.39296 9.75948 6.13212 9.75948 6.58833 9.30328L10.2998 5.59179C10.5275 5.3641 10.5275 4.99452 10.2998 4.76683C10.0721 4.53914 9.70254 4.53914 9.47485 4.76683L6.17585 8.06584C5.94775 8.29394 5.57734 8.29394 5.34924 8.06584L4.52511 7.24171C4.29742 7.01402 3.92784 7.01402 3.70015 7.24171C3.47246 7.46939 3.47246 7.83898 3.70015 8.06666Z' />
            </g>
            <defs>
              <clipPath id='clip0_1810_1612'>
                <rect width='14' height='14' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </div>
      );
    }

    if (icon === 'warning') {
      return (
        <div className={clsx(classes.guideIcon, classes.guideIconWarning)}>
          {icons.WarningCircleFill}
        </div>
      );
    }
  };

  return (
    <div className={classes.guide}>
      <div className='guides'>
        {guides[state.locales].map((guide, index) => {
          return (
            <div className='guide' key={index}>
              <h2
                className={clsx('title', 'anchor-title', index === 0 ? 'first' : '')}
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
                            className={clsx(
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
                          const description = getDescription(i.description);
                          const type = getDescription(i.type || '');
                          const imageCss = Object.assign(
                            parseStringToObject(getImageCss(i.description)[0]),
                            parseStringToObject(getImageCss(i.type || '')[0]),
                          );

                          return (
                            <div key={idx} className={classes.imageContent}>
                              <img
                                style={imageCss}
                                className={classes.image}
                                src={i.image}
                                alt=''
                              />
                              {type && (
                                <div className={classes.imageType}>
                                  {renderIcon(type)}
                                  <span
                                    style={{ color: type === 'success' ? '#00A85F' : '#F56C0A' }}
                                  >
                                    {type === 'success'
                                      ? state.locales === 'cn'
                                        ? '推荐'
                                        : 'Recommended'
                                      : state.locales === 'cn'
                                      ? '慎用'
                                      : 'Not Recommended'}
                                  </span>
                                </div>
                              )}
                              {description && (
                                <div className={classes.imageDescription}>{description}</div>
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
