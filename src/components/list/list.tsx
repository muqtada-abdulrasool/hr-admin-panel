"use client";

import * as React from "react";
import {
  Button,
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
import Input from "@mui/material/TextField";
import Link from "next/link";

import styles from "./list.module.css";
import FancyHR from "../fancy-hr/fancy-hr";

interface ListProps {
  title?: string;
  search?: boolean;
  dense?: boolean;
  autoDense?: boolean;
  denseButton?: boolean;
  func?: React.ReactNode[];
  columns: string[];
  rows: any[][];
  pagination?: number[];
  count?: number;
  color?: string;
  onclick?: (row: any, key: number) => void;
}

const list: React.FC<ListProps> = ({
  title = "",
  search = false,
  dense = false,
  autoDense = false,
  denseButton = false,
  func = [],
  columns,
  rows,
  color = "var(--mui-palette-foreground)",
  pagination = [10, 25, 50],
  onclick = (r: any, k: number) => {
    r.preventDefault();
  },
}) => {
  const [searchText, setSearchText] = React.useState("");
  const [searchAttribute, setSearchAttribute] = React.useState(0);

  const [density, setDensity] = React.useState(dense);
  const [denseOption, setDenseOption] = React.useState(denseButton);
  const [tableSize, setTableSize] = React.useState<"small" | "medium">(
    "medium"
  );
  let maxDenseSize = 700;
  let maxDenseContainer = 500;

  const [currentPage, setCurrentPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pagination[0]);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchText(event.target.value);
  };

  const handleSearchAttribute = (event: any, child: any) => {
    setSearchAttribute(child.props["data-index"]);
  };

  const handleRowHref = (rowIndex: number) => {
    if (typeof window !== "undefined") {
      return window.location.href + "/" + rowIndex.toString();
    } else if (typeof process.env !== undefined) {
      return (
        process.env.NEXT_PUBLIC_SECURITY_STANDARD! +
        process.env.NEXT_PUBLIC_DOMAIN! +
        "/" +
        rowIndex.toString()
      );
    } else {
      return "/";
    }
  };

  const handleHrefClick = (
    row: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!(row.ctrlKey || row.metaKey)) {
      row.preventDefault();
    }
  };

  React.useEffect(() => {
    if (density) {
      setTableSize("small");
    } else {
      setTableSize("medium");
    }
  }, [density]);

  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && autoDense) {
        if (window.innerHeight < maxDenseSize && !density) {
          setDensity(true);
        } else {
          setDensity(false);
        }

        if (window.innerWidth < maxDenseContainer) {
          setDenseOption(false);
        } else {
          setDenseOption(true);
        }
      }
    };

    if (typeof window !== "undefined" && autoDense) {
      window.addEventListener("resize", handleResize);
    }
    handleResize();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  return (
    <div className={styles.list_container} style={{ background: color }}>
      {title == "" && search == false && func.length < 1 ? null : (
        <div
          className={styles.list_header_container}
          style={{ background: color }}
        >
          <div className={styles.list_header_left_side}>
            {/* Rendering the title*/}
            <div className={styles.list_title}>
              {title == "" ? null : (
                <Typography variant="h4">{title}</Typography>
              )}
              <FancyHR vertical ballsize="0px" length="80%" thickness="1px" />
            </div>
            {search ? (
              /* Rendering the search box*/
              <div className={styles.search_component}>
                <Input
                  label="Search"
                  variant="outlined"
                  onChange={(e) => handleSearch(e)}
                  sx={{
                    "& fieldset": {
                      borderInlineEnd: "none",
                      borderStartEndRadius: 0,
                      borderEndEndRadius: 0,
                    },
                  }}
                ></Input>
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
            {func?.map((component, index) => (
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
        <Table stickyHeader aria-label="sticky table" size={tableSize}>
          {/* Rendering the header columns*/}
          <TableHead
            sx={{
              // boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
              position: "sticky",
              top: 0,
              outline: "2px solid var(--mui-palette-secondary-light)",
            }}
          >
            <TableRow>
              {columns.map((columnName, index) => (
                <TableCell
                  key={index}
                  align="left"
                  sx={{ maxWidth: "1rem" }}
                  style={{ backgroundColor: color }}
                >
                  <Typography
                    sx={{
                      display: "inline-block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
                      fontWeight: "500",
                      fontSize: "1.2rem",
                    }}
                  >
                    {columnName}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Rendering the rows*/}
          <TableBody>
            {rows
              .filter((row) =>
                row[searchAttribute]
                  .toString()
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              )
              .slice(
                currentPage * rowsPerPage,
                currentPage * rowsPerPage + rowsPerPage
              )
              .map((row, rowIndex) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={rowIndex}
                  component={Link}
                  href={handleRowHref(rowIndex)}
                  onClick={(event) => handleHrefClick(event)}
                  onDoubleClick={(event) => onclick(event, rowIndex)}
                  sx={{
                    textDecoration: "none",
                  }}
                >
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      align="left"
                      sx={{ maxWidth: "1rem" }}
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: "none", overflow: "hidden" }}
        ></TablePagination>
      </div>
    </div>
  );
};

export default list;
