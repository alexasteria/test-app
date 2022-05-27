import {Autocomplete, Button, ClickAwayListener, Divider, Paper, TextField, Typography} from "@mui/material";
import React, {HTMLAttributes, useCallback, useEffect, useState} from "react";
import {AutocompleteProps} from "@mui/material/Autocomplete/Autocomplete";

const CustomAutocomplete: React.FC<Omit<JSX.IntrinsicAttributes & AutocompleteProps<unknown, undefined, undefined, undefined, "div">, "renderInput">&{label: string, addNewOption: (value: string) => void}> = ({label,addNewOption,...rest}) => {
    const [selected, setSelected] = useState<{label: string} | null>(null)
    const [opened, setOpened] = useState<boolean>(false)
    const [filter, setFilter] = useState<string>("")
    const [newItemName, setNewItemName] = useState<string>("")
    const close = useCallback(()=>{
        setOpened(false)
        setNewItemName("")
        setFilter("")
    },[])
    const addNewItemOnList = useCallback(()=>{
        addNewOption(newItemName)
        setSelected({label: newItemName})
        close()
    },[addNewOption, close, newItemName])
    const CustomPaper = (element: HTMLAttributes<HTMLElement>) => {
        const {children, ...props} = element
        return <Paper elevation={8}>
            <Paper elevation={0} {...props} >
                {children}
                <Divider/>
                <ClickAwayListener onClickAway={()=>setOpened(false)}>
                <div className="add_element" key="click-away-wrapper">
                    <Typography variant="h6" gutterBottom component="div" style={{margin: "10px 0 0 10px"}}>
                        Add {label}
                    </Typography>
                    <div className="form_element">
                        <TextField size="small" fullWidth label={label} onChange={e=>setNewItemName(e.target.value)} value={newItemName} autoFocus={newItemName.length > 0}/>
                    </div>
                </div>
                </ClickAwayListener>
                <div className="add_element_action">
                    <Button variant="contained" onClick={addNewItemOnList}>ADD</Button>
                </div>
            </Paper>
        </Paper>;
    };
    return <Autocomplete
        {...rest}
        open={opened}
        value={selected}
        onChange={(_, item) => {
            setSelected(item as {label: string})
        }}
        PaperComponent={CustomPaper}
        filterOptions={(e )=>{
            return (e as {label: string}[]).filter(item=>item.label.toLocaleLowerCase().includes(filter.toLowerCase()))
        }}
        renderInput={(params) => <TextField {...params} onClick={()=>setOpened(true)} label={label} onChange={e=>setFilter(e.target.value)} value={filter}/>}
    />
}
export default CustomAutocomplete