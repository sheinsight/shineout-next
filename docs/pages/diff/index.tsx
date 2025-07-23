import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import store from '../../theme/store';
import useStyles from './style';
import DiffMenu from './diff-menu';
import DiffContent from './diff-content';

const DiffPage: React.FC = () => {
  const classes = useStyles();
  const state = useSnapshot(store);
  const params = useParams<{ lan: string; version?: string; component?: string; pr?: string }>();
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [selectedComponent, setSelectedComponent] = useState<string>('');

  useEffect(() => {
    // Set initial selection from URL params
    if (params.version) setSelectedVersion(params.version);
    if (params.component) setSelectedComponent(params.component);
  }, [params]);

  const handleMenuSelect = (version: string, component: string) => {
    setSelectedVersion(version);
    setSelectedComponent(component);
    
    // Update URL
    const lan = state.locales || 'cn';
    const url = `#/${lan}/diff/${version}/${component}`;
    window.location.href = url;
  };

  return (
    <div className={classes.container}>
      <DiffMenu 
        selectedVersion={selectedVersion}
        selectedComponent={selectedComponent}
        onSelect={handleMenuSelect}
      />
      <div className={classes.content}>
        <DiffContent
          version={selectedVersion}
          component={selectedComponent}
        />
      </div>
    </div>
  );
};

export default DiffPage;