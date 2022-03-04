import { fireEvent, render } from '@testing-library/react';
import { Column } from 'interfaces';

import { GridItem } from './GridItem';

describe('GridItem', () => {
  const onAddOrEditOrView = jest.fn();
  const onDelete = jest.fn();
  const mockColumns = [{ id: 'name', label: 'Name' }];
  const mockRow = { name: 'test' };

  const initContainerRender = (columns: Column<any>[] = mockColumns, row = mockRow) =>
    render(
      <table>
        <tbody>
          <GridItem columns={columns} row={row} onAddOrEditOrView={onAddOrEditOrView} onDelete={onDelete} />
        </tbody>
      </table>,
    ).container;

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
    ];
    const row = { name: 'test', age: 30, height: null };
    const container = initContainerRender(columns, row);
    expect(container.querySelector('tr[role="checkbox"]')?.querySelectorAll('td').length).toBe(4);
  });

  it('should fire onAddOrEditOrView method when click on visibility', () => {
    const container = initContainerRender();
    const visibilityButton = container.querySelector('button[aria-label="visibility"]');
    visibilityButton && fireEvent.click(visibilityButton);
    expect(onAddOrEditOrView).toHaveBeenCalledWith(mockRow, true);
  });

  it('should fire onAddOrEditOrView method when click on edit', () => {
    const container = initContainerRender();
    const editButton = container.querySelector('button[aria-label="edit"]');
    editButton && fireEvent.click(editButton);
    expect(onAddOrEditOrView).toHaveBeenCalledWith(mockRow);
  });

  it('should fire onDelete method when click on delete', () => {
    const container = initContainerRender();
    const deleteButton = container.querySelector('button[aria-label="delete"]');
    deleteButton && fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith(mockRow);
  });
});
