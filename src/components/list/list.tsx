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
  total: number;
  funcComponents?: React.ReactNode[];
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

const list: React.FC<ListProps> = ({
  columns,
  rows,
  total,
  funcComponents = [],
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
  const [searchText, setSearchText] = React.useState([""]);
  const [searchAttribute, setSearchAttribute] = React.useState(0);

  const [currentPage, setCurrentPage] = React.useState(URLPage);
  const [rowsPerPage, setRowsPerPage] = React.useState(URLPagination);
  const [selectedRow, setSelectedRow] = React.useState(-1);

  const [density, setDensity] = React.useState(denseFromStart);
  const [denseOption, setDenseOption] = React.useState(denseButton);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const TMP = [...URLSearch];
    TMP[searchAttribute] = event.target.value;

    // No need when we use URLS
    // setSearchText(TMP);
    setURLSearch(TMP);
  };

  const handleSearchAttribute = (event: any, child: any) => {
    // TODO: This needs server to not return error when inputting weird searches
    // const TMP = [...URLSearch];
    // TMP[searchAttribute] = event.target.value;
    // setURLSearch(
    //   TMP.map((value) => {
    //     return "";
    //   })
    // );
    // setURLSearch(TMP);

    setSearchAttribute(child.props["data-index"]);
    setURLSearchAttribute(child.props["data-index"]);
  };

  const handleRowClick = (index: number) => {
    setSelectedRow(index);
    setURLSelected(index);
  };

  const handleRowDoubleClick = (index: number) => {
    console.log("click?");
    if (onDoubleClick) onDoubleClick();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
    setURLPage(newPage);
    setSelectedRow(-1);
    setURLSelected(-1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setURLPagination(+event.target.value);
  };

  return (
    <div className={styles.list_container}>
      {listTitle == "" &&
      searchBox == false &&
      funcComponents.length < 1 ? null : (
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
                  onChange={(event) => handleSearch(event)}
                  sx={{
                    "& fieldset": {
                      borderInlineEnd: "none",
                      borderStartEndRadius: 0,
                      borderEndEndRadius: 0,
                    },
                  }}
                ></TextField>
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
                      <MenuItem value={index} data-index={index}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            ) : null}
          </div>
          {/* Rendering all custom components for actions*/}
          <div className={styles.list_header_right_side}>
            {funcComponents?.map((component, index) => (
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
            {rows.map((row, rowIndex) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                selected={rowIndex == selectedRow ? true : false}
                key={rowIndex}
                onClick={() => handleRowClick(rowIndex)}
                onDoubleClick={(event) => handleRowDoubleClick(rowIndex)}
                sx={{
                  textDecoration: "none",
                  pointerEvents: "visible",
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
          count={total}
          rowsPerPage={rowsPerPage!}
          page={currentPage!}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: "none", overflow: "hidden" }}
        ></TablePagination>
      </div>
    </div>
  );
};

export default list;
