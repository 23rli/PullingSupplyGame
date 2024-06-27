import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';

const columns = [
  { id: 'roundNum', label: 'Round', minWidth: 60 },

  { id: 'mBlue', label: 'B', minWidth: 35 },
  { id: 'mGreen', label: 'G', minWidth: 35 },

  { id: 'aBlue', label: 'B', minWidth: 35 },
  { id: 'aGreen', label: 'G', minWidth: 35 },

  { id: 'qBlue', label: 'B', minWidth: 35 },
  { id: 'qGreen', label: 'G', minWidth: 35 },

  { id: 'pBlue', label: 'B', minWidth: 35 },
  { id: 'pGreen', label: 'G', minWidth: 35 },

  { id: 'dBlue', label: 'B', minWidth: 35 },
  { id: 'dGreen', label: 'G', minWidth: 35 },

  { id: 'WIP', label: 'WIP', minWidth: 60 },

  { id: 'doneBlue', label: 'B', minWidth: 35 },
  { id: 'doneGreen', label: 'G', minWidth: 35 },

  { id: 'rRes', label: 'R', minWidth: 35 },
  { id: 'yRes', label: 'Y', minWidth: 35 },
  { id: 'bRes', label: 'B', minWidth: 35 },
  { id: 'unusedR', label: 'R', minWidth: 35 },
  { id: 'unusedY', label: 'Y', minWidth: 35 },
  { id: 'unusedB', label: 'B', minWidth: 35 },

  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function GameDataTable({roundManager}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '90%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={1} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
              </TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                Manufacturing
              </TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                Assembly
              </TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                Quality
              </TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                Paint
              </TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                Dry
              </TableCell>
              <TableCell align="left" colSpan={1} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                
              </TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                Done
              </TableCell>
              <TableCell align="left" colSpan={3} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                Resources
              </TableCell>
              <TableCell align="left" colSpan={3} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                Unused Resources
              </TableCell>
              
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}
                >
                  {column.label}
                  <Divider orientation="vertical" flexItem />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)'}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[12, 24, 48]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
