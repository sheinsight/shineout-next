import React, { useState } from 'react';
import classnames from 'classnames';
import { Tag, Badge } from 'shineout';
import useStyles from './diff-menu-style';

interface DiffMenuProps {
  selectedVersion: string;
  selectedComponent: string;
  onSelect: (version: string, component: string) => void;
}

// Organize diff reports by major version
interface VersionGroup {
  majorVersion: string;
  versions: {
    version: string;
    components: string[];
  }[];
}

const organizedDiffReports: VersionGroup[] = [
  {
    majorVersion: '3.7',
    versions: [
      { version: '3.7.6-beta.3', components: ['breadcrumb'] },
      { version: '3.7.5-beta.10', components: ['alert'] },
      { version: '3.7.3-beta.4', components: ['input'] },
      { version: '3.7.3-beta.1', components: ['input'] },
      { version: '3.7.0-beta.38', components: ['carousel'] },
      { version: '3.7.0-beta.37', components: ['carousel'] },
      { version: '3.7.0-beta.35', components: ['alert'] },
      { version: '3.7.0-beta.24', components: ['button'] },
    ],
  },
  {
    majorVersion: '3.6',
    versions: [
      { version: '3.6.1-beta.8', components: ['card'] },
      { version: '3.6.0', components: ['carousel', 'checkbox', 'input'] },
    ],
  },
  {
    majorVersion: '3.5',
    versions: [
      { version: '3.5.8', components: ['checkbox', 'input'] },
      { version: '3.5.7', components: ['input'] },
      { version: '3.5.6', components: ['checkbox'] },
      { version: '3.5.3', components: ['button'] },
      { version: '3.5.2', components: ['badge'] },
    ],
  },
  {
    majorVersion: '3.4',
    versions: [
      { version: '3.4.3', components: ['checkbox'] },
      { version: '3.4.0', components: ['carousel'] },
    ],
  },
  {
    majorVersion: '3.3',
    versions: [
      { version: '3.3.7', components: ['checkbox'] },
    ],
  },
  {
    majorVersion: '3.2',
    versions: [
      { version: '3.2.5', components: ['alert'] },
    ],
  },
  {
    majorVersion: '3.1',
    versions: [
      { version: '3.1.31', components: ['alert'] },
      { version: '3.1.30', components: ['button'] },
      { version: '3.1.23', components: ['card'] },
      { version: '3.1.16', components: ['card'] },
      { version: '3.1.10', components: ['card'] },
      { version: '3.1.2', components: ['button'] },
    ],
  },
  {
    majorVersion: '3.0',
    versions: [
      { version: '3.0.2', components: ['button'] },
    ],
  },
];

// Map specific version to components for easier lookup
const versionComponentMap: Record<string, string[]> = {
  '3.7.6-beta.3': ['breadcrumb'],
  '3.7.5-beta.10': ['alert'],
  '3.7.3-beta.4': ['input'],
  '3.7.3-beta.1': ['input'],
  '3.7.0-beta.38': ['carousel'],
  '3.7.0-beta.37': ['carousel'],
  '3.7.0-beta.35': ['alert'],
  '3.7.0-beta.24': ['button'],
  '3.6.1-beta.8': ['card'],
  '3.6.0': ['carousel', 'checkbox', 'input'],
  '3.5.8': ['checkbox', 'input'],
  '3.5.7': ['input'],
  '3.5.6': ['checkbox'],
  '3.5.3': ['button'],
  '3.5.2': ['badge'],
  '3.4.3': ['checkbox'],
  '3.4.0': ['carousel'],
  '3.3.7': ['checkbox'],
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
  const [expandedVersions, setExpandedVersions] = useState<string[]>([]);

  // Initialize expanded states based on selected version
  React.useEffect(() => {
    if (selectedVersion) {
      // Find which major version group contains the selected version
      const majorVersion = selectedVersion.split('.').slice(0, 2).join('.');
      setExpandedVersions([majorVersion]);
    }
  }, [selectedVersion]);

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
        {organizedDiffReports.map((versionGroup) => (
          <li key={versionGroup.majorVersion} className={classes.versionItem}>
            <div 
              className={classnames(classes.versionHeader, {
                [classes.expanded]: expandedVersions.includes(versionGroup.majorVersion),
              })}
              onClick={() => toggleVersion(versionGroup.majorVersion)}
            >
              <span className={classes.arrow}>▶</span>
              <span className={classes.versionName}>{versionGroup.majorVersion}.x</span>
              <Badge 
                count={versionGroup.versions.reduce((sum, v) => sum + v.components.length, 0)} 
                color="primary"
              />
            </div>
            {expandedVersions.includes(versionGroup.majorVersion) && (
              <ul className={classes.subVersionList}>
                {versionGroup.versions.map(versionInfo => (
                  <li key={versionInfo.version} className={classes.subVersionItem}>
                    <div className={classes.subVersionHeader}>
                      <Tag size="small" type={versionInfo.version.includes('beta') ? 'warning' : 'success'}>
                        {versionInfo.version}
                      </Tag>
                    </div>
                    <ul className={classes.componentList}>
                      {versionInfo.components.map(component => (
                        <li 
                          key={`${versionInfo.version}-${component}`}
                          className={classnames(classes.componentItem, {
                            [classes.active]: selectedVersion === versionInfo.version && selectedComponent === component,
                          })}
                          onClick={() => handleComponentClick(versionInfo.version, component)}
                        >
                          {component}
                        </li>
                      ))}
                    </ul>
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