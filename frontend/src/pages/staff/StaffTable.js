import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  { id: "first_name", label: "First Name", minWidth: 170 },
  { id: "last_name", label: "Last Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "right",
  },
  {
    id: "appointment",
    label: "Next Appointment",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(first_name, last_name, email, phone, appointment) {
  return { first_name, last_name, email, phone, appointment };
}

const rows = [
  createData(
    "Tom",
    "Brady",
    "Tom.Brady@example.com",
    3287263,
    "11 / 05 / 2024"
  ),
  createData(
    "Sally",
    "Yus",
    "Sally.Yus@example.comm",
    9596961,
    "11 / 05 / 2024"
  ),
  createData("Kate", "Lam", "Kate.Lam@example.com", 301340, "11 / 05 / 2024"),
  createData(
    "Rajesh",
    "Abeyan",
    "Rajesh.Abeyan@example.com",
    9984670,
    "11 / 05 / 2024"
  ),
  createData(
    "Laura",
    "Simmons",
    "Laura.Simmons@example.com",
    7692024,
    "11 / 05 / 2024"
  ),
];

export default function StaffStickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState(rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Filter the rows based on the search query
    const filteredRows = rows.filter(
      (row) =>
        row.first_name.toLowerCase().includes(value.toLowerCase()) ||
        row.last_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRows(filteredRows);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* Search Bar */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <SearchIcon style={{ marginRight: "8px" }} />
        <InputBase
          placeholder="Search by Name..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{ flex: 1 }}
        />
      </div>

      {/* Table */}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
