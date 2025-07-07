"use client"

import{ useState } from 'react';
import Tab from './Tab';
import './Tabs.scss';

export interface TabsContainerDefinition {
    title: string;
    content: React.ReactNode;
    buttonClass: string; // Define a class for the tab button
    tabContainerClass: string; // Define a class for the tab container
}

interface TabsContainerProps {
    tabs: TabsContainerDefinition[];
    tabsContainerClass?: string; // Define a class for the tabs container
    tabContentContainer?: string; // Define a class for the area contains the tab content
}

const TabsContainer: React.FC<TabsContainerProps> = ({ tabs, tabsContainerClass, tabContentContainer }) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleSetActiveTab = (index: number) => {
        setActiveTab(index);
    }

    return (
        <div>
            {/* Tab bar */}
        {/* The className is optionally tabsContainerClass or it defaults to tabs-container from the tabs.scss */}
            <div className={tabsContainerClass ?? 'tabs-container'}>
                {
                    tabs.map((tab, index) => (
                        <div className={tab.tabContainerClass ?? 'tab-container'} key={index}>
                            <Tab 
                                title={tab.title}
                                tabNum={index}
                                handleSetActiveTab={handleSetActiveTab}
                                activeTab={activeTab}
                                buttonClass={tab.buttonClass ?? 'tab-button'}
                            />
                        </div>
                    ))
                }
            </div>
            {/* Tab content */}
            <div className={tabContentContainer ?? 'tab-content-container'}>
                {tabs[activeTab]?.content}
            </div>
        </div>
    );
};

export default TabsContainer