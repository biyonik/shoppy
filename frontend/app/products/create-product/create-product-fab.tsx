"use client";

import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateProductModal from './create-product-modal';
import React from 'react';

export default function CreateProductFloatingActionButton() {
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);

    function handleClose() {
        setModalVisible((prevState: boolean) => !prevState);
    }

    return (
        <>
            <CreateProductModal open={modalVisible} handleClose={handleClose} />
            <div className='absolute left-10 bottom-10'>
                <Fab color="primary" onClick={() => setModalVisible(true)}>
                    <AddIcon />
                </Fab>
            </div>
        </>
    )
}