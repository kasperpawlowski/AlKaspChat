import React, {useState} from 'react';
import Button from './Button';

function DashboardNavigation(props) {
    const [selected, setSelected] = useState(props.selected);

    const handleClick = (selected) => {
        setSelected(selected);
        props.handleSelected(selected);
    }

    const style = {
        background: 'var(--dark-color-a)',
        color: '#fff',
    }

    return (
        <div className="dashboard-navigation">
            <Button style={selected === 'events' ? style : {}} 
                    clickHandler={() => handleClick('events')} 
                    text='Event History' />

            <Button style={selected === 'history' ? style : {}} 
                    clickHandler={() => handleClick('history')} 
                    text='Chat History' />
        </div>
    );
}

export default DashboardNavigation;