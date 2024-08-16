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
import Button from '@mui/material/Button';
import { writeFile, utils } from 'xlsx';

const template = [
  { id: 'roundNum', label: 'Round', minWidth: 60 },
];

const resources = [
  { id: 'revenue', label: 'Revenue', minWidth: 35 },
  { id: 'rRes', label: 'R', minWidth: 35 },
  { id: 'yRes', label: 'Y', minWidth: 35 },
  { id: 'bRes', label: 'B', minWidth: 35 },
  { id: 'rConRes', label: 'R', minWidth: 35 },
  { id: 'yConRes', label: 'Y', minWidth: 35 },
  { id: 'bConRes', label: 'B', minWidth: 35 },
  { id: 'unusedR', label: 'R', minWidth: 35 },
  { id: 'unusedY', label: 'Y', minWidth: 35 },
  { id: 'unusedB', label: 'B', minWidth: 35 }]

function setColumns({roundManager}){
  let columns = [];
  columns.push(...template)
  const labels = ["m", "a", "q", "p", "d", "done"]
  const type = ['Blue', "Green", "Red", "Yellow"]
  for(let i = 0; i < labels.length; i++){
    if(roundManager.startB != -1){
      columns.push({ id: labels[i] + type[0], label: type[0], minWidth: 35})
    }
    if(roundManager.startG != -1){
      columns.push({ id: labels[i] + type[1], label: type[1], minWidth: 35})

    }
    if(roundManager.startR != -1){
      columns.push({ id: labels[i] + type[2], label: type[2], minWidth: 35})

    }
    if(roundManager.startY != -1){
      columns.push({ id: labels[i] + type[3], label: type[3], minWidth: 35})
    } 
    if(i === 4){
      columns.push({ id: 'WIP', label: 'WIP', minWidth: 60 })
    }
  }
  columns.push(...resources)

  return columns
}

function cleanData(value){
  if(value !== 0 ){
    return value;
  }
  return null;
}

function produceData({longMemory, roundManager, i}) {
  console.log(longMemory)
  let data = longMemory.storage[i].locationData();
  let roundNum = i;
  let mBlue = cleanData(data[0]);
  let mGreen = cleanData(data[1]);
  let mRed = cleanData(data[2]);
  let mYellow = cleanData(data[3]);
  let aBlue = cleanData(data[4]);
  let aGreen = cleanData(data[5]);
  let aRed = cleanData(data[6]);
  let aYellow = cleanData(data[7]);
  let qBlue = cleanData(data[8]);
  let qGreen = cleanData(data[9]);
  let qRed = cleanData(data[10]);
  let qYellow = cleanData(data[11]);
  let pBlue = cleanData(data[12]);
  let pGreen = cleanData(data[13]);
  let pRed = cleanData(data[14]);
  let pYellow = cleanData(data[15]);
  let dBlue = cleanData(data[16]);
  let dGreen = cleanData(data[17]);
  let dRed = cleanData(data[18]);
  let dYellow = cleanData(data[19]);
  let WIP = cleanData(data.slice(0, 19).reduce((a, b) => a + b, 0));
  let doneBlue = cleanData(data[20]);
  let doneGreen = cleanData(data[21]);
  let doneRed = cleanData(data[22]);
  let doneYellow = cleanData(data[23]);
  let revenue = doneBlue * roundManager.revenueB + doneGreen * roundManager.revenueG
   + doneRed * roundManager.revenueR + doneYellow * roundManager.revenueY; 

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
    roundNum, mBlue, mGreen, mRed, mYellow, aBlue, aGreen, aRed, aYellow,
     qBlue, qGreen, qRed, qYellow, pBlue, pGreen, pRed, pYellow, 
     dBlue, dGreen, dRed, dYellow, WIP, doneBlue, doneGreen, doneRed, doneYellow,
      revenue, rRes, yRes, bRes, rConRes, yConRes, bConRes, unusedR, unusedY, unusedB
  };
}
 const columnSpan = ({roundManager}) => {
  console.log(roundManager)
  let count = 0;
  if(roundManager.startB != -1){
    count += 1;
  }
  if(roundManager.startG != -1){
    count += 1;
  }
  if(roundManager.startR != -1){
    count += 1;
  }
  if(roundManager.startY != -1){
    count += 1;
  } 
  return count;
 }

function produceTableInfo({ longMemory, roundManager }) {
  let info = [];
  for (let i = 0; i < longMemory.storage.length; i++) {
    info.push(produceData({longMemory, roundManager, i}));
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
  console.log("data table")
  console.log(longMemory)
  console.log(roundManager)
  const columns = setColumns({roundManager})
  const info = produceTableInfo({longMemory, roundManager});

  const exportToExcel = () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(info);
    utils.book_append_sheet(wb, ws, 'Game Data');
    writeFile(wb, 'GameData.xlsx');
  };

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <Button variant="contained" color="primary" onClick={exportToExcel}>
        Export to Excel
      </Button>
      <TableContainer sx={{ maxHeight: '90%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={1} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
              <TableCell align="left" colSpan={columnSpan({roundManager})} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Manufacturing</TableCell>
              <TableCell align="left" colSpan={columnSpan({roundManager})} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Assembly</TableCell>
              <TableCell align="left" colSpan={columnSpan({roundManager})} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Quality</TableCell>
              <TableCell align="left" colSpan={columnSpan({roundManager})} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Paint</TableCell>
              <TableCell align="left" colSpan={columnSpan({roundManager})} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Dry</TableCell>
              <TableCell align="left" colSpan={1} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
              <TableCell align="left" colSpan={columnSpan({roundManager})} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Done</TableCell>
              <TableCell align="left" colSpan={1} sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
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
