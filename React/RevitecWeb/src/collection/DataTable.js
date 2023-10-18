import React from 'react';
import ReactDataTable from 'react-data-table-component';

/**
 * DataTable wrapper, used to centralize the component basic configuration for the whole project.
 * Made following the officially recommend pattern: https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page#common-datatable-component
 * This component should be changed to fit each projects' preferences and then used in the entirety of the project.
 * Official documentation: https://react-data-table-component.netlify.app/?path=/story/getting-started-intro--page
 * 
 * Props:
 * - columns: see https://react-data-table-component.netlify.app/?path=/docs/api-columns--page#column-definitions-api
 * - data: Table is filled with this data.
 * - rowid: Key of a column with unique value, "id" by default.
 * - rowname: Key of a column that describes or identifies each row, can also be a function*.
 * - buttons: Buttons are fit in the last column, can also be a function*.
 * - pagination: boolean
 * - responsive: boolean
 * - fixedHeader: boolean
 * - fixedHeaderScrollHeight: string that indicates the height of the scroll bar
 * - defaultSortAsc: see https://react-data-table-component.netlify.app/?path=/docs/api-props--page#sorting
 * - defaultSortFieldId: see https://react-data-table-component.netlify.app/?path=/docs/api-props--page#sorting
 * - className: string
 * * Functions receive the row as a parameter, e.g.: (row) => row['somecolumn'].toLowerCase().
 */
export default function DataTable(props) {

    const idColumn = props.rowid;

    const getColumns = () => {
        // set each cell's content as its title so the full content shows on hover
        const columns = props.columns.map((column) => {
            const c = { ...column };
            c['format'] = row => {
                const content = column.format ? column.format(row) : column.selector(row);
                return (<span title={content}>{content}</span>);
            };
            return c;
        });
        // fit buttons in the last column with some row info
        if (props.buttons) {
            columns.push({
                name: "",
                selector: row => (
                    <div
                        rowid={row[idColumn]}
                        rowname={typeof props.rowname === 'function' ? props.rowname(row) : row[props.rowname]}
                        colname="buttons"
                        className="d-flex gap-1"
                        style={{ minWidth: "fit-content" }}>
                        {typeof props.buttons === 'function' ? props.buttons(row) : props.buttons}
                    </div>
                ),
                button: true
            });
        }
        return columns;
    }

    return (
        <ReactDataTable
            columns={getColumns()}
            data={props.data}
            keyField={idColumn}
            striped
            highlightOnHover
            noDataComponent="No hay elementos que mostrar"
            fixedHeader={props.fixedHeader}
            fixedHeaderScrollHeight={props.fixedHeaderScrollHeight}
            pagination={props.pagination}
            paginationComponentOptions={{
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de'
            }}
            paginationPerPage={30}
            paginationRowsPerPageOptions={[10, 15, 30, 50, 100]}
            defaultSortAsc={props.defaultSortAsc}
            defaultSortFieldId={props.defaultSortFieldId}
            responsive={props.responsive}
            className={props.className}
        />
    );
}

DataTable.defaultProps = {
    rowid: "id",
    rowname: "name"
}
