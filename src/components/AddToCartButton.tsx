import { Button, ButtonProps } from '@mui/material';
import React, { useState } from 'react';

export const AddToCartButton = (p: ButtonProps) => {
    const [disabled, setDisabled] = useState(false);
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return <Button
        {...p}
        disabled={disabled}
        onClick={async (e) => {
            if (p.onClick) {
                p.onClick(e)
                setDisabled(true);
                await sleep(1000);
                setDisabled(false);

            }
        }}
    >
        Add to Cart
    </Button>
}