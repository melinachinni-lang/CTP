import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Tabs({
  tabs,
  activeTab,
  onTabChange
}: TabsProps) {
  return (
    <div className="inline-flex bg-gray-100 rounded-full p-1 gap-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="px-6 py-2 rounded-full text-sm transition-all duration-200"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: isActive ? 500 : 400,
              color: isActive ? '#0A0A0A' : '#6B6B6B',
              backgroundColor: isActive ? '#FFFFFF' : 'transparent',
              boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}