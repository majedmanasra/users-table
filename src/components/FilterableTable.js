import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import FilterableTableCell from "./FilterableTableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tableHeader: {
        fontStyle: theme.table.header.fontStyle,
        fontWeight: theme.table.header.fontWeight,
        fontSize: theme.table.header.fontSize,
        color: theme.table.header.color,
        letterSpacing: 1
    },
    tableTitle: {
        float: 'left',
        marginLeft: 15,
        marginTop: 15,
        color: "#252733",
        fontWeight: 'bold',
        fontSize: 19,
    },
    tableFilters: {
        float: 'right',
        marginBottom: 15,
        paddingTop: 5
    },
    filterField: {
        marginRight: 25
    },
    progress: {
        position: 'absolute',
        left: '50%',
        top: '50%',
    }
}));

function FilterableTable({schema, dataProviderFunc, dataFormatterFunc, totalCountOfData, hoverOverRows, onClick, title}) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState(schema.filters);
    const classes = useStyles();

    useEffect(() => {
        dataProviderFunc(page, rowsPerPage, filters).then(response => {
            setData(response.data.results.map(dataFormatterFunc));
        });
    }, [page, rowsPerPage, filters, dataProviderFunc, dataFormatterFunc]);


    let filterTimer = null;
    const changeFilter = (apiKey, searchText) => {
        filters.map(t => t.apiKey === apiKey && (t.searchText = searchText));

        clearTimeout(filterTimer);
        filterTimer = setTimeout(() => setFilters([...filters]), 1000);
    };

    return <TableContainer component={Paper}>
        <div className={classes.tableTitle}>
            {title}
        </div>
        <div className={classes.tableFilters}>
            {filters.map(t => <TextField
                className={classes.filterField}
                label={t.name}
                variant="outlined"
                onChange={(e) => changeFilter(t.apiKey, e.target.value)}/>)}
        </div>

        <Table>
            <TableHead>
                <TableRow>
                    {schema.fields.map(t => <TableCell>
                        <div className={classes.tableHeader}>{t.title}</div>
                    </TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                    <TableRow
                        hover={hoverOverRows}
                        onClick={() => onClick(row.id)}
                    >
                        {schema.fields.map(t => <TableCell>
                            <FilterableTableCell
                                thumbnail={row[t.field].thumbnail}
                                majorTextField={row[t.field].majorTextField}
                                minorTextField={row[t.field].minorTextField}
                            />
                        </TableCell>)}
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        count={totalCountOfData}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        rowsPerPageOptions={[8, 10, 20, 50]}
                        onChangeRowsPerPage={(e, rowsPerPage) => setRowsPerPage(rowsPerPage.props.value)}
                        onChangePage={(e, page) => setPage(page)}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>
}

export default FilterableTable;