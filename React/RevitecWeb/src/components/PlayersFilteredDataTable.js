import React from 'react';
import ReactDataTable from 'react-data-table-component';
import FilterComponent from "../collection/FilterComponent";

/**
 * DataTable wrapper, used to centralize the player groups basic configuration in the Croquet tournament.
 * This component is designed to filter Players data.
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

    // components needed for the filter
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = props.data.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );
    const subHeaderComponent = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

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
            data={filteredItems}
            keyField={idColumn}
            striped
            subHeader
            subHeaderComponent={subHeaderComponent}
            highlightOnHover
            noDataComponent="No hay jugadores que mostrar"
            fixedHeader={props.fixedHeader}
            fixedHeaderScrollHeight={props.fixedHeaderScrollHeight}
            pagination={props.pagination}
            paginationComponentOptions={{
                rowsPerPageText: 'Filas por página',
                rangeSeparatorText: 'de'
            }}
            paginationPerPage={32}
            paginationRowsPerPageOptions={[8, 16, 32, 48, 64]}
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
