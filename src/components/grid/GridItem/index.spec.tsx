import { fireEvent, render, screen } from '@testing-library/react';
import { Column } from 'interfaces';

import { GridItem } from '.';

describe('GridItem', () => {
  const onAddOrEditOrView = jest.fn();
  const onDelete = jest.fn();
  const mockColumns = [{ id: 'name', label: 'Name' }];
  const mockRow = { name: 'test' };

  const initRender = (columns: Column<any>[] = mockColumns, row = mockRow) =>
    render(
      <table>
        <tbody>
          <GridItem
            columns={columns}
            row={row}
            onView={onAddOrEditOrView}
            onEdit={onAddOrEditOrView}
            onDelete={onDelete}
            confirmDialogConfig={{
              title: 'Test',
            }}
          />
        </tbody>
      </table>,
    );

  it('should render GridItem', () => {
    const columns = [
      { id: 'name', label: 'Name' },
      {
        id: 'age',
        label: 'Age',
        format: (value: number) => value.toString(),
      },
      {
        id: 'height',
        label: 'Height',
      },
      {
        id: 'picture',
        label: 'Picture',
        isImg: true,
      },
    ];
    const row = { name: 'test', age: 30, height: null, picture: null };
    initRender(columns, row);
    expect(screen.getByRole('row')).toBeDefined();
  });

  it('should fire onAddOrEditOrView method when click on visibility', () => {
    initRender();
    const visibilityButton = screen.getByTestId('icon-button-visibility');
    fireEvent.click(visibilityButton);
    expect(onAddOrEditOrView).toHaveBeenCalledWith(mockRow, true);
  });

  it('should fire onAddOrEditOrView method when click on edit', () => {
    initRender();
    const editButton = screen.getByTestId('icon-button-edit');
    fireEvent.click(editButton);
    expect(onAddOrEditOrView).toHaveBeenCalledWith(mockRow);
  });

  it('should fire onDelete method when click on delete', () => {
    initRender();
    const deleteButton = screen.getByTestId('icon-button-delete');
    fireEvent.click(deleteButton);
    expect(screen.getByText('Test')).toBeInTheDocument();
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);
    expect(onDelete).toHaveBeenCalledWith(mockRow);
  });
});
