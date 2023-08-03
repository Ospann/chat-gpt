import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activeTab = queryParams.get('chat');

    const getIndexFromActiveTab = () => {
        if (activeTab === 'tonality') return 1;
        if (activeTab === 'summary') return 2;
        if (activeTab === 'support') return 3;
        return 0;
    };

    const Redirect = (href) => {
        navigate(href);
    }

    return (
        <Tabs variant='enclosed' defaultIndex={getIndexFromActiveTab()}>
            <TabList className="header">
                <Tab onClick={() => Redirect("/")}>
                    Online Chat
                </Tab>
                <Tab onClick={() => Redirect("?chat=tonality")}>
                    Check Tonality
                </Tab>
                <Tab onClick={() => Redirect("?chat=summary")}>
                    Get summary
                </Tab>
                <Tab onClick={() => Redirect("?chat=support")}>
                    Support
                </Tab>
            </TabList>
        </Tabs>
    );
}

export default Header;
