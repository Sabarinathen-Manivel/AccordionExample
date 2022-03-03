import React, { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import {
  Box, 
  DialogTitle
} from '@mui/material';
import TextField from '@mui/material/TextField';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from "@mui/icons-material/Delete";
import PanelList from './component/PanelList/PanelList';


function App() {
 
  const list = [
    {
      title: "What is Lorem Ipsum?",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      children: [
        {
          title: "Sub Accordian",
          description: "sub accordian description goes hereee"
        }
      ]
    },
    {
      title: "Where does it come from?",
      description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
      children: []
    },
    {
      title: "Why do we use it?",
      description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      children: []
    }
  ];

  const [data, setData] = useState(list);


  const [open, setOpen] = useState(false);
  const [fullWidh] = useState(true);
  const [maxWidth] = useState("sm");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [itemAddedFromChild, setIsFromChild] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleChange = (key,event) => {
    const value = event.target.value;
    if(key === "title") setTitle(value)
    else setValue(value)
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setValue("");
  };

  const handleAddItem = () => {
    if(itemAddedFromChild)
    {
      // const updatedList = data[index]
    }
    else
    {
      const updatedList = [...data, { title: title, description: value}];
      setData(updatedList);
    }
 
    setOpen(false);
    setTitle("");
    setValue("");
  };

  const handleDeleteIcon = (key) => {
    const updatedList = data.filter((item,index) => index !== key);
    setData(updatedList);
  }

  const [isDeleteTrigger,setIsDeleteTrigger] = useState(false);

  const handleDeleteAction = () => setIsDeleteTrigger(!isDeleteTrigger);

  const AddItem = (<Dialog open={open} fullWidth={fullWidh} maxWidth={maxWidth} onClose={handleClose}>
    <DialogTitle>Add new Item</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please add the details for the new blog item
      </DialogContentText>
       <Box component="form" sx={{
         "& . MuiTextField-root": { m: 1, width: "50ch" }
       }}
       noValidate
       autoComplete='off'
       >
          <TextField 
           required
           id='title'
           label="blog title"
           fullWidth
           variant='standard'
           value={title}
           onChange={(event) => handleChange("title", event)}
         />
          <TextField 
           id='description'
           label="Description"
           fullWidth
           multiline
           rows={'3'}
           variant='filled'
           value={value}
           onChange={(event) => handleChange("value", event)}
         />
       </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleAddItem}>Add</Button>
    </DialogActions>
  </Dialog>);



const handleChildAddAction = (item,index) => {
  setIsFromChild(true)
  handleClickOpen();
  
}

const handleChildRemoveAction = (item,index) => {
  
}



  
  return(
    <div style={{padding: '20px'}}>
      <ButtonGroup variant="outlined" >
          <Button onClick={handleClickOpen} >Add Item</Button>
          <Button onClick={handleDeleteAction}>Delete</Button>
      </ButtonGroup>
     
      {AddItem}
      <PanelList 
      data={data} 
      isDeleteTrigger={isDeleteTrigger} 
      handleDeleteAction={(index )=> handleDeleteIcon(index)} 
      handleChildAdd={handleChildAddAction}
      handleChildRemove={handleChildRemoveAction}
      />
    </div>
  )
}

export default App;
