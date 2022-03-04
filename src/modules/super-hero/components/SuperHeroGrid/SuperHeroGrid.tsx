import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import { GridTableHead, EmptyGrid } from 'components';
import { rowsPerPageConfig } from 'constant';
import { SuperHeroGridItemList } from 'modules/super-hero/components';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';
import { SuperHero } from 'modules/super-hero/interfaces/superHero';
import { PageConfig } from 'interfaces';

export const SuperHeroGrid = () => {
  const {
    columns,
    page,
    order,
    orderBy,
    rowsPerPage,
    filter,
    pageConfig,
    superHeroes: rows,
    onAddOrEditOrView,
    dispatch,
  } = useSuperHero();
  const [filteredRows, setFilteredRows] = useState<SuperHero[]>();

  useEffect(() => {
    if (filter?.length > 2 || filter?.length === 0) {
      setFilteredRows(rows.filter((row) => row.name.includes(filter.toLocaleUpperCase())));
    }
  }, [filter, rows]);

  const handleRequestSort = (_event: MouseEvent<unknown>, property: keyof SuperHero) => {
    const isAsc = orderBy === property && order === 'asc';
    setPageConfig({ ...pageConfig, order: isAsc ? 'desc' : 'asc', orderBy: property });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPageConfig({ ...pageConfig, page: newPage });
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPageConfig({ ...pageConfig, page: 0, rowsPerPage: +event.target.value });
  };

  const setPageConfig = (newPageConfig: PageConfig<SuperHero>) => {
    dispatch({
      type: '[SuperHero] set page config',
      payload: { pageConfig: newPageConfig },
    });
  };

  return (
    <Paper style={{ width: '100%' }}>
      <TableContainer style={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <GridTableHead
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
            columns={columns}
            onAddOrEditOrView={onAddOrEditOrView}
          />
          <TableBody>
            {filteredRows?.length || (!filteredRows && rows?.length) ? (
              <SuperHeroGridItemList filteredRows={filteredRows} />
            ) : (
              <EmptyGrid value={filter} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageConfig}
        component="div"
        count={filteredRows?.length ? filteredRows.length : rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
