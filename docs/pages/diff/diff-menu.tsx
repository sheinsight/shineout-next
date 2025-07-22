import React, { useState } from 'react';
import classnames from 'classnames';
import { Badge } from 'shineout';
import useStyles from './diff-menu-style';

interface DiffMenuProps {
  selectedVersion: string;
  selectedComponent: string;
  onSelect: (version: string, component: string) => void;
}

// Organize diff reports by major version
interface ComponentInfo {
  component: string;
}

interface VersionInfo {
  version: string;
  components: ComponentInfo[];
}

interface MinorVersionGroup {
  minorVersion: string;
  versions: VersionInfo[];
}

// Helper function to organize versions
function organizeVersions(versions: { version: string; components: string[] }[]): MinorVersionGroup[] {
  const grouped: Record<string, { version: string; components: string[] }[]> = {};
  
  versions.forEach(v => {
    const [major, minor] = v.version.split('.');
    const minorKey = `${major}.${minor}`;
    if (!grouped[minorKey]) {
      grouped[minorKey] = [];
    }
    grouped[minorKey].push(v);
  });
  
  return Object.entries(grouped)
    .sort((a, b) => {
      const [aMajor, aMinor] = a[0].split('.').map(Number);
      const [bMajor, bMinor] = b[0].split('.').map(Number);
      if (aMajor !== bMajor) return bMajor - aMajor;
      return bMinor - aMinor;
    })
    .map(([minorVersion, versions]) => {
      // Sort versions within each minor version group
      // Put non-beta versions first, then sort beta versions by number
      const sortedVersions = versions.sort((a, b) => {
        const aIsBeta = a.version.includes('beta');
        const bIsBeta = b.version.includes('beta');
        
        if (!aIsBeta && bIsBeta) return -1;
        if (aIsBeta && !bIsBeta) return 1;
        
        if (aIsBeta && bIsBeta) {
          const aBetaNum = parseInt(a.version.match(/beta\.(\d+)/)?.[1] || '0');
          const bBetaNum = parseInt(b.version.match(/beta\.(\d+)/)?.[1] || '0');
          return bBetaNum - aBetaNum;
        }
        
        return b.version.localeCompare(a.version);
      });
      
      return {
        minorVersion,
        versions: sortedVersions.map(v => ({
          version: v.version,
          components: v.components.map(c => ({ component: c }))
        }))
      };
    });
}

const rawVersionData = [
  // 3.7.x versions
  { version: '3.7.6-beta.3', components: ['breadcrumb'] },
  { version: '3.7.5-beta.10', components: ['alert'] },
  { version: '3.7.5-beta.5', components: ['date-picker'] },
  { version: '3.7.4-beta.6', components: ['date-picker'] },
  { version: '3.7.3-beta.4', components: ['input'] },
  { version: '3.7.3-beta.1', components: ['input'] },
  { version: '3.7.0-beta.38', components: ['carousel'] },
  { version: '3.7.0-beta.37', components: ['carousel'] },
  { version: '3.7.0-beta.35', components: ['alert'] },
  { version: '3.7.0-beta.24', components: ['button'] },
  // 3.6.x versions
  { version: '3.6.7-beta.6', components: ['date-picker'] },
  { version: '3.6.1-beta.8', components: ['card'] },
  { version: '3.6.0', components: ['carousel', 'checkbox', 'collapse', 'date-picker', 'input'] },
  { version: '3.6.0-beta.22', components: ['input'] },
  { version: '3.6.0-beta.1', components: ['carousel', 'checkbox'] },
  // 3.5.x versions
  { version: '3.5.8', components: ['checkbox', 'input'] },
  { version: '3.5.7', components: ['input'] },
  { version: '3.5.6', components: ['checkbox'] },
  { version: '3.5.3', components: ['button'] },
  { version: '3.5.2', components: ['badge'] },
  // 3.4.x versions
  { version: '3.4.3', components: ['checkbox'] },
  { version: '3.4.0', components: ['carousel', 'date-picker'] },
  // 3.3.x versions
  { version: '3.3.7', components: ['checkbox'] },
  // 3.2.x versions
  { version: '3.2.5', components: ['alert'] },
  // 3.1.x versions
  { version: '3.1.31', components: ['alert'] },
  { version: '3.1.30', components: ['button'] },
  { version: '3.1.23', components: ['card'] },
  { version: '3.1.16', components: ['card'] },
  { version: '3.1.10', components: ['card'] },
  { version: '3.1.2', components: ['button'] },
  // 3.0.x versions
  { version: '3.0.5', components: ['drawer'] },
  { version: '3.0.2', components: ['button'] },
];

// Organize data into hierarchical structure
const organizedDiffReports: MinorVersionGroup[] = organizeVersions(rawVersionData);

