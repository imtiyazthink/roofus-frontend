import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SxProps, Theme, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateUserModal from "../../Dashboard/User/CreateUserModal";
import BlockIcon from "@mui/icons-material/Block";
import TableAction from "./TableAction";

const ITEM_HEIGHT = 48;

export interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
  value: string;
}

export interface TableActionsProps {
  id: string;
  name: string;
  href?: string;
}

interface TableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
  headStyle?: SxProps<Theme>;
  headCellStyle?: SxProps<Theme>;
  tableActionOptions?: TableActionsProps[];
}

interface TableProps {
  headCells: HeadCell[];
  dataRows: any[];
  pageNo?: number;
  setPageNo?: any;
  totalCount?: number;
  navigation: string;
  tableStyle?: SxProps<Theme>;
  headStyle?: SxProps<Theme>;
  bodyStyle?: SxProps<Theme>;
  rowStyle?: SxProps<Theme>;
  rowCellStyle?: SxProps<Theme>;
  headCellStyle?: SxProps<Theme>;
  tableActionOptions?: TableActionsProps[];
}

interface ActionProps {
  tableActionOptions: TableActionsProps[];
  recordId: number;
  navigation: string;
  id: number;
}

function CustomTableHead(props: TableHeadProps) {
  const {
    order,
    orderBy,
    onRequestSort,
    headCells,
    headStyle,
    headCellStyle,
    tableActionOptions,
  } = props;

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={headStyle}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.value ? order : false}
            sx={{ ...headCellStyle, fontWeight: "600" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {tableActionOptions && tableActionOptions?.length > 0 && (
          <TableCell sx={{ ...headCellStyle, fontWeight: "600" }}>
            Actions
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

export default function ListingTable({
  headCells,
  dataRows,
  setPageNo = () => {},
  pageNo = 0,
  totalCount = 50,
  navigation,
  tableStyle,
  headStyle,
  bodyStyle,
  rowStyle,
  rowCellStyle,
  headCellStyle,
  tableActionOptions,
}: TableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const navigate = useNavigate();
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = dataRows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPageNo(newPage);
  };

  return (
    <>
      <TableContainer
        sx={{
          overflow: "scroll",
          overflowX: "initial",
          height: "70vh",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Table sx={tableStyle} aria-labelledby="tableTitle" stickyHeader>
          <CustomTableHead
            headCells={headCells}
            headCellStyle={headCellStyle}
            headStyle={headStyle}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={dataRows.length}
            tableActionOptions={tableActionOptions}
          />
          {dataRows.length === 0 && (
            <TableBody sx={bodyStyle}>
              <TableRow sx={rowStyle}>
                <TableCell colSpan={12}>
                  <Typography
                    variant="h4"
                    style={{ width: "22%", margin: "auto" }}
                  >
                    No Data Found
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {dataRows.length !== 0 && (
            <TableBody sx={bodyStyle}>
              {stableSort(dataRows, getComparator(order, orderBy)).map(
                (row: any, rowIndex) => {
                  return (
                    row.id !== "" && (
                      <TableRow key={rowIndex} sx={rowStyle}>
                        {headCells.map((columnItem, index: number) => {
                          if (columnItem.value.includes(".")) {
                            const itemSplit = columnItem.value.split("."); //['address', 'city']
                            return (
                              <TableCell key={index} align="left" sx={rowStyle}>
                                {row[itemSplit[0]][itemSplit[1]] ? row[itemSplit[0]][itemSplit[1]] : ""}
                              </TableCell>
                            );
                          }

                          return (
                            <TableCell
                              key={index}
                              align="left"
                              sx={
                                index === 0
                                  ? {
                                      cursor: "pointer",
                                      padding: " 0 20px",
                                      textDecoration: "underline",
                                      color: "#004a98",
                                    }
                                  : { cursor: "unset", padding: "20px" }
                              }
                              onClick={
                                index === 0
                                  ? () => {
                                      navigate(`/${navigation}/${row['_id']}`);
                                    }
                                  : () => {}
                              }
                            >
                              {index === 0 &&
                              columnItem.value === "patientFirstName"
                                ? row.patient.firstName
                                : typeof row[`${columnItem.value}`] ===
                                  "boolean"
                                ? row[`${columnItem.value}`] === true
                                  ? "Enrolled"
                                  : "Unrolled"
                                : row[`${columnItem.value}`]?.length > 50
                                ? row[`${columnItem.value}`]?.substring(0, 25) +
                                  "..."
                                : columnItem.value === "option"
                                ? row[`${columnItem.value}`].toString()
                                : row[`${columnItem.value}`]}
                            </TableCell>
                          );
                        })}
                        {tableActionOptions && (
                          <TableCell key={rowIndex} sx={rowCellStyle}>
                            {row?.status !== "cancelled" ? (
                              <LongMenu
                                tableActionOptions={tableActionOptions}
                                key={row["_id"]}
                                recordId={row["_id"]}
                                navigation={navigation}
                                id={row['_id']}
                              />
                            ) : (
                              <BlockIcon
                                style={{
                                  marginLeft: "10px",
                                  height: "0.8em",
                                  width: "0.8em",
                                }}
                              />
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  );
                }
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

function LongMenu(props: ActionProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
        {props.tableActionOptions.map((option, index) => (
          <TableAction key={index} handleClose={handleClose} index={index} option={option} props={props} />
        ))}
    </>
  );
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
