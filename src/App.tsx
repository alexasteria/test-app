import React, {useMemo, useState} from 'react';
import {Autocomplete, Button, FormControl, Paper, Stack, TextField, Typography} from "@mui/material";
import "./App.css"
import {CustomAutocomplete} from "./components";
import {useGetOptionsData} from "./components/use_get_options_data";

const App: React.FC = () => {
    const {relationOptions, positionOptions, loading, error, addNewOption} = useGetOptionsData()
    const [entity, setEntity] = useState<string>("")
    const [clientID, setClientID] = useState<number | undefined>(undefined);
    const entityData = useMemo(()=>{
        if (entity === "") return null;
        if (entity === "Individual"){
            return <>
                <div className="form_element">
                    <TextField id="outlined-basic" label="First Name" variant="outlined" sx={{ width: 300 }}/>
                </div>
                <div className="form_element">
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ width: 300 }}/>
                </div>
            </>
        }
        return <div className="form_element"><TextField id="outlined-basic" label="Company Name" variant="outlined" sx={{ width: 300 }}/></div>
    },[entity])
    const checkClientID = useMemo(()=>{
        return !(!clientID || (clientID > 1 && clientID < 99000));
    },[clientID])
    if (error) return <div>{error.message}</div>
  return (
    <div className="App">
        <Paper elevation={15} className="list">
            <Typography variant="h5" gutterBottom component="div" style={{margin: "10px 0 0 10px"}}>
                Add
            </Typography>
            <FormControl>
                <Paper elevation={24} className="list">
                    <Typography variant="h6" gutterBottom component="div" style={{margin: "10px 0 0 10px"}}>
                        Details
                    </Typography>
                    <Autocomplete
                        className="form_element"
                        value={entity}
                        onChange={(_,value)=>value ? setEntity(value as string) : setEntity("")}
                        options={["Individual", "Company"]}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Entity" />}
                    />
                    <div className="form_element">
                        <TextField value={clientID} onChange={(e)=>setClientID(Number(e.target.value))} id="outlined-basic" label="ClientID" variant="outlined" sx={{ width: 300 }} type="number" error={checkClientID}/>
                    </div>
                    {entityData}
                </Paper>
                <Paper elevation={24} className="list">
                    <CustomAutocomplete
                        label="Relation to the Company"
                        className="form_element"
                        sx={{ width: 300 }}
                        options={relationOptions}
                        addNewOption={(value: string)=>addNewOption("RELATION", value)}
                        loading={loading}
                    />
                    <CustomAutocomplete
                        label="Position in the Company"
                        className="form_element"
                        sx={{ width: 300 }}
                        options={positionOptions}
                        addNewOption={(value: string)=>addNewOption("POSITION", value)}
                        loading={loading}
                    />
                </Paper>
            </FormControl>
            <div className="actions">
                <Stack spacing={2} direction="row">
                    <Button variant="contained" color="inherit">CANCEL</Button>
                    <Button variant="contained">ADD</Button>
                </Stack>
            </div>
        </Paper>
    </div>
  );
}

export default App;
