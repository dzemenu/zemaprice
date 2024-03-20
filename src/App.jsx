import React, { useState, useEffect, useMemo } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import usePriceStore from "./store/store";

function App() {
  const TABLE_HEAD = ["No", "name", "model", "price", " "];
  const { price, isLoading, fetch } = usePriceStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  // Memoize filteredData to avoid recalculating on every render
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    if (price.length === 0) return;
    setFilteredData(
      price.filter((obj) =>
        obj.model.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setForceUpdate((prevState) => !prevState); // Toggle forceUpdate to trigger re-render
  }, [searchTerm, price]);

  // Add forceUpdate to dependency array to force re-render
  useEffect(() => {
    // Do something with forceUpdate if needed
  }, [forceUpdate]);

  useEffect(() => {
    fetch(); // Fetch data when the component mounts
  }, [fetch]);
  console.log("Price:", price);
  console.log("Search Term:", searchTerm);
  console.log("Filtered Data:", filteredData);
  useEffect(() => {}, [filteredData]);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex flex-col items-center mt-15">
      <Card className="w-full md:w-2/3 lg:w-1/2 xl:w-1/2 overflow-scroll gap-4">
        <div className="sticky top-0 bg-white z-10">
          <Input
            type="search"
            label="Search Model"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-4"
          />
        </div>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map(({ no, name, model, price }, index) => (
              <tr key={index}>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {no}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {model}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {price}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
export default App;
