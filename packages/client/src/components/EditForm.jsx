// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
// import { useGridApiRef, XGrid } from '@material-ui/x-grid';
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
// } from '@material-ui/x-grid-data-generator';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     justifyContent: 'center',
//     display: 'flex',
//     borderBottom: `1px solid ${theme.palette.divider}`,
//   },
// }));

// function EditToolbar(props) {
//   const { selectedCellParams, apiRef, setSelectedCellParams } = props;
//   const classes = useStyles();

//   const handleClick = () => {
//     if (!selectedCellParams) {
//       return;
//     }
//     const { id, field, cellMode } = selectedCellParams;
//     if (cellMode === 'edit') {
//       const editedCellProps = apiRef.current.getEditCellPropsParams(id, field);
//       apiRef.current.commitCellChange(editedCellProps);
//       apiRef.current.setCellMode(id, field, 'view');
//       setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
//     } else {
//       apiRef.current.setCellMode(id, field, 'edit');
//       setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit' });
//     }
//   };

//   const handleMouseDown = (event) => {
//     // Keep the focus in the cell
//     event.preventDefault();
//   };

//   return (
//     <div className={classes.root}>
//       <Button
//         onClick={handleClick}
//         onMouseDown={handleMouseDown}
//         disabled={!selectedCellParams}
//         color="primary"
//       >
//         {selectedCellParams?.cellMode === 'edit' ? 'Save' : 'Edit'}
//       </Button>
//     </div>
//   );
// }

// EditToolbar.propTypes = {
//   apiRef: PropTypes.shape({
//     current: PropTypes.object.isRequired,
//   }).isRequired,
//   selectedCellParams: PropTypes.any.isRequired,
//   setSelectedCellParams: PropTypes.func.isRequired,
// };

// export default function StartEditButtonGrid() {
//   const apiRef = useGridApiRef();
//   const [selectedCellParams, setSelectedCellParams] = React.useState(null);

//   const handleCellClick = React.useCallback((params) => {
//     setSelectedCellParams(params);
//   }, []);

//   const handleDoubleCellClick = React.useCallback((params, event) => {
//     event.stopPropagation();
//   }, []);

//   // Prevent from rolling back on escape
//   const handleCellKeyDown = React.useCallback((params, event) => {
//     if (['Escape', 'Delete', 'Backspace', 'Enter'].includes(event.key)) {
//       event.stopPropagation();
//     }
//   }, []);

//   // Prevent from committing on blur
//   const handleCellBlur = React.useCallback((params, event) => {
//     if (params.cellMode === 'edit') {
//       event?.stopPropagation();
//     }
//   }, []);

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <XGrid
//         rows={rows}
//         columns={columns}
//         apiRef={apiRef}
//         onCellClick={handleCellClick}
//         onCellDoubleClick={handleDoubleCellClick}
//         onCellBlur={handleCellBlur}
//         onCellKeyDown={handleCellKeyDown}
//         components={{
//           Toolbar: EditToolbar,
//         }}
//         componentsProps={{
//           toolbar: {
//             selectedCellParams,
//             apiRef,
//             setSelectedCellParams,
//           },
//         }}
//       />
//     </div>
//   );
// }

// const columns = [
//   { field: 'name', headerName: 'Name', width: 180, editable: true },
//   { field: 'age', headerName: 'Age', type: 'number', editable: true },
//   {
//     field: 'dateCreated',
//     headerName: 'Date Created',
//     type: 'date',
//     width: 180,
//     editable: true,
//   },
//   {
//     field: 'lastLogin',
//     headerName: 'Last Login',
//     type: 'dateTime',
//     width: 220,
//     editable: true,
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     name: randomTraderName(),
//     age: 25,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 2,
//     name: randomTraderName(),
//     age: 36,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 3,
//     name: randomTraderName(),
//     age: 19,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 4,
//     name: randomTraderName(),
//     age: 28,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 5,
//     name: randomTraderName(),
//     age: 23,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
// ];