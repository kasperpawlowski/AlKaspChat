import React, {useState} from 'react';
import '../index.css';
import '../App.css';

function DashboardNavigation(props) {
    const style = {
        background: 'var(--dark-color-a)',
        color: '#fff',
    }

    const [selected, setSelected] = useState(props.selected);

    const handleClick = (selected) => {
        setSelected(selected);
        props.handleSelected(selected);
    }

    return (
        <div className="dashboard-navigation">
            <button style={selected === 'events' ? style : {}} 
                    onClick={() => handleClick('events')}>
                    Event History
            </button>

            <button style={selected === 'history' ? style : {}} 
                    onClick={() => handleClick('history')}>
                    Chat History
            </button>
        </div>
    );
}

export default DashboardNavigation;