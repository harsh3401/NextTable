"use client";
import { Tag, TagLabel } from "@chakra-ui/react";
import React from "react";

const StatusComponent = ({ status }: { status: number }) => {
  //random value to mock data
  const value = status % 3;
  //color scheme and values for various statuses
  const keys = ["Waiting", "Paid", "Failed"];
  const colors = ["yellow.200", "green.200", "red.200"];

  return (
    <Tag
      size={"md"}
      fontWeight={"bold"}
      borderRadius="full"
      variant="solid"
      width={"5rem"}
      justifyContent={"center"}
      bg={colors[value]}
      textColor={"brown"}
    >
      <TagLabel>{keys[value]}</TagLabel>
    </Tag>
  );
};
export default StatusComponent;
