"use client";

import * as React from "react";
import styles from "./list.module.css";
import FancyHR from "../fancy-hr/fancy-hr";
import {
  TextField,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

interface ListProps {
  columns: string[];
  rows: any[][];
  total?: number;
  rightFuncComponents?: React.ReactNode[];
  leftFuncComponents?: React.ReactNode[];
  listTitle?: string;
  searchBox?: boolean;
  denseButton?: boolean;
  denseFromStart?: boolean;
  pagination?: number[];
  page?: number;
  setURLSelected?: any;
  URLPagination?: number;
  setURLPagination?: any;
  URLPage?: number;
  setURLPage?: any;
  URLSearch?: any;
  setURLSearch?: any;
  setURLSearchAttribute?: any;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const ListComponent: React.FC<ListProps> = ({
  columns,
  rows = [],
  total,
  leftFuncComponents = [],
  rightFuncComponents = [],
  listTitle = "",
  searchBox = false,
  denseButton = false,
  denseFromStart = false,
  pagination = [10, 25, 50],
  setURLSelected,
  URLPagination,
  setURLPagination,
  URLPage,
  setURLPage,
  URLSearch,
  setURLSearch,
  setURLSearchAttribute,
  onClick,
  onDoubleClick,
}) => {
  const [localSearchText, setLocalSearchText] = React.useState("");
  const [searchAttribute, setSearchAttribute] = React.useState(0);

  const [currentPage, setCurrentPage] = React.useState(URLPage ?? 0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    URLPagination ?? pagination[0] ?? 10
  );
  const [selectedRow, setSelectedRow] = React.useState(-1);

  const [density, setDensity] = React.useState(denseFromStart);
  const [denseOption, setDenseOption] = React.useState(denseButton);

  React.useEffect(() => {
    if (URLPage !== undefined) setCurrentPage(URLPage);
  }, [URLPage]);

  React.useEffect(() => {
    if (URLPagination !== undefined) setRowsPerPage(URLPagination);
  }, [URLPagination]);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = event.target.value;
    setLocalSearchText(val);

    if (URLSearch && setURLSearch) {
      const TMP = Array.isArray(URLSearch) ? [...URLSearch] : [];
      TMP[searchAttribute] = val;
      setURLSearch(TMP);
    }
  };

  const handleSearchAttribute = (event: any, child: any) => {
    const idx = child?.props?.["data-index"] ?? 0;
    setSearchAttribute(idx);
    if (setURLSearchAttribute) {
      setURLSearchAttribute(idx);
    }
  };

  const isServerPaginated =
    URLPagination !== undefined && URLPage !== undefined;

  // Filter rows locally if not filtered by server
  const filteredRows = React.useMemo(() => {
    if (URLSearch || !localSearchText.trim()) {
      return rows;
    }
    const q = localSearchText.toLowerCase();
    return rows.filter((r) => {
      const cell = r[searchAttribute];
      if (typeof cell === "string") {
        return cell.toLowerCase().includes(q);
      }
      if (typeof cell === "number") {
        return cell.toString().includes(q);
      }
      return false;
    });
  }, [rows, localSearchText, searchAttribute, URLSearch]);

  const activePage = isServerPaginated ? URLPage : currentPage;
  const activeRowsPerPage = isServerPaginated ? URLPagination : rowsPerPage;

  const displayRows = React.useMemo(() => {
    if (isServerPaginated) {
      return filteredRows;
    }
    const start = activePage * activeRowsPerPage;
    return filteredRows.slice(start, start + activeRowsPerPage);
  }, [filteredRows, isServerPaginated, activePage, activeRowsPerPage]);

  const handleRowClick = (displayIndex: number) => {
    setSelectedRow(displayIndex);
    if (setURLSelected) {
      const actualIndex = isServerPaginated
        ? displayIndex
        : activePage * activeRowsPerPage + displayIndex;
      setURLSelected(actualIndex);
    }
    if (onClick) onClick();
  };

  const handleRowDoubleClick = (displayIndex: number) => {
    if (onDoubleClick) onDoubleClick();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
    if (setURLPage) setURLPage(newPage);
    setSelectedRow(-1);
    if (setURLSelected) setURLSelected(-1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = +event.target.value;
    setRowsPerPage(val);
    if (setURLPagination) setURLPagination(val);
    setCurrentPage(0);
    if (setURLPage) setURLPage(0);
    setSelectedRow(-1);
    if (setURLSelected) setURLSelected(-1);
  };

  const totalCount = isServerPaginated
    ? total ?? filteredRows.length
    : filteredRows.length;

  return (
    <div className={styles.list_container}>
      {listTitle == "" &&
      searchBox == false &&
      rightFuncComponents.length < 1 &&
      leftFuncComponents.length < 1 ? null : (
        <div className={styles.list_header_container}>
          <div className={styles.list_header_left_side}>
            {/* Rendering the title*/}
            <div className={styles.list_title}>
              {listTitle == "" ? null : (
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                >
                  <Typography variant="h4">{listTitle}</Typography>
                </div>
              )}
              {listTitle == "" || searchBox == false ? null : (
                <FancyHR vertical ballsize="0px" length="80%" thickness="1px" />
              )}
            </div>
            {searchBox ? (
              /* Rendering the search box*/
              <div className={styles.search_component}>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={localSearchText}
                  onChange={(event) => handleSearch(event)}
                  sx={{
                    "& fieldset": {
                      borderInlineEnd: "none",
                      borderStartEndRadius: 0,
                      borderEndEndRadius: 0,
                    },
                  }}
                />
                {/* Rendering the attribute box*/}
                <FormControl>
                  <Select
                    value={searchAttribute}
                    onChange={(event, child) =>
                      handleSearchAttribute(event, child)
                    }
                    autoWidth
                    sx={{
                      "& fieldset": {
                        borderInlineStart: "none",
                        borderStartStartRadius: 0,
                        borderEndStartRadius: 0,
                      },
                    }}
                  >
                    {columns.map((value, index) => (
                      <MenuItem key={index} value={index} data-index={index}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            ) : null}
            {leftFuncComponents.length < 1
              ? null
              : leftFuncComponents?.map((component, index) => (
                  <div key={index}>{component}</div>
                ))}
          </div>
          {/* Rendering all custom components for actions*/}
          <div className={styles.list_header_right_side}>
            {rightFuncComponents.length < 1
              ? null
              : rightFuncComponents?.map((component, index) => (
                  <div key={index}>{component}</div>
                ))}
          </div>
        </div>
      )}
      {/* Rendering the table*/}
      <TableContainer
        className={styles.scrollableContainer}
        sx={{ tableLayout: "fixed" }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          size={density ? "small" : "medium"}
        >
          {/* Rendering the header columns*/}
          <TableHead
            sx={{
              position: "sticky",
              outline: "2px solid var(--mui-palette-secondary-light)",
              zIndex: 1,
            }}
          >
            <TableRow sx={{ position: "sticky", zIndex: 1 }}>
              {columns.map((cell, index) => (
                <TableCell
                  key={index}
                  align="left"
                  sx={{
                    maxWidth: "1rem",
                    background: "var(--mui-palette-foreground)",
                  }}
                >
                  <Typography
                    sx={{
                      display: "inline-block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
                      fontWeight: 600,
                    }}
                  >
                    {cell}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Rendering the rows*/}
          <TableBody>
            {displayRows.map((row, rowIndex) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                selected={rowIndex === selectedRow}
                key={rowIndex}
                onClick={() => handleRowClick(rowIndex)}
                onDoubleClick={() => handleRowDoubleClick(rowIndex)}
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    align="left"
                    sx={{ maxWidth: "1rem" }}
                  >
                    {React.isValidElement(cell) ? (
                      cell
                    ) : (
                      <Typography
                        sx={{
                          display: "inline-block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "100%",
                        }}
                      >
                        {cell}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.paginationContainer}>
        {denseOption ? (
          <FormControlLabel
            control={<Switch checked={density} />}
            label="Dense Table"
            onChange={() => {
              setDensity(!density);
            }}
          />
        ) : (
          <div />
        )}
        <TablePagination
          rowsPerPageOptions={pagination}
          component="div"
          count={totalCount}
          rowsPerPage={activeRowsPerPage}
          page={activePage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: "none", overflow: "hidden" }}
        />
      </div>
    </div>
  );
};

export default ListComponent;
