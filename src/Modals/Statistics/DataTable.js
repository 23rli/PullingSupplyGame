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
  { id: 'rConRes', label: 'R', minWidth: 35 },
  { id: 'yConRes', label: 'Y', minWidth: 35 },
  { id: 'bConRes', label: 'B', minWidth: 35 },
  { id: 'unusedR', label: 'R', minWidth: 35 },
  { id: 'unusedY', label: 'Y', minWidth: 35 },
  { id: 'unusedB', label: 'B', minWidth: 35 }
];
//Add a piece to make zeros null;

function cleanData(value){
  if(value != 0 ){
    return value;
  }
  return null;
}
function produceData( longMemory, i) {
  let data = longMemory.storage[i].locationData();
  let roundNum = i;
  let mBlue = cleanData(data[0]);
  let mGreen = cleanData(data[1]);
  let aBlue = cleanData(data[2]);
  let aGreen = cleanData(data[3]);
  let qBlue = cleanData(data[4]);
  let qGreen = cleanData(data[5]);
  let pBlue = cleanData(data[6]);
  let pGreen = cleanData(data[7]);
  let dBlue = cleanData(data[8]);
  let dGreen = cleanData(data[9]);
  let WIP = cleanData(data.slice(0, 10).reduce((a, b) => a + b, 0));
  let doneBlue = cleanData(data[10]);;
  let doneGreen = cleanData(data[11]);;

  const resources = longMemory.storage[i].roundResources;
  const conResources = longMemory.storage[i].conResources;
  const unusedRes = longMemory.storage[i].endResources;

  let rRes = resources[0];
  let yRes = resources[1];
  let bRes = resources[2];
  let rConRes = conResources[0];
  let yConRes = conResources[1];
  let bConRes = conResources[2];
  let unusedR = unusedRes[0];
  let unusedY = unusedRes[1];
  let unusedB = unusedRes[2];

  return {
    roundNum, mBlue, mGreen, aBlue, aGreen, qBlue, qGreen, pBlue, pGreen, dBlue, dGreen,
    WIP, doneBlue, doneGreen, rRes, yRes, bRes, rConRes, yConRes, bConRes, unusedR, unusedY, unusedB
  };
}

function produceTableInfo({longMemory}) {
  let info = [];
  console.log(longMemory)
  for (let i = 0; i < longMemory.storage.length; i++) {
    info.push(produceData(longMemory, i));
  }
  return info;
}

export default function GameDataTable({ roundManager, longMemory }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let info = produceTableInfo({longMemory});

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '90%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={1} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Manufacturing</TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Assembly</TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Quality</TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Paint</TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Dry</TableCell>
              <TableCell align="left" colSpan={1} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
              <TableCell align="left" colSpan={2} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Done</TableCell>
              <TableCell align="left" colSpan={3} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Resources</TableCell>
              <TableCell align="left" colSpan={3} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Converted Resources</TableCell>
              <TableCell align="left" colSpan={3} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Unused Resources</TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}
                >
                  {column.label}
                  <Divider orientation="vertical" flexItem />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {info.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.roundNum}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[12, 24, 48]}
        component="div"
        count={info.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
