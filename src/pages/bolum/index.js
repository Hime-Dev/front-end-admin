import React, { useEffect, useState } from 'react';
import { useGlobal } from 'reactn'
import { Redirect } from 'react-router-dom'

import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EpisodeCreate from './olustur'
import EpisodeUpdate from './duzenle'
import EpisodeDelete from './sil'
import EpisodeWatchLinkIndex from './izlemelinkiindex'
import EpisodeDownloadLinkIndex from './indirmelinkiindex'

import {a11yProps, TabPanel} from "../../components/pages/default-components";

export default function VerticalTabs() {
    const theme = useTheme()
    const token = useGlobal("user")[0].token
    const [value, setValue] = useState(0)
    const [adminPermList] = useGlobal('adminPermList')

    const [error, setError] = useState(false)

    useEffect(() => {
        if (!adminPermList["add-episode"] && !adminPermList["update-episode"] && !adminPermList["delete-episode"]) {
            setError(true)
        }
    }, [adminPermList, token])

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
                    {adminPermList["add-episode"] ? <Tab label="Oluştur" {...a11yProps(0)} /> : ""}
                    {adminPermList["update-episode"] ? <Tab label="Düzenle" {...a11yProps(1)} /> : ""}
                    {adminPermList["delete-episode"] ? <Tab label="Sil" {...a11yProps(2)} /> : ""}
                    {adminPermList["add-watch-link"] ? <Tab label="İzleme" {...a11yProps(3)} /> : ""}
                    {adminPermList["add-download-link"] ? <Tab label="İndirme" {...a11yProps(4)} /> : ""}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {adminPermList["add-episode"] ?
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        {value === 0 ? <EpisodeCreate /> : ""}
                    </TabPanel>
                    : ""}
                {adminPermList["update-episode"] ?
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        {value === 1 ? <EpisodeUpdate theme={theme} /> : 0}
                    </TabPanel>
                    : ""}
                {adminPermList["delete-episode"] ?
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        {value === 2 ? <EpisodeDelete theme={theme} /> : 0}
                    </TabPanel>
                    : ""}
                {adminPermList["add-watch-link"] ?
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        {value === 3 ? <EpisodeWatchLinkIndex /> : 0}
                    </TabPanel>
                    : ""}
                {adminPermList["add-download-link"] ?
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        {value === 4 ? <EpisodeDownloadLinkIndex /> : 0}
                    </TabPanel>
                    : ""}
            </SwipeableViews>
        </>
    );
}