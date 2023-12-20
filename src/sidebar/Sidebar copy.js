import React, { useState } from 'react';
import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import { MdMenuOpen } from "react-icons/md";

const Sidebarcomm = () => {
    const [open, setOpen] = useState(false)



  return (
    <div>
        <Sidebar>
            <MdMenuOpen />
            <Menu>
                <SubMenu label="Charts">
                    <MenuItem> Pie charts </MenuItem>
                    <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> charts </MenuItem>
            </Menu>
        </Sidebar>
    </div>
  )
}

export default Sidebarcomm;