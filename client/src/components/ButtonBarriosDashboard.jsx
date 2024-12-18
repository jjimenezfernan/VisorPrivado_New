/**
 * Boton para la selecion de barrios en el barrios_dashboard
 */

import { useState, useEffect } from "react";
import { Button } from '@mui/material';

function ButtonBarriosDashboard({ children, onClickFunction }) {

    return (
        <Button
            sx={{
                backgroundColor: "white",
                color: "#f43653",
                borderRadius: "10px",
                padding: "10px",
                margin: "5px",
                width: "100px",
                height: "50px",
                fontSize: "15px",
                fontWeight: "bold",
                textTransform: "none",
                '&:hover': {
                  backgroundColor: '#cac6c7', // Color al pasar el mouse
                },
            }}
            variant="contained"
            onClick={() => onClickFunction(children)}
        >
            {children}
        </Button>
    );
}

export default ButtonBarriosDashboard;