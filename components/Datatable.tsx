"use client";

import React, { useEffect, useState } from "react";
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
  useEditable,
  Stack,
  Select,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";

const Datatable = ({
  pagination,
  caption,
  headers,
  rowData,
  sortable,
}: {
  caption?: String;
  headers: string[];
  rowData: {}[];
  sortable?: boolean;
  pagination?: boolean;
}) => {
  const paginationCompute = () => {
    const startIndex = paginationState.rowsPerPage * (paginationState.page - 1);

    const newRows = [
      ...rows.slice(startIndex, startIndex + paginationState.rowsPerPage),
    ];
    return newRows;
  };
  const [rows, setRows] = useState(rowData);
  const [sortStateHeader, setSortStateHeader] = useState("");

  const [paginationState, setPaginationState] = useState({
    rowsPerPage: 5,
    page: 1,
    maxPages: rowData.length / 5,
  });

  const [displayRows, setDisplayRows] = useState<{}[]>(paginationCompute());
  useEffect(() => {
    setDisplayRows(paginationCompute());
  }, [
    paginationState.rowsPerPage,
    paginationState.page,
    rows,
    paginationCompute,
  ]);

  return (
    <Box border={"2px"} borderColor={"white"}>
      <Center>
        <TableContainer background="white" borderRadius={"3xl"}>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>{caption}</TableCaption>
            <Thead>
              <Tr>
                {headers.map((headerName: string, key: Number) => {
                  if (sortable) {
                    type objectType = (typeof rows)[0];
                    const keyobj =
                      headerName.toLowerCase() as keyof (typeof rows)[0];
                    const columnType = typeof rows[0][keyobj];

                    const sortableType = columnType == "string";
                    return (
                      <Th
                        _hover={
                          sortableType ? { cursor: "pointer" } : undefined
                        }
                        onClick={
                          sortable
                            ? (event) => {
                                function compare_qty(
                                  a: objectType,
                                  b: objectType
                                ) {
                                  if (a[keyobj] < b[keyobj]) {
                                    return -1;
                                  } else if (a[keyobj] < b[keyobj]) {
                                    return 1;
                                  } else {
                                    return 0;
                                  }
                                }
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
                })}
              </Tr>
            </Thead>
            <Tbody>
              {displayRows.map((row: {}, key: Number) => {
                return (
                  <Tr key={key.toString()}>
                    {headers.map((cell: string, key: Number) => {
                      let cellkey = cell.toLowerCase() as keyof typeof row;
                      return <Td key={key.toString()}>{row[cellkey]}</Td>;
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
      {pagination ? (
        <Flex color={"white"} justify={"end"} align={"center"}>
          <p>Rows per page:</p>
          <span>&nbsp;&nbsp;</span>
          {/* <p>{paginationState.rowsPerPage}</p> */}

          <Select
            width={"3rem"}
            size="xs"
            marginEnd={"1rem"}
            value={paginationState.rowsPerPage.toString()}
            variant={"unstyled"}
            onChange={(event) => {
              setPaginationState({
                ...paginationState,
                rowsPerPage: Number(event.target.value),
              });
            }}
          >
            <option value={"5"}>5</option>
            <option value={"7"}>7</option>
          </Select>

          <p>
            {(paginationState.page - 1) * paginationState.rowsPerPage +
              1 +
              "-" +
              ((paginationState.page - 1) * paginationState.rowsPerPage +
                displayRows.length) +
              " of " +
              rows.length}
          </p>
          <Flex>
            <IconButton
              aria-label="Go Back"
              icon={
                <ChevronLeftIcon
                  onClick={() => {
                    if (paginationState.page > 1) {
                      setPaginationState((paginationState) => {
                        return {
                          ...paginationState,
                          page: paginationState.page - 1,
                        };
                      });
                    }
                  }}
                  color={"white"}
                />
              }
            />
            <IconButton
              aria-label="Go Ahead"
              icon={
                <ChevronRightIcon
                  onClick={() => {
                    if (paginationState.page < paginationState.maxPages) {
                      setPaginationState((paginationState) => {
                        return {
                          ...paginationState,
                          page: paginationState.page + 1,
                        };
                      });
                    }
                  }}
                  color={"white"}
                />
              }
            />
          </Flex>
        </Flex>
      ) : null}
    </Box>
  );
};

export default Datatable;
