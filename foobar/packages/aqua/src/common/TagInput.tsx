import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {useAppSelector} from '../store/store';
import {tagSelectors} from '../store/tagSlice';

const filter = createFilterOptions<string>();

const TagInput = () => {
    const [value, setValue] = React.useState<string | null>(null);
    const tags = useAppSelector(tagSelectors.selectAll);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue(newValue);
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const {inputValue} = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option);
                if (inputValue !== '' && !isExisting) {
                    filtered.push(inputValue);
                }
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id='free-solo-with-text-demo'
            options={tags}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option) {
                    return option;
                }
                // Regular option
                return option;
            }}
            renderOption={(props, option) => <li {...props}>{option}</li>}
            sx={{width: 300}}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label='Tag'/>
            )}
        />
    );
};

export default TagInput;

