import React, { useState } from "react";
import { Container, Table, Thead, Tbody, Tr, Th, Td, Button, IconButton, HStack, VStack, Select } from "@chakra-ui/react";
import { FaSort, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const data = [
  { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com" },
  { id: 3, name: "Sam Johnson", age: 45, email: "sam@example.com" },
  { id: 4, name: "Alice Brown", age: 23, email: "alice@example.com" },
  { id: 5, name: "Bob White", age: 31, email: "bob@example.com" },
  { id: 6, name: "Charlie Black", age: 29, email: "charlie@example.com" },
  { id: 7, name: "David Green", age: 40, email: "david@example.com" },
  { id: 8, name: "Eve Blue", age: 27, email: "eve@example.com" },
  { id: 9, name: "Frank Yellow", age: 36, email: "frank@example.com" },
  { id: 10, name: "Grace Pink", age: 32, email: "grace@example.com" },
];

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const itemsPerPage = 5;

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <HStack>
                  <span>ID</span>
                  <IconButton aria-label="Sort ID" icon={<FaSort />} size="sm" onClick={() => handleSort("id")} />
                </HStack>
              </Th>
              <Th>
                <HStack>
                  <span>Name</span>
                  <IconButton aria-label="Sort Name" icon={<FaSort />} size="sm" onClick={() => handleSort("name")} />
                </HStack>
              </Th>
              <Th>
                <HStack>
                  <span>Age</span>
                  <IconButton aria-label="Sort Age" icon={<FaSort />} size="sm" onClick={() => handleSort("age")} />
                </HStack>
              </Th>
              <Th>
                <HStack>
                  <span>Email</span>
                  <IconButton aria-label="Sort Email" icon={<FaSort />} size="sm" onClick={() => handleSort("email")} />
                </HStack>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedData.map((item) => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.age}</Td>
                <Td>{item.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <HStack spacing={4}>
          <IconButton aria-label="Previous Page" icon={<FaArrowLeft />} onClick={() => handlePageChange("prev")} isDisabled={currentPage === 1} />
          <Text>
            Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
          </Text>
          <IconButton aria-label="Next Page" icon={<FaArrowRight />} onClick={() => handlePageChange("next")} isDisabled={currentPage === Math.ceil(data.length / itemsPerPage)} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
