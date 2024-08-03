import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { PokemonContext } from "../context/PokemonContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const generations = [
  "Generation I",
  "Generation II",
  "Generation III",
  "Generation IV",
  "Generation V",
  "Generation VI",
  "Generation VII",
  "Generation VIII",
  "Generation IX",
];

export default function FilterSelectInput() {
  const { genFilter, setGenFilter } = React.useContext(PokemonContext);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGenFilter(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl
        className="select-input"
        variant="outlined"
        sx={{ mb: 3, width: 320 }}
      >
        <InputLabel
          className="filter-input-label "
          id="demo-multiple-checkbox-label"
        >
          Filter
        </InputLabel>
        <Select
          className="filter-input"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={genFilter}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {generations.map((generation) => (
            <MenuItem key={generation} value={generation}>
              <Checkbox checked={genFilter.indexOf(generation) > -1} />
              <ListItemText primary={generation} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
