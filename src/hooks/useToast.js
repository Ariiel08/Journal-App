import { useEffect, useState } from "react";

export const useToast = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timer1, timer2;

        if (isActive) {
            timer1 = setTimeout(() => {
                setIsActive(false);
            }, 5000);

            timer2 = setTimeout(() => {
                setIsActive(false);
            }, 5300);
        }

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [isActive]);

    const handleToast = () => {
        setIsActive(true);
    };

    const handleClose = () => {
        setIsActive(false);
    };

    return {
        isActive,
        setIsActive,
        handleToast,
        handleClose
    }
}