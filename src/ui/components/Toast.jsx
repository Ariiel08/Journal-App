import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState, useEffect } from "react";

export const Toast = ({isActive, handleClose, title, subtitle}) => {

    return (
        <>
            <div className={`toast ${isActive ? "active" : ""}`}>
                <div className="toast-content">
                    <CheckIcon className="check"  />

                    <div className="message">
                        <span className="text text-1">{title}</span>
                        <span className="text text-2">{subtitle}</span>
                    </div>
                </div>

                <IconButton className="close" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>

                <div className={`progress ${isActive ? "active" : ""}`}></div>
            </div>

            {/* <button onClick={handleToast}>Show Toast</button> */}
        </>
    );
}
