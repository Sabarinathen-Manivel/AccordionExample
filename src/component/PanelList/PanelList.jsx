import React, { useState } from 'react';
import {array, func } from 'prop-types';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

export const PanelList = (props) => {

   const renderList = (item,index) => {
       return( <Accordion key={`${item.title + index}`}>
       <AccordionSummary
         expandIcon={<ExpandMoreIcon />}
         id={`${item.title}-header`}
       >
         {
           props.isDeleteTrigger && (<DeleteIcon onClick={() => props.handleDeleteAction(index)} />
             )
         }
         <div style={{display: 'flex' ,width:'100%',  justifyContent:'space-between', alignItems: 'flex-start', flexDirection: 'row'}}> 
         <Typography>{item.title}</Typography>
         {item?.children?.length > 0 && <div>
           <AddCircleOutlinedIcon onClick={() => props.handleChildAdd(item,index)} />
          <RemoveCircleOutlineOutlinedIcon onClick={() => props.handleDeleteAction(index)} />
         </div>}
         </div>
        
       </AccordionSummary>
       <AccordionDetails>
         <Typography gutterBottom>
          {item.description}
         </Typography>
         <Typography  component={'span'} variant={'body2'} gutterBottom>
          {item?.children && item.children.map((item,index) => renderList(item,index))}
         </Typography>
       </AccordionDetails>
       </Accordion>)
   };

  return(
    <div>
      {
        props.data.map((item,index) => renderList(item,index))
      }
    </div>
  )
}

PanelList.propType = {
    data: array,
    handleDeleteAction: func
}

export default PanelList;
