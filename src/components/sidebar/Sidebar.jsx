import "./sidebar.css"
import {BlurOn, HighlightSharp, Timeline, DeveloperBoard, Home} from '@material-ui/icons';


export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboards</h3>
                    <ul className="ul sidebarList">
                        <li className="sidebarListItem active">
                            <Home className="sidebarIcon"/>
                            Home
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>
                            Registros
                        </li>
                        <li className="sidebarListItem">
                            <BlurOn className="sidebarIcon"/>
                            Sensores
                        </li>
                        <li className="sidebarListItem">
                            <HighlightSharp className="sidebarIcon"/>
                            Luces
                        </li>
                        <li className="sidebarListItem">
                            <DeveloperBoard className="sidebarIcon"/>
                            Actuadores
                        </li>
                    </ul>
                </div>
            </div>            
        </div>
    )
}
