"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  IconButton,
  Box,
  Center,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Datatable = ({
  pagination,
  caption,
  headers,
  rowData,
  sortable,
  selectable,
}: {
  caption?: String;
  headers: string[];
  rowData: {}[];
  sortable?: boolean;
  pagination?: boolean;
  selectable?: boolean;
}) => {
  //Table state

  const [selectedRows, setSelectedRows] = useState(
    new Array(rowData.length).fill(false)
  );
  const [selectedRowCount, setSelectedRowCount] = useState(0);

  const [rows, setRows] = useState(
    //Adding select button conditionally
    selectable
      ? () => {
          headers.splice(0, 0, "select");
          return rowData.map((row, index) => {
            return {
              ...row,
              select: (
                <Checkbox
                  onChange={(e) => {
                    setSelectedRows((selectedRows) => {
                      const newCheck = [...selectedRows];
                      newCheck[index] = e.target.checked;

                      return newCheck;
                    });
                  }}
                  key={index}
                  checked={selectedRows[index]}
                />
              ),
            };
          });
        }
      : rowData
  );
  const [sortStateHeader, setSortStateHeader] = useState("");

  const [paginationState, setPaginationState] = useState({
    rowsPerPage: 5,
    page: 1,
    maxPages: rowData.length / 5,
  });

  //Helper Functions
  const paginationCompute = useCallback(() => {
    const startIndex = paginationState.rowsPerPage * (paginationState.page - 1);

    const newRows = [
      ...rows.slice(startIndex, startIndex + paginationState.rowsPerPage),
    ];
    return newRows;
  }, [paginationState.rowsPerPage, paginationState.page, rows]);

  const [displayRows, setDisplayRows] = useState<{}[]>(
    pagination ? paginationCompute() : rowData
  );

  const computeHeader = () => {
    return headers.map((headerName: string, key: Number) => {
      if (sortable) {
        type objectType = (typeof rows)[0];
        const keyobj = headerName.toLowerCase() as keyof (typeof rows)[0];
        const columnType = typeof rows[0][keyobj];
        const sortableType = columnType == "string";
        return (
          <Th
            _hover={sortableType ? { cursor: "pointer" } : undefined}
            onClick={
              sortable
                ? (event) => {
                    //sorting function for specific key
                    function compare_qty(a: objectType, b: objectType) {
                      if (a[keyobj] < b[keyobj]) {
                        return -1;
                      } else if (a[keyobj] < b[keyobj]) {
                        return 1;
                      } else {
                        return 0;
                      }
                    }
                    //reversing post initial sort
                    sortStateHeader == headerName
                      ? setRows([...rows.reverse()])
                      : setRows([...rows.sort(compare_qty)]);
                    setSortStateHeader(headerName);
                  }
                : undefined
            }
            key={key.toString()}
          >
            {headerName}
          </Th>
        );
      } else {
        return <Th key={key.toString()}>{headerName}</Th>;
      }
    });
  };

  const computeRows = () => {
    return displayRows.map((row: {}, key: Number) => {
      return (
        <Tr key={key.toString()}>
          {headers.map((cell: string, key: Number) => {
            let cellkey = cell.toLowerCase() as keyof typeof row;
            return <Td key={key.toString()}>{row[cellkey]}</Td>;
          })}
        </Tr>
      );
    });
  };

  const handleRowCountSelect = (event: React.SyntheticEvent<EventTarget>) => {
    const newRowCount = Number((event.target as HTMLInputElement).value);
    const newMaxPages =
      Math.floor(
        rows.length / Number((event.target as HTMLInputElement).value)
      ) + (rows.length % newRowCount > 0 ? 1 : 0);

    setPaginationState({
      ...paginationState,
      rowsPerPage: newRowCount,
      page:
        paginationState.page > newMaxPages ? newMaxPages : paginationState.page,
      maxPages: newMaxPages,
    });
  };

  const prevPage = () => {
    if (paginationState.page > 1) {
      setPaginationState((paginationState) => {
        return {
          ...paginationState,
          page: paginationState.page - 1,
        };
      });
    }
  };
  const nextPage = () => {
    if (paginationState.page < paginationState.maxPages) {
      setPaginationState((paginationState) => {
        return {
          ...paginationState,
          page: paginationState.page + 1,
        };
      });
    }
  };

  //Effects
  useEffect(() => {
    if (pagination) {
      setDisplayRows(paginationCompute());
    }
  }, [paginationState.rowsPerPage, paginationState.page, paginationCompute]);

  useEffect(() => {
    let count = 0;
    selectedRows.forEach((row) => {
      if (row) {
        count++;
      }
    });
    setSelectedRowCount(count);
  }, [selectedRows]);
  //constants
  const RowString =
    (paginationState.page - 1) * paginationState.rowsPerPage +
    1 +
    "-" +
    ((paginationState.page - 1) * paginationState.rowsPerPage +
      displayRows.length) +
    " of " +
    rows.length;

  // const selectedString =
  return (
    <Box
      border={"2px"}
      borderColor={"white"}
      overflow={"scroll"}
      borderRadius={"3xl"}
    >
      <Center>
        <TableContainer
          background="white"
          height={"60vh"}
          maxHeight={"60vh"}
          width={"60vw"}
          maxWidth={"60vw"}
          overflowY={"scroll"}
        >
          <Table colorScheme="gray" variant={"striped"}>
            {caption && (
              <TableCaption top={"0"} position={"sticky"} placement={"top"}>
                {caption}
              </TableCaption>
            )}

            <Thead>
              <Tr
                position={"sticky"}
                zIndex={"10"}
                background={"white"}
                top={"0"}
              >
                {computeHeader()}
              </Tr>
            </Thead>
            <Tbody>{computeRows()}</Tbody>
          </Table>
        </TableContainer>
      </Center>
      {pagination ? (
        <Flex color={"white"} justify={"space-between"} align={"center"}>
          <p className="pl-10">{selectedRowCount + " rows selected"}</p>
          <Flex justify={"end"} align={"center"}>
            <p>Rows per page:</p>
            <span>&nbsp;&nbsp;</span>
            {/* <p>{paginationState.rowsPerPage}</p> */}

            <Select
              width={"3rem"}
              size="md"
              marginEnd={"1rem"}
              value={paginationState.rowsPerPage.toString()}
              variant={"unstyled"}
              onChange={handleRowCountSelect}
            >
              <option value={"5"}>5</option>
              <option value={"7"}>7</option>
            </Select>

            <p> {RowString}</p>
            <Flex>
              <IconButton
                isDisabled={paginationState.page == 1}
                aria-label="Go Back"
                color={"white"}
                _hover={{ background: "white", color: "black" }}
                icon={<ChevronLeftIcon onClick={prevPage} />}
              />
              <IconButton
                aria-label="Go Ahead"
                _hover={{ background: "white", color: "black" }}
                color={"white"}
                isDisabled={paginationState.page == paginationState.maxPages}
                icon={<ChevronRightIcon onClick={nextPage} />}
              />
            </Flex>
          </Flex>
        </Flex>
      ) : null}
    </Box>
  );
};

export default Datatable;
