import React, { useState } from 'react';
import classnames from 'classnames';
import useStyles from './diff-menu-style';

interface DiffMenuProps {
  selectedVersion: string;
  selectedComponent: string;
  onSelect: (version: string, component: string) => void;
}

// Organize diff reports by version type
interface VersionGroup {
  version: string;
  components: string[];
  betaVersions?: {
    version: string;
    components: string[];
  }[];
}

const organizedDiffReports: VersionGroup[] = [
  {
    version: '3.7',
    components: [],
    betaVersions: [
      { version: '3.7.6-beta.3', components: ['breadcrumb'] },
      { version: '3.7.5-beta.10', components: ['alert'] },
      { version: '3.7.0-beta.38', components: ['carousel'] },
      { version: '3.7.0-beta.37', components: ['carousel'] },
      { version: '3.7.0-beta.35', components: ['alert'] },
      { version: '3.7.0-beta.24', components: ['button'] },
    ],
  },
  {
    version: '3.6',
    components: ['carousel'],
    betaVersions: [
      { version: '3.6.1-beta.8', components: ['card'] },
    ],
  },
  {
    version: '3.5',
    components: ['button', 'badge'],
    betaVersions: [],
  },
  {
    version: '3.4',
    components: ['carousel'],
    betaVersions: [],
  },
  {
    version: '3.2',
    components: ['alert'],
    betaVersions: [],
  },
  {
    version: '3.1',
    components: ['alert', 'button', 'card'],
    betaVersions: [],
  },
  {
    version: '3.0',
    components: ['button'],
    betaVersions: [],
  },
];

// Map specific version to components for easier lookup
const versionComponentMap: Record<string, string[]> = {
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
  const [expandedVersions, setExpandedVersions] = useState<string[]>([]);
  const [expandedBetaGroups, setExpandedBetaGroups] = useState<string[]>([]);

  // Initialize expanded states based on selected version
  React.useEffect(() => {
    if (selectedVersion) {
      // Find which major version group contains the selected version
      const majorVersion = selectedVersion.split('.').slice(0, 2).join('.');
      setExpandedVersions([majorVersion]);
      
      // If it's a beta version, expand the beta group
      if (selectedVersion.includes('beta')) {
        setExpandedBetaGroups([majorVersion]);
      }
    }
  }, [selectedVersion]);

  const toggleVersion = (version: string) => {
    setExpandedVersions(prev => 
      prev.includes(version) 
        ? prev.filter(v => v !== version)
        : [...prev, version]
    );
  };

  const toggleBetaGroup = (majorVersion: string) => {
    setExpandedBetaGroups(prev => 
      prev.includes(majorVersion) 
        ? prev.filter(v => v !== majorVersion)
        : [...prev, majorVersion]
    );
  };

  const handleComponentClick = (version: string, component: string) => {
    onSelect(version, component);
  };

  // Helper to get actual version for stable releases
  const getStableVersion = (majorVersion: string, component: string): string => {
    // Find the most recent stable version for this component
    const stableVersions = Object.entries(versionComponentMap)
      .filter(([v, comps]) => !v.includes('beta') && v.startsWith(majorVersion) && comps.includes(component))
      .sort(([a], [b]) => b.localeCompare(a, undefined, { numeric: true }));
    
    return stableVersions.length > 0 ? stableVersions[0][0] : `${majorVersion}.0`;
  };

  const renderComponent = (version: string, component: string) => (
    <li 
      key={`${version}-${component}`}
      className={classnames(classes.componentItem, {
        [classes.active]: selectedVersion === version && selectedComponent === component,
      })}
      onClick={() => handleComponentClick(version, component)}
    >
      {component}
    </li>
  );

  return (
    <aside className={classes.menu}>
      <div className={classes.menuTitle}>Diff 报告</div>
      <ul className={classes.menuList}>
        {organizedDiffReports.map((versionGroup) => (
          <li key={versionGroup.version} className={classes.versionItem}>
            <div 
              className={classnames(classes.versionHeader, {
                [classes.expanded]: expandedVersions.includes(versionGroup.version),
              })}
              onClick={() => toggleVersion(versionGroup.version)}
            >
              <span className={classes.arrow}>▶</span>
              <span className={classes.versionName}>{versionGroup.version}.x</span>
            </div>
            {expandedVersions.includes(versionGroup.version) && (
              <ul className={classes.subVersionList}>
                {/* Render stable version components */}
                {versionGroup.components.length > 0 && (
                  <li className={classes.stableVersionItem}>
                    <div className={classes.stableVersionHeader}>正式版</div>
                    <ul className={classes.componentList}>
                      {versionGroup.components.map(component => 
                        renderComponent(getStableVersion(versionGroup.version, component), component)
                      )}
                    </ul>
                  </li>
                )}
                
                {/* Render beta versions */}
                {versionGroup.betaVersions && versionGroup.betaVersions.length > 0 && (
                  <li className={classes.betaGroupItem}>
                    <div 
                      className={classnames(classes.betaGroupHeader, {
                        [classes.expanded]: expandedBetaGroups.includes(versionGroup.version),
                      })}
                      onClick={() => toggleBetaGroup(versionGroup.version)}
                    >
                      <span className={classes.arrow}>▶</span>
                      <span>Beta 版本</span>
                    </div>
                    {expandedBetaGroups.includes(versionGroup.version) && (
                      <ul className={classes.betaVersionList}>
                        {versionGroup.betaVersions.map(betaVersion => (
                          <li key={betaVersion.version} className={classes.betaVersionItem}>
                            <div className={classes.betaVersionHeader}>
                              {betaVersion.version}
                            </div>
                            <ul className={classes.componentList}>
                              {betaVersion.components.map(component => 
                                renderComponent(betaVersion.version, component)
                              )}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DiffMenu;