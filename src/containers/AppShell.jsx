import { ManifestProvider } from '../context/articles/ManifestContext';
import React from 'react';
import Shell from '../components/shell/Shell/Shell';

/**
 * AppShell
 *
 * Stub container for the Shell component.
 *
 * Usage:
 * ```
 * <AppShell />
 * ```
 */
export default function AppShell(props) {
  return (
    <ManifestProvider>
      <Shell>
        {props.children}
      </Shell>
    </ManifestProvider>
  );
}
