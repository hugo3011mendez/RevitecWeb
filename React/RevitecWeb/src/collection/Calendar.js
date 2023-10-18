import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5 from '@fullcalendar/bootstrap5';
import esLocale from '@fullcalendar/core/locales/es';
import './Calendar.scss';

/**
 * Full calendar with some plugins and default settings.
 * Other props: See FullCalendar.
 */
export default function Calendar(props) {
    return <FullCalendar
        /* plugins */
        plugins={[dayGridPlugin, listPlugin, interactionPlugin, bootstrap5]}
        themeSystem="bootstrap5"
        /* lang */
        locale={esLocale}
        /* style */
        contentHeight="auto"
        fixedWeekCount={false}
        showNonCurrentDates={false}
        /* toolbars */
        footerToolbar={{
            center: 'dayGridMonth,listWeek,listDay'
        }}
        buttonText={{ listWeek: 'Semana', listDay: 'Día' }}
        /* title */
        views={{
            dayGridMonth: {
                titleFormat: { year: 'numeric', month: 'short' }
            },
            listWeek: {
                titleFormat: { year: '2-digit', month: 'short', day: 'numeric' }
            },
            listDay: {
                titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
            }
        }}
        {...props} />;
}

Calendar.defaultProps = {
    initialView: "listWeek",
    dayMaxEvents: 2
}
