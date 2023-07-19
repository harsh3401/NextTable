"use client";
import { Tag, TagLabel } from "@chakra-ui/react";
import React from "react";
import { useMemo } from "react";
const StatusComponent = ({ status }: { status: number }) => {
  const value = status % 3;
  const keys = ["Waiting", "Paid", "Failed"];
  const colors = ["yellow.200", "green.200", "red.200"];

  return (
    <div className="flex flex-row items-center">
      <Tag
        size={"md"}
        fontWeight={"bold"}
        borderRadius="full"
        variant="solid"
        bg={colors[value]}
        textColor={"brown"}
      >
        <TagLabel>{keys[value]}</TagLabel>
      </Tag>
    </div>
  );
};
export default StatusComponent;
