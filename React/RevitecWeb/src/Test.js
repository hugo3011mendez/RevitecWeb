import React from 'react';
import { useLoad } from './collection/Hooks';
import './Test.scss';
import { api } from './utils/api';
import { prettyPrint } from './utils/functions';

export default function Test(props) {
    const [data, reload] = useLoad(async () => await api(props.method, props.url, props.body));

    return <div className="p-4">
        {data && <pre className="json" dangerouslySetInnerHTML={{ __html: prettyPrint(data) }} />}
    </div>;
}
