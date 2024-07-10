import React, {useState} from 'react';
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPen,
    faTrashAlt,
    faXmark,
    faArrowUp19,
    faArrowDown91,
    faArrowUpWideShort,
    faArrowDownShortWide,
    faFilter,
    faFilterCircleXmark,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import '../styles/SmartTable.scss';

interface Column {
    Key: string;
    label: string;
    isString?: boolean;
    Cell?: (props: any) => JSX.Element;
}

interface Item {
    id: number;
    name: string;
    bankName: string;
    bankAccountNumber: string;
    aadharNumber: string;
    descriptions: string;
}

interface SmartTableProps {
    name: string;
    columns: Column[];
    data: Item[];
    showFilter?: boolean;
    onAddClick: () => void;
    onToggleFilters: () => void;
    areFiltersVisible: boolean;
}

export const getColumns = (onEdit: (item: Item) => void, onDelete: (id: number) => void): Column[] => {
    return [
        {Key: "ID", label: "id"},
        {Key: "Name", label: "name", isString: true},
        {Key: "Bank Name", label: "bankName", isString: true},
        {Key: "Bank Account Number", label: "bankAccountNumber"},
        {Key: "Aadhar Number", label: "aadharNumber"},
        {Key: "Descriptions", label: "descriptions", isString: true},
        {
            Key: "Actions",
            label: "actions",
            Cell: ({row}: { row: { original: Item } }) => (
                <>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Edit</Tooltip>}
                    >
                        <Button
                            className="edit-button"
                            variant="primary"
                            onClick={() => onEdit(row.original)}
                        >
                            <FontAwesomeIcon icon={faPen}/>
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Delete</Tooltip>}
                    >
                        <Button
                            className="delete-button"
                            variant="danger"
                            onClick={() => onDelete(row.original.id)}
                        >
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </Button>
                    </OverlayTrigger>
                </>
            )
        }
    ];
};

const SmartTable: React.FC<SmartTableProps> = ({
                                                   columns,
                                                   data,
                                                   showFilter = true,
                                                   onAddClick,
                                                   onToggleFilters,
                                                   areFiltersVisible
                                               }) => {
    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleFilterChange = (key: string, value: string) => {
        setFilterValues({
            ...filterValues,
            [key]: value,
        });
    };

    const clearFilter = (key: string) => {
        setFilterValues({
            ...filterValues,
            [key]: '',
        });
    };

    const handleSort = (key: string) => {
        if (sortColumn === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(key);
            setSortDirection('asc');
        }
    };

    const getSortedData = () => {
        if (!sortColumn) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = (a as any)[sortColumn];
            const bValue = (b as any)[sortColumn];
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const filteredData = data.filter(item =>
        columns.every(col =>
            col.Key in filterValues
                ? (item as any)[col.label].toString().toLowerCase().includes(filterValues[col.Key].toLowerCase())
                : true
        )
    );

    const sortedData = getSortedData();

    return (
        <div className="smart-table-container">
            <div className="table-controls">
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="add-tooltip">Add</Tooltip>}
                    offset={[0, 8]}
                >
                    <Button onClick={onAddClick} className="add-button">
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip
                        id="filter-tooltip">{areFiltersVisible ? 'Hide Filters' : 'Show Filters'}</Tooltip>}
                    offset={[0, 8]}
                >
                    <Button onClick={onToggleFilters} className="toggle-filters-button">
                        <FontAwesomeIcon icon={areFiltersVisible ? faFilterCircleXmark : faFilter}/>
                    </Button>
                </OverlayTrigger>
            </div>
            <table className="data-table">
                <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th
                            key={index}
                            onClick={() => col.Key !== "Actions" && handleSort(col.label)}
                            className={col.Key !== "Actions" ? "sortable" : ""}
                        >
                            {col.Key}
                            {sortColumn === col.label && col.Key !== "Actions" && (
                                <FontAwesomeIcon
                                    icon={sortDirection === 'asc'
                                        ? (col.isString ? faArrowUpWideShort : faArrowUp19)
                                        : (col.isString ? faArrowDownShortWide : faArrowDown91)}
                                    className="sort-icon"
                                />
                            )}
                        </th>
                    ))}
                </tr>
                {showFilter && areFiltersVisible && (
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>
                                {col.Key !== "Actions" && (
                                    <div className="filter-input-wrapper">
                                        <input
                                            type="text"
                                            placeholder={`Filter ${col.label}`}
                                            value={filterValues[col.Key] || ""}
                                            onChange={(e) => handleFilterChange(col.Key, e.target.value)}
                                        />
                                        {filterValues[col.Key] && (
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                className="clear-icon"
                                                onClick={() => clearFilter(col.Key)}
                                            />
                                        )}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                )}
                </thead>
                <tbody>
                {sortedData.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>
                                {col.Cell ? col.Cell({row: {original: item}}) : (item as any)[col.label]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SmartTable;