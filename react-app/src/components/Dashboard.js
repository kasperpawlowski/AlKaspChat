import React, {useState, useEffect} from 'react';
import DashboardNavigation from './DashboardNavigation';
import EventsTable from './EventsTable';
import HistoryTable from './HistoryTable';
import Button from './Button';
import cfg from '../cfg.json';

function Dashboard(props) {
    const [selected, setSelected] = useState('events');
    const [events, setEvents] = useState([]);
    const [history, setHistory] = useState([]);

    const handleSelected = (newSelected) => {
        if(selected === newSelected) return;

        if(newSelected === 'events') {
            setEvents([]);
        } else {
            setHistory([]);
        }
        setSelected(newSelected);
    }

    useEffect(() => {
        const timer = setTimeout(() => {alert(`${cfg.chatName} not responding`)}, 8000);

        fetch(`${cfg.backendHost}/dashboard/${selected}`).then(async (response) => {
            clearTimeout(timer);
            if(!response.ok) throw new Error(response.statusText);
            return response.json();
        }).then(data => {
            if(selected === 'events') setEvents(data);
            else setHistory(data);
        }).catch(err => {
            console.log(`Error: ${err.message}`);
        });
    }, [selected]);

    return (
        <>
            <div className="logout-button-container">
                <Button clickHandler={() => props.history.goBack()} text='GO BACK' />
            </div>
            <DashboardNavigation selected={selected} handleSelected={handleSelected} />
            {selected === 'events' ? 
            <EventsTable content={events}/> : 
            <HistoryTable content={history}/>}
        </>
    );
}

export default Dashboard;