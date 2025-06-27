import React, { useState, useMemo, useCallback } from 'react';
import './DataTable.css';

// ========== Типи ==========
export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  customSort?: (a: T, b: T, direction: SortDirection) => number;
  customFilter?: (value: T[keyof T], filterValue: string, row: T) => boolean;
}

export interface DataTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  onRowSelect?: (selectedRows: T[]) => void;
  enableExport?: boolean;
  enableGrouping?: boolean;
  groupBy?: keyof T;
  localStorageKey?: string;
}

// ========== Хук для localStorage ==========
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Failed to load from localStorage', error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: React.SetStateAction<T>) => {
      try {
        setStoredValue(prev => {
          const valueToStore = value instanceof Function ? value(prev) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
        });
      } catch (error) {
        console.error('Failed to save to localStorage', error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}

// ========== Компонент ==========
export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  pageSize: initialPageSize = 10,
  onRowSelect,
  enableExport = false,
  enableGrouping = false,
  groupBy,
  localStorageKey = 'datatable-state',
}: DataTableProps<T>) {
  // Стан
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: SortDirection } | null>(null);
  const [filters, setFilters] = useLocalStorage<Partial<Record<keyof T, string>>>(
    `${localStorageKey}-filters`,
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [tablePageSize, setTablePageSize] = useState(initialPageSize);
  const [selectedRowIds, setSelectedRowIds] = useLocalStorage<Set<T['id']>>(
    `${localStorageKey}-selected`,
    new Set()
  );

  // Сортування
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    const { key, direction } = sortConfig;
    if (!direction) return data;

    const column = columns.find(c => c.key === key);

    if (column?.customSort) {
      return [...data].sort((a, b) => column.customSort!(a, b, direction));
    }

    return [...data].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (aStr < bStr) return direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, columns]);

  // Фільтрація
  const filteredData = useMemo(() => {
    return sortedData.filter(row => {
      return columns.every(col => {
        if (!col.filterable) return true;
        const filterValue = filters[col.key];
        if (!filterValue) return true;
        const cellValue = row[col.key];
        if (cellValue == null) return false;
        return col.customFilter
          ? col.customFilter(cellValue, filterValue, row)
          : String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }, [sortedData, filters, columns]);

  // Групування
  const groupedData = useMemo(() => {
    if (!enableGrouping || !groupBy) return [{ key: '', rows: filteredData }];
    const groups = new Map<string, T[]>();
    filteredData.forEach(row => {
      const groupKey = String(row[groupBy]);
      if (!groups.has(groupKey)) groups.set(groupKey, []);
      groups.get(groupKey)?.push(row);
    });
    return Array.from(groups.entries()).map(([key, rows]) => ({ key, rows }));
  }, [filteredData, enableGrouping, groupBy]);

  // Пагінація
  const pageCount = Math.ceil(filteredData.length / tablePageSize);
  const pagedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * tablePageSize,
      currentPage * tablePageSize
    );
  }, [filteredData, currentPage, tablePageSize]);

  // Експорт
  const exportToCSV = () => {
    const header = ['ID', ...columns.map(c => c.title)].join(',');
    const rows = data.map(row =>
      [row.id, ...columns.map(c => String(row[c.key]))].join(',')
    );
    const csvContent = [header, ...rows].join('\n');
    downloadFile(csvContent, 'text/csv', 'table-export.csv');
  };

  const exportToJSON = () => {
    downloadFile(JSON.stringify(data, null, 2), 'application/json', 'table-export.json');
  };

  const downloadFile = (content: string, mimeType: string, filename: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Обробники подій
  const handleSort = useCallback(
    (key: keyof T) => {
      setCurrentPage(1);
      setSortConfig(prev => {
        if (prev?.key === key) {
          if (prev.direction === 'asc') return { key, direction: 'desc' };
          if (prev.direction === 'desc') return null;
        }
        return { key, direction: 'asc' };
      });
    },
    [setCurrentPage]
  );

  const handleFilterChange = useCallback(
    (key: keyof T, value: string) => {
      setCurrentPage(1);
      setFilters(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [setCurrentPage, setFilters]
  );

  const toggleRowSelection = useCallback(
    (id: T['id']) => {
      setSelectedRowIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        if (onRowSelect) {
          onRowSelect(data.filter(d => newSet.has(d.id)));
        }
        return newSet;
      });
    },
    [data, onRowSelect]
  );

  const toggleSelectAllCurrentPage = useCallback(() => {
    const allSelected = pagedData.every(row => selectedRowIds.has(row.id));
    setSelectedRowIds(prev => {
      const newSet = new Set(prev);
      if (allSelected) {
        pagedData.forEach(row => newSet.delete(row.id));
      } else {
        pagedData.forEach(row => newSet.add(row.id));
      }
      if (onRowSelect) {
        onRowSelect(data.filter(d => newSet.has(d.id)));
      }
      return newSet;
    });
  }, [pagedData, selectedRowIds, data, onRowSelect]);

  return (
    <div className="data-table">
      {enableExport && (
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button onClick={exportToCSV}>Export to CSV</button>
          <button onClick={exportToJSON}>Export to JSON</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={toggleSelectAllCurrentPage}
                checked={pagedData.length > 0 && pagedData.every(row => selectedRowIds.has(row.id))}
                aria-label="Select all rows on current page"
              />
            </th>
            {columns.map(col => (
              <th
                key={String(col.key)}
                onClick={() => col.sortable && handleSort(col.key)}
                style={{
                  cursor: col.sortable ? 'pointer' : undefined,
                  width: col.width,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{col.title}</span>
                  {sortConfig?.key === col.key ? (
                    sortConfig.direction === 'asc' ? (
                      '🔼'
                    ) : sortConfig.direction === 'desc' ? (
                      '🔽'
                    ) : null
                  ) : null}
                </div>
                {col.filterable && (
                  <input
                    type="text"
                    placeholder={`Фільтр...`}
                    value={filters[col.key] || ''}
                    onClick={e => e.stopPropagation()}
                    onChange={e => handleFilterChange(col.key, e.target.value)}
                    style={{ width: '100%', marginTop: 4 }}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {groupedData.length > 1 ? (
            groupedData.map(group => (
              <React.Fragment key={group.key}>
                <tr className="group-header">
                  <td colSpan={columns.length + 1} style={{ fontWeight: 'bold' }}>
                    {group.key}
                  </td>
                </tr>
                {group.rows.map(row => (
                  <tr key={String(row.id)}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRowIds.has(row.id)}
                        onChange={() => toggleRowSelection(row.id)}
                        aria-label={`Select row ${row.id}`}
                      />
                    </td>
                    {columns.map(col => (
                      <td key={String(col.key)} title={String(row[col.key])}>
                        {col.render ? col.render(row[col.key], row) : String(row[col.key]).slice(0, 30)}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))
          ) : (
            <>
              {pagedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} style={{ textAlign: 'center' }}>
                    Немає даних
                  </td>
                </tr>
              ) : (
                pagedData.map(row => (
                  <tr key={String(row.id)}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRowIds.has(row.id)}
                        onChange={() => toggleRowSelection(row.id)}
                        aria-label={`Select row ${row.id}`}
                      />
                    </td>
                    {columns.map(col => (
                      <td key={String(col.key)} title={String(row[col.key])}>
                        {col.render ? col.render(row[col.key], row) : String(row[col.key]).slice(0, 30)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </>
          )}
        </tbody>
      </table>

      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ marginBottom: '0.5rem' }}>
          <label htmlFor="pageSize">На сторінці: </label>
          <select
            id="pageSize"
            value={tablePageSize}
            onChange={e => {
              const newSize = parseInt(e.target.value, 10);
              setTablePageSize(newSize);
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
            ← Попередня
          </button>
          <span>Сторінка {currentPage}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
          >
            Наступна →
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;