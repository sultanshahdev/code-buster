import React from 'react';
import { CodeCraftMark } from './CodeCraftMark';

export function CodeCraftWordmark({ compact = false }: { compact?: boolean }) {
  return <span className="cc-wordmark"><CodeCraftMark size={compact ? 26 : 32} /><span>Code<b>Craft</b></span></span>;
}
