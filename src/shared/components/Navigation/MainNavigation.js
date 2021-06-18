import React, { useContext } from 'react';

import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { AuthContext } from "../../context/auth-context";
import {useAuth} from "../../hooks/auth-hook";
import styles from './MainNavigation.module.css'

const { SubMenu } = Menu;



const MainNavigation = () => {
    const auth = useContext(AuthContext)

    const handleClick = e => {
        console.log('click ', e);
    };

    const logoutMenu = () => {
        auth.logout()
    }

    return (
        <Menu
            onClick={handleClick}
            className={styles.menu}
            style={{  height: '100vh' }}
            defaultSelectedKeys={['map']}
            defaultOpenKeys={['sub1']}
            mode="vertical"
        >
            <Menu.ItemGroup key="main" title="Main Menu">
                <Menu.Item key="map">
                    <Link to={'/'}>Map</Link>
                </Menu.Item>
                {auth.isLoggedIn && <Menu.Item key="addPoint">
                    <Link to={'/add-point'}>Add Spot</Link>
                </Menu.Item>}
            </Menu.ItemGroup>

            <Menu.ItemGroup key="user" title="User">
                {!auth.isLoggedIn && <Menu.Item key="login">
                    <Link to={'/login'}>Login</Link>
                </Menu.Item>}
                {auth.isLoggedIn && <Menu.Item key="logout">
                    <Link onClick={logoutMenu}>Log Out</Link>
                </Menu.Item>}
            </Menu.ItemGroup>
        </Menu>
    );
};

export default MainNavigation;
