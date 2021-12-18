import React from 'react'
import "./topbar.css"
import {NotificationsNone, Settings} from '@material-ui/icons';


export default function Topbar() {
    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topleft">
                    <span className="logo">Ginger</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings/>
                    </div>
                    <img src="https://www.thespruce.com/thmb/dMLGK29bbfT5hbqFCvHzAMqUxXM=/1600x1600/smart/filters:no_upscale()/flowering-ginger-plants-1315760-hero-a160485cbcbd4b27857b00423f9fa0de.jpg" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
