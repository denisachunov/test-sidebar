import React from 'react';
import { timestampToDate } from '../util';

export default props => (
    <div className="sidebar-list">
        {
            props.filterData.length ? (
                props.filterData.map ( el => {
                    const { time, date } = timestampToDate ( el.updated );
                    return (
                        <div key={el.id} className="sidebar-list-item">
                        <div className="name-type">
                            <div className="name">
                            {el.name}
                            </div>
                            <div className="type-location">
                            <span className="type">{el.type}</span>
                            <span className="location">{el.location}</span>
                            </div>
                        </div>
                        <div className="updated">
                            <div>{date}</div>
                            <div>{time}</div>
                        </div>
                        </div>
                    )
                })
            )
            : "No reports"
        }
    </div>
)