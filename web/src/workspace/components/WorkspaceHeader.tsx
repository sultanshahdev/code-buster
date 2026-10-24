import React, { useEffect, useState } from 'react';
import { ArrowLeft, Folder, FolderGit2, Map, RefreshCw, Search, Sparkles } from 'lucide-react';
import { Button, Spinner } from '../../components/ui/Primitives';
import { CodeCraftWordmark } from '../../brand/CodeCraftWordmark';
import { type RepoStatus } from '../../api';

export type WorkspaceTab = 'overview' | 'search' | 'exact' | 'symbols' | 'map' | 'files';

interface WorkspaceHeaderProps {
  repoPath: string; onSetRepoPath: (value: string) => void; sourceType: 'local' | 'github'; onChangeSourceType: (type: 'local' | 'github') => void;
  onPrepareRepo: (refresh?: boolean) => void; repoLoading: boolean; repoError: string | null; repoStatus: RepoStatus | null; resolvedPath: string;
  activeTab: WorkspaceTab; onSelectTab: (tab: WorkspaceTab) => void; onReturnToLanding: () => void;
}

export function WorkspaceHeader(props: WorkspaceHeaderProps) {
  const { repoPath, onSetRepoPath, sourceType, onChangeSourceType, onPrepareRepo, repoLoading, repoError, repoStatus, resolvedPath, activeTab, onSelectTab, onReturnToLanding } = props;
  const [setupOpen, setSetupOpen] = useState(!repoStatus);
  useEffect(() => { setSetupOpen(!repoStatus); }, [repoStatus]);
  const ready = Boolean(repoStatus && resolvedPath);
  const active = (tab: 'search' | 'files' | 'map') => tab === 'files' ? activeTab === 'files' || activeTab === 'symbols' : activeTab === tab;
  return <header className="workspace-header-root cc-workspace-header">
    <div className="workspace-top-bar cc-workspace-topbar">
      <div className="workspace-brand-group"><button type="button" className="workspace-back-btn" onClick={onReturnToLanding} aria-label="Return to product page"><ArrowLeft size={15}/><span>Product</span></button><CodeCraftWordmark compact /></div>
      {ready && <button type="button" className="cc-repository-switcher" onClick={() => setSetupOpen(value => !value)}><FolderGit2 size={15}/><span>{resolvedPath.split('/').pop() || resolvedPath}</span><i>Ready</i></button>}
      <div className="workspace-top-actions">{ready && sourceType === 'github' && <Button variant="ghost" size="sm" onClick={() => onPrepareRepo(true)} disabled={repoLoading} icon={repoLoading ? <Spinner size={13}/> : <RefreshCw size={13}/>}>Refresh</Button>}{ready && <button type="button" className="workspace-toggle-prep-btn" onClick={() => setSetupOpen(value => !value)}>Switch repository</button>}</div>
    </div>
    {setupOpen && <div className={`cc-repository-setup ${!ready ? 'cc-repository-setup--hero' : ''}`}>
      <div className="cc-setup-inner">
        {!ready && <div className="cc-setup-intro"><span><Sparkles size={14}/> Start an investigation</span><strong>Open a repository. Find the implementation. Follow the evidence.</strong></div>}
        <div className="prep-type-toggle" role="group" aria-label="Repository Source Type"><button type="button" className={`prep-type-btn ${sourceType === 'github' ? 'prep-type-btn--active' : ''}`} onClick={() => onChangeSourceType('github')}>GitHub repository</button><button type="button" className={`prep-type-btn ${sourceType === 'local' ? 'prep-type-btn--active' : ''}`} onClick={() => onChangeSourceType('local')}>Local repository</button></div>
        <div className="prep-input-row"><input type="text" className="prep-input-field" placeholder={sourceType === 'github' ? 'https://github.com/owner/repository' : 'Path to a local repository'} value={repoPath} onChange={e => onSetRepoPath(e.target.value)} onKeyDown={e => e.key === 'Enter' && onPrepareRepo(false)} aria-label={sourceType === 'github' ? 'Public GitHub repository URL' : 'Repository path'} spellCheck={false}/><Button variant="primary" size="md" onClick={() => onPrepareRepo(false)} disabled={repoLoading || !repoPath.trim()} icon={repoLoading ? <Spinner size={15}/> : <Search size={15}/>}>{repoLoading ? 'Preparing repository…' : ready ? 'Open repository' : 'Explore repository'}</Button></div>
        {sourceType === 'local' && !ready && <p className="cc-local-note">Local folders are available when CodeCraft is running on your machine.</p>}
        {repoError && <div className="prep-error-banner" role="alert">{repoError}<button onClick={() => onPrepareRepo(false)}>Retry</button></div>}
      </div>
    </div>}
    {ready && <nav className="workspace-mode-nav cc-workspace-nav" aria-label="Workspace navigation"><button className={active('search') ? 'is-active' : ''} onClick={() => onSelectTab('search')}><Search size={15}/>Search</button><button className={active('files') ? 'is-active' : ''} onClick={() => onSelectTab('files')}><Folder size={15}/>Explore</button><button className={active('map') ? 'is-active' : ''} onClick={() => onSelectTab('map')}><Map size={15}/>Map</button></nav>}
  </header>;
}
