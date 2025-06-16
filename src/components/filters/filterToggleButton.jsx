export default function FilterToggleButton({ filterName, filter, setFilters, andor, edit }) {
  const handleClick = () => {
  setFilters((prevFilters) => {
    const newFilters = { ...prevFilters };
    const existingIndices = Object.keys(newFilters).map(Number);
    const index = existingIndices.length > 0 ? Math.max(...existingIndices) + 1 : 0;
    newFilters[index] = {
      andor: andor,
      filter: filter,
      name: filterName,
      edit: edit
    };
    return newFilters;
  });
};

  return (
    <button
      className="filterButton"
      onClick={handleClick}
    >
      {filterName}
    </button>
  );
}

