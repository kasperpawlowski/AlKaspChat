import React, {useState, useEffect} from 'react';
import DashboardNavigation from './DashboardNavigation';
import EventsTable from './EventsTable';
import HistoryTable from './HistoryTable';
import '../App.css';

const BACKEND_HOST = 'http://localhost:3000';

function Dashboard() {
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
        fetch(`${BACKEND_HOST}/dashboard/${selected}`).then(async (response) => {
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
                <button className="btn" onClick={() => window.history.back()}>GO BACK</button>
            </div>
            <DashboardNavigation selected={selected} handleSelected={handleSelected} />
            {selected === 'events' ? <EventsTable content={events}/> : <HistoryTable content={history}/>}
        </>
    );
}

export default Dashboard;