import React from 'react';
import ReactDataTable from 'react-data-table-component';
import { languageText } from '../utils/functions';

/**
 * DataTable wrapper, used to centralize the player groups basic configuration in the Croquet tournament.
 * This component is designed to fit this specific project preferences.
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
export default function TournamentDataTable(props) {

    const idColumn = props.rowid;

    const customStyles = {
        header: {
            style: {
                minHeight: '2rem'
            }
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '2px',
                borderTopColor: '#1f4293',

                borderRightStyle: 'solid',
                borderRightWidth: '2px',
                borderRightColor: '#1f4293',

                borderLeftStyle: 'solid',
                borderLeftWidth: '2px',
                borderLeftColor: '#1f4293',

                minHeight: '3rem'
            }
        },
        rows: {
            style: {
                borderStyle: 'solid',
                borderWidth: '2px',
                borderColor: '#1f4293',
                minHeight: '2.5rem'
            }
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '2px',
                    borderRightColor: '#1f4293'
                },
                ':first-of-type': {
                    minWidth: '12rem'
                }
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '2px',
                    borderRightColor: '#1f4293'
                },
                ':first-of-type': {
                    minWidth: '12rem'
                }
            }
        }
    };

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
        return columns;
    }

    return (
        <ReactDataTable
            columns={getColumns()}
            data={props.data}
            keyField={idColumn}
            customStyles={customStyles}
            highlightOnHover
            striped
            noDataComponent={languageText("No hay elementos que mostrar", "No elements to show")}
            fixedHeader={props.fixedHeader}
            fixedHeaderScrollHeight={props.fixedHeaderScrollHeight}
            pagination={props.pagination}
            paginationComponentOptions={{
                rowsPerPageText: languageText('Filas por página', 'Rows per page'),
                rangeSeparatorText: languageText('de', 'of')
            }}
            paginationPerPage={16}
            paginationRowsPerPageOptions={[16, 32, 64]}
            responsive={props.responsive}
            className={props.className}
        />
    );
}

TournamentDataTable.defaultProps = {
    rowid: "id",
    rowname: "name"
}
