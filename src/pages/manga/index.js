import React, { useEffect, useState } from 'react';
import { useGlobal } from 'reactn'
import { Redirect } from 'react-router-dom'

import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MangaCreate from './olustur'
import MangaUpdate from './duzenle'
import MangaDelete from './sil'

import {a11yProps, TabPanel} from "../../components/pages/default-components";

export default function VerticalTabs() {
    const theme = useTheme()
    const [value, setValue] = useState(0)
    const [adminPermList] = useGlobal('adminPermList')
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!adminPermList["add-manga"] && !adminPermList["update-manga"] && !adminPermList["delete-manga"]) {
            setError(true)
        }
    }, [adminPermList])

    function handleChange(event, newValue) {
        setValue(newValue)
    }

    function handleChangeIndex(index) {
        setValue(index)
    }

    return (
        <>
            {error ? <Redirect to="/" /> : ""}
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="Yatay menüler"
                >
                    {adminPermList["add-manga"] ? <Tab label="Oluştur" {...a11yProps(0)} /> : ""}
                    {adminPermList["update-manga"] ? <Tab label="Düzenle" {...a11yProps(1)} /> : ""}
                    {adminPermList["delete-manga"] ? <Tab label="Sil" {...a11yProps(2)} /> : ""}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {adminPermList["add-manga"] ?
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        {value === 0 ? <MangaCreate /> : ""}
                    </TabPanel>
                    : ""}
                {adminPermList["update-manga"] ?
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        {value === 1 ? <MangaUpdate /> : 0}
                    </TabPanel>
                    : ""}
                {adminPermList["delete-manga"] ?
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        {value === 2 ? <MangaDelete theme={theme} /> : 0}
                    </TabPanel>
                    : ""}
            </SwipeableViews>
        </>
    );
}