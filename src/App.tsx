import './App.scss';
import 'antd/dist/antd.css'
import React from "react";
import GalleryContainer from "./containers/GalleryContainer";

const App: React.FC = () => {
    return <div className="App">
        <GalleryContainer/>
    </div>;
};

export default App;
