import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall({ selectedType, setSelectedType }) {
  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedType}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Alle typer</em>
        </MenuItem>
        <MenuItem value="Villa">Villa</MenuItem>
        <MenuItem value="Ejerlejlighed">Ejerlejlighed</MenuItem>
        <MenuItem value="Andelsbolig">Andelsbolig</MenuItem>
      </Select>
    </FormControl>
  );
}