// Map specific version to components for easier lookup
const versionComponentMap: Record<string, string[]> = {
  '3.7.6-beta.3': ['breadcrumb'],
  '3.7.5-beta.10': ['alert'],
  '3.7.5-beta.5': ['date-picker'],
  '3.7.4-beta.6': ['date-picker'],
  '3.7.3-beta.4': ['input'],
  '3.7.3-beta.1': ['input'],
  '3.7.0-beta.38': ['carousel'],
  '3.7.0-beta.37': ['carousel'],
  '3.7.0-beta.35': ['alert'],
  '3.7.0-beta.24': ['button'],
  '3.6.7-beta.6': ['date-picker'],
  '3.6.1-beta.8': ['card'],
  '3.6.0': ['carousel', 'checkbox', 'collapse', 'date-picker', 'input'],
  '3.6.0-beta.22': ['input'],
  '3.6.0-beta.1': ['carousel', 'checkbox'],
  '3.5.8': ['checkbox', 'input'],
  '3.5.7': ['input'],
  '3.5.6': ['checkbox'],
  '3.5.3': ['button'],
  '3.5.2': ['badge'],
  '3.4.3': ['checkbox'],
  '3.4.0': ['carousel', 'date-picker'],
  '3.3.7': ['checkbox'],
  '3.2.5': ['alert'],
  '3.1.31': ['alert'],
  '3.1.30': ['button'],
  '3.1.23': ['card'],
  '3.1.16': ['card'],
  '3.1.10': ['card'],
  '3.1.2': ['button'],
  '3.0.5': ['drawer'],
  '3.0.2': ['button'],
};

const DiffMenu: React.FC<DiffMenuProps> = ({ selectedVersion, selectedComponent, onSelect }) => {
  const classes = useStyles();
  const [expandedMinorVersions, setExpandedMinorVersions] = useState<string[]>([]);
  const [expandedVersions, setExpandedVersions] = useState<string[]>([]);

  // Initialize expanded states based on selected version
  React.useEffect(() => {
    if (selectedVersion) {
      const [major, minor] = selectedVersion.split('.');
      const minorVersion = `${major}.${minor}`;
      
      setExpandedMinorVersions([minorVersion]);
      setExpandedVersions([selectedVersion]);
    }
  }, [selectedVersion]);

  const toggleMinorVersion = (version: string) => {
    setExpandedMinorVersions(prev => 
      prev.includes(version) 
        ? prev.filter(v => v !== version)
        : [...prev, version]
    );
  };

  const toggleVersion = (version: string) => {
    setExpandedVersions(prev => 
      prev.includes(version) 
        ? prev.filter(v => v !== version)
        : [...prev, version]
    );
  }

  const handleComponentClick = (version: string, component: string) => {
    onSelect(version, component);
  };

  return (
    <aside className={classes.menu}>
      <div className={classes.menuTitle}>Diff 报告</div>
      <ul className={classes.menuList}>
        {organizedDiffReports.map((minorGroup) => (
          <li key={minorGroup.minorVersion} className={classes.versionItem}>
            <div 
              className={classnames(classes.versionHeader, {
                [classes.expanded]: expandedMinorVersions.includes(minorGroup.minorVersion),
              })}
              onClick={() => toggleMinorVersion(minorGroup.minorVersion)}
            >
              <span className={classes.arrow}>▶</span>
              <span className={classes.versionName}>{minorGroup.minorVersion}</span>
              <Badge 
                count={minorGroup.versions.reduce((sum, v) => sum + v.components.length, 0)} 
                color="primary"
              />
            </div>
            {expandedMinorVersions.includes(minorGroup.minorVersion) && (
              <ul className={classes.subVersionList}>
                {minorGroup.versions.map(versionInfo => (
                  <li key={versionInfo.version} className={classes.subVersionItem}>
                    <div 
                      className={classnames(classes.subVersionHeader, {
                        [classes.expanded]: expandedVersions.includes(versionInfo.version),
                        [classes.hasMultiple]: versionInfo.components.length > 1,
                        [classes.isBeta]: versionInfo.version.includes('beta'),
                      })}
                      onClick={() => versionInfo.components.length > 1 && toggleVersion(versionInfo.version)}
                    >
                      {versionInfo.components.length > 1 && (
                        <span className={classes.subArrow}>▶</span>
                      )}
                      <span className={classes.subVersionName}>{versionInfo.version}</span>
                      {versionInfo.components.length > 1 && (
                        <Badge 
                          count={versionInfo.components.length} 
                          color={versionInfo.version.includes('beta') ? 'warning' : 'success'}
                        />
                      )}
                    </div>
                    {versionInfo.components.length === 1 ? (
                      <div 
                        className={classnames(classes.singleComponent, {
                          [classes.active]: selectedVersion === versionInfo.version && selectedComponent === versionInfo.components[0].component,
                        })}
                        onClick={() => handleComponentClick(versionInfo.version, versionInfo.components[0].component)}
                      >
                        {versionInfo.components[0].component}
                      </div>
                    ) : (
                      expandedVersions.includes(versionInfo.version) && (
                        <ul className={classes.componentList}>
                          {versionInfo.components.map(componentInfo => (
                            <li 
                              key={`${versionInfo.version}-${componentInfo.component}`}
                              className={classnames(classes.componentItem, {
                                [classes.active]: selectedVersion === versionInfo.version && selectedComponent === componentInfo.component,
                              })}
                              onClick={() => handleComponentClick(versionInfo.version, componentInfo.component)}
                            >
                              {componentInfo.component}
                            </li>
                          ))}
                        </ul>
                      )
                    )}
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