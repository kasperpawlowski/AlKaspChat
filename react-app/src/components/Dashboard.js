import React, {useState, useEffect} from 'react';
import DashboardNavigation from './DashboardNavigation';
import EventsTable from './EventsTable';
import HistoryTable from './HistoryTable';

const BACKEND_HOST = 'http://localhost:3001';

function Dashboard() {
    const logoutButtonContainerStyle = {
        width: '90vw',
        margin: 'auto auto 1vh auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right'
    }

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
        fetch(`${BACKEND_HOST}/dashboard/${selected}`).then(response => {
            return response.json();
        }).then(data => {
            if(data.error) throw new Error(data.error);
            if(selected === 'events') {
                setEvents(data);
            } else {
                setHistory(data);
            }
        }).catch(err => {
            alert(`Error: ${err.message}`);
        });
    }, [selected]);

    return (
        <>
            <div style={logoutButtonContainerStyle}>
                <button className="btn" onClick={() => window.history.back()}>GO BACK</button>
            </div>
            <DashboardNavigation selected={selected} handleSelected={handleSelected} />
            {selected === 'events' ? <EventsTable content={events}/> : <HistoryTable content={history}/>}
        </>
    );
}

export default Dashboard;