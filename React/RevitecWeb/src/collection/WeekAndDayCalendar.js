import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5 from '@fullcalendar/bootstrap5';
import './Calendar.scss';

/**
 * Week and Day Calendar with some plugins and default settings.
 * Other props: See FullCalendar.
 */
export default function Calendar(props) {
    return <FullCalendar
        /* plugins */
        plugins={[dayGridPlugin, listPlugin, interactionPlugin, bootstrap5]}
        themeSystem="bootstrap5"
        /* lang */
        locale={props.locale}
        /* style */
        contentHeight="auto"
        fixedWeekCount={false}
        showNonCurrentDates={false}
        /* toolbars */
        footerToolbar={{
            center: 'listWeek,listDay'
        }}
        buttonText={ props.locale.code == 'es' ?
            { listWeek: props.locale.buttonText.week, listDay: props.locale.buttonText.day }
            : { listWeek: 'Week', listDay: 'Day' }
        }
        /* title */
        views={{
            listWeek: {
                titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
            },
            listDay: {
                titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
            }
        }}
        {...props} />;
}

Calendar.defaultProps = {
    initialView: "listDay",
    dayMaxEvents: 2
}
