import React, { useState } from 'react';
import classnames from 'classnames';
import useStyles from './diff-menu-style';

interface DiffMenuProps {
  selectedVersion: string;
  selectedComponent: string;
  onSelect: (version: string, component: string) => void;
}

// Static diff report data
const diffReports = {
  '3.7.6-beta.3': ['breadcrumb'],
  '3.7.5-beta.10': ['alert'],
  '3.7.0-beta.38': ['carousel'],
  '3.7.0-beta.37': ['carousel'],
  '3.7.0-beta.35': ['alert'],
  '3.7.0-beta.24': ['button'],
  '3.6.1-beta.8': ['card'],
  '3.6.0': ['carousel'],
  '3.5.3': ['button'],
  '3.5.2': ['badge'],
  '3.4.0': ['carousel'],
  '3.2.5': ['alert'],
  '3.1.31': ['alert'],
  '3.1.30': ['button'],
  '3.1.23': ['card'],
  '3.1.16': ['card'],
  '3.1.10': ['card'],
  '3.1.2': ['button'],
  '3.0.2': ['button'],
};

const DiffMenu: React.FC<DiffMenuProps> = ({ selectedVersion, selectedComponent, onSelect }) => {
  const classes = useStyles();
  const [expandedVersions, setExpandedVersions] = useState<string[]>([selectedVersion].filter(Boolean));

  const toggleVersion = (version: string) => {
    setExpandedVersions(prev => 
      prev.includes(version) 
        ? prev.filter(v => v !== version)
        : [...prev, version]
    );
  };

  const handleComponentClick = (version: string, component: string) => {
    onSelect(version, component);
  };

  return (
    <aside className={classes.menu}>
      <div className={classes.menuTitle}>Diff 报告</div>
      <ul className={classes.menuList}>
        {Object.entries(diffReports).map(([version, components]) => (
          <li key={version} className={classes.versionItem}>
            <div 
              className={classnames(classes.versionHeader, {
                [classes.expanded]: expandedVersions.includes(version),
                [classes.selected]: selectedVersion === version,
              })}
              onClick={() => toggleVersion(version)}
            >
              <span className={classes.arrow}>▶</span>
              <span className={classes.versionName}>{version}</span>
            </div>
            {expandedVersions.includes(version) && (
              <ul className={classes.componentList}>
                {components.map(component => (
                  <li 
                    key={component}
                    className={classnames(classes.componentItem, {
                      [classes.active]: selectedVersion === version && selectedComponent === component,
                    })}
                    onClick={() => handleComponentClick(version, component)}
                  >
                    {component}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DiffMenu;