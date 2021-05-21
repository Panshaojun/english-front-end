import Nav from './nav';
import Main from './main';
import './index.scss';

const Layout=()=>{
    return (
        <div id="layout">
            <div id="layout-top"></div>
            <div id="layout-nav">
                <Nav/>
            </div>
            <div id="layout-main">
                <Main/>
            </div>
        </div>
    )
}

export default Layout;