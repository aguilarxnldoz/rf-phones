"use client";

import { Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 border border-white/10 w-full">
      <span className="text-sm font-medium text-gray-300 truncate mr-4">
        {url}
      </span>
      <button 
        onClick={handleCopy}
        className="text-primary hover:text-primary-dark transition-colors shrink-0"
        title="Copy link"
      >
        {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}
