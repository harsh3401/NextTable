"use client";

import React from 'react'
import { Center ,Flex, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr} from '@chakra-ui/react';

const Datatable = ({caption,headers,rows}:{caption?:String,headers:String[],rows:{}[]}) => {
  return (<Flex background="black"  alignContent={"center"} justifyContent={"center"}>
  <Center >
  <TableContainer background="white" borderRadius={"3xl"}  >
  <Table variant="striped" colorScheme="gray">
    <TableCaption>{caption}</TableCaption>
    <Thead>
      <Tr>
        {headers.map((headerName:String,key:Number)=>{return <Th key={key.toString()}>{headerName}</Th>})}
      </Tr>
    </Thead>
    <Tbody>
      {rows.map((row:{},key:Number)=>{
        return (<Tr key={key.toString()}>
          {headers.map((cell:String,key:Number)=>{
            let cellkey=cell.toLowerCase() as keyof typeof row
            return <Td key={key.toString()}>{row[cellkey]}</Td>
          })}
        </Tr>)
      })
    }   

      
    </Tbody>
  </Table>
</TableContainer>
  </Center>
  </Flex>)
}

export default Datatable