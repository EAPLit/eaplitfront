"use client"

import{ useState } from 'react';
import Tab from './Tab';
import './Tabs.scss';

export interface TabsContainerDefinition {
    title: string;
    content: React.ReactNode;
}

interface TabsContainerProps {
    tabs: TabsContainerDefinition[];
}

const TabsContainer: React.FC<TabsContainerProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleSetActiveTab = (index: number) => {
        setActiveTab(index);
    }

    return (
        <div>
            {/* Tab bar */}
            <div className='tabs-container'>
                {
                    tabs.map((tab, index) => (
                        <div className='tab-container' key={index}>
                            <Tab 
                                title={tab.title}
                                tabNum={index}
                                handleSetActiveTab={handleSetActiveTab}
                                activeTab={activeTab}
                            />
                        </div>
                    ))
                }
            </div>
            {/* Tab content */}
            <div className='tab-area-container'>
                {tabs[activeTab]?.content}
            </div>
        </div>
    );
};

export default TabsContainer