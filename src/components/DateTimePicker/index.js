import React from 'react';
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
// material-ui components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// @material-ui/icons
// core components
import 'react-datetime/css/react-datetime.css'


export const DateTimePicker=(props)=>{
    const styles={
        label: {
            cursor: "pointer",
            paddingLeft: "0",
            color: "rgba(0, 0, 0, 0.26)",
            fontSize: "14px",
            lineHeight: "1.428571429",
            fontWeight: "400",
            display: "inline-flex"
        },
    };

    return (
        <div>
            <InputLabel style={styles}>
                {props.label}
            </InputLabel>
            <br />
            <FormControl fullWidth>
                <Datetime
                    inputProps={{
                        placeholder: props.placeholder,
                    }}
                    onChange={props.onChange}
                    //defaultValue={new Date()}
                    value={props.value}
                />
            </FormControl>
        </div>
    );
};