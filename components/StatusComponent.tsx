"use client"
import { Tag, TagLabel } from '@chakra-ui/react';
import React from 'react'

 const StatusComponent = ({}) => {  
    let value=parseInt((Math.random()*100).toString());
    value=value%3;
    const keys=["Waiting","Paid","Failed"]
    const colors=["yellow","green","red"]
    

  return (
           <Tag
           size={'md'}
           borderRadius='full'
           variant='solid'
           colorScheme={colors[value]}
         >
           <TagLabel>{keys[value]}</TagLabel>
         </Tag>
  )
}
export default StatusComponent