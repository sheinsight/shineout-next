import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Badge, Spin, Alert } from 'shineout';
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

const DiffMenu: React.FC<DiffMenuProps> = ({ selectedVersion, selectedComponent, onSelect }) => {
  const classes = useStyles();
  const [expandedMinorVersions, setExpandedMinorVersions] = useState<string[]>([]);
  const [expandedVersions, setExpandedVersions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [organizedDiffReports, setOrganizedDiffReports] = useState<MinorVersionGroup[]>([]);

  // Fetch diff reports from API
  useEffect(() => {
    const fetchDiffReports = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/diff-reports');
        if (!response.ok) {
          throw new Error(`Failed to fetch diff reports: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Organize the data
        const organized = organizeVersions(data.menu);
        setOrganizedDiffReports(organized);
      } catch (err) {
        console.error('Error fetching diff reports:', err);
        setError(err instanceof Error ? err.message : 'Failed to load diff reports');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDiffReports();
  }, []);

  // Initialize expanded states based on selected version
  useEffect(() => {
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

  if (loading) {
    return (
      <aside className={classes.menu}>
        <div className={classes.menuTitle}>Diff 报告</div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Spin size={24} tip="加载中..." />
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className={classes.menu}>
        <div className={classes.menuTitle}>Diff 报告</div>
        <div style={{ padding: '20px' }}>
          <Alert type="error">
            {error}
          </Alert>
        </div>
      </aside>
    );
  }

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