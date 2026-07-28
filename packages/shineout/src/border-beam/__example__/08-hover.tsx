/**
 * cn - 悬浮显示
 *    -- 仅在容器悬浮时显示流光
 * en - Show on hover
 *    -- Show the beam only while the container is hovered
 */
import React from 'react';
import { createUseStyles } from 'react-jss';
import { BorderBeam } from 'shineout';

const useStyle = createUseStyles(
  {
    host: {
      position: 'relative',
      width: 360,
      padding: 24,
      border: '1px solid var(--soui-neutral-border-1)',
      borderRadius: 8,
      background: 'var(--soui-neutral-fill-1)',
      color: 'var(--soui-neutral-text-5)',
      '& > $beam': {
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
      },
      '& > $beam::before': {
        animationPlayState: 'paused',
      },
      '&:hover > $beam': {
        opacity: 1,
      },
      '&:hover > $beam::before': {
        animationPlayState: 'running',
      },
    },
    beam: {},
  },
  { name: 'border-beam-hover-demo' },
);

export default () => {
  const classes = useStyle();

  return (
    <BorderBeam className={classes.beam}>
      <div className={classes.host}>
        <strong>Hover preview</strong>
        <p style={{ margin: '8px 0 0', color: 'var(--soui-neutral-text-4)' }}>
          The beam is visible while this container is hovered.
        </p>
      </div>
    </BorderBeam>
  );
};
