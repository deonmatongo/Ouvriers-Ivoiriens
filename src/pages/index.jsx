import Layout from "./Layout.jsx";

import Home from "./Home";

import Workers from "./Workers";

import WorkerProfile from "./WorkerProfile";

import Categories from "./Categories";

import HowItWorks from "./HowItWorks";

import About from "./About";

import Dashboard from "./Dashboard";

import Messages from "./Messages";

import BecomeWorker from "./BecomeWorker";

import MyJobs from "./MyJobs";

import Settings from "./Settings";

import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Workers: Workers,
    
    WorkerProfile: WorkerProfile,
    
    Categories: Categories,
    
    HowItWorks: HowItWorks,
    
    About: About,
    
    Dashboard: Dashboard,
    
    Messages: Messages,
    
    BecomeWorker: BecomeWorker,
    
    MyJobs: MyJobs,
    
    Settings: Settings,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Workers" element={<Workers />} />
                
                <Route path="/WorkerProfile" element={<WorkerProfile />} />
                
                <Route path="/Categories" element={<Categories />} />
                
                <Route path="/HowItWorks" element={<HowItWorks />} />
                
                <Route path="/About" element={<About />} />
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Messages" element={<Messages />} />
                
                <Route path="/BecomeWorker" element={<BecomeWorker />} />
                
                <Route path="/MyJobs" element={<MyJobs />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                {/* Catch-all route - redirect to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}