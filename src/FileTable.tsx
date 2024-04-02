import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table as BTable } from 'react-bootstrap'; // Importing Table from react-bootstrap

export type File = {
  fileName: string;
  size: string;
  fileType: string;
};


const defaultData: File[] = [
  { fileName: 'Report_2023.pdf', size: '1.5MB', fileType: 'PDF' },
  { fileName: 'Budget_Forecast_2023.pdf', size: '2.3MB', fileType: 'PDF' },
  { fileName: 'Meeting_Minutes_022023.pdf', size: '0.9MB', fileType: 'PDF' },
];

const columnHelper = createColumnHelper<File>();

const columns = [
  columnHelper.accessor('fileName', {
    header: () => 'File Name',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('size', {
    header: () => 'Size',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('fileType', {
    header: () => 'File Type',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.fileName, {
    id: 'download',
    header: () => 'Actions',
    cell: () => <button className='btn btn-primary' onClick={() => alert('Downloading...')}>Download</button>,
    footer: info => info.column.id,
  }),
];

export const FileTable = () => {
    const [data, _setData] = React.useState(() => [...defaultData]);
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <div className="p-2">
        <BTable striped bordered hover responsive size="sm"> {/* Using BTable here */}
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </BTable>
      </div>
    );
  };