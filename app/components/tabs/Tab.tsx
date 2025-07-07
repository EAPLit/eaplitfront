"use client"
import './Tabs.scss';

interface TabProps {
    title: string;
    tabNum: number;
    handleSetActiveTab: (tabNum: number) => void;
    activeTab: number;
    buttonClass?: string;
}

const Tab: React.FC<TabProps> = ({ title, tabNum, handleSetActiveTab, activeTab, buttonClass }) => {
    const isActive = tabNum === activeTab;

    return(
        <button
            className={`${buttonClass} ${isActive ? 'active' : ''}`}
            onClick={() => handleSetActiveTab(tabNum)}
            aria-label={`Switch to ${title} tab`}
        >
            {title}
        </button>
    );
};

export default Tab;