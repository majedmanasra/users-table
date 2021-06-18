import Drawer from "@material-ui/core/Drawer";
import React, {useEffect, useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    drawerContainer: {
        width: 546,
        textAlign: "center"
    },
    background: {
        height: 158,
        backgroundColor: '#528CFC'
    },
    avatar: {
        position: 'absolute',
        left: 0,
        right: 0,
        margin: 'auto',
        width: 100,
        height: 100,
        top: 100
    },
    majorText: {
        color: theme.primaryText.color,
        fontSize: 18,
        marginTop: 70
    },
    minorText: {
        color: theme.secondaryText.color,
        fontSize: 14
    }
}));

function DetailsSlider({dataProviderById, dataFormatterFunc, queryParameter, onClose}) {

    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState();
    const history = useHistory();
    const match = useRouteMatch();

    useEffect(() => {
        dataProviderById(match.params[queryParameter]).then(t => {
            return t.data.results.length? setSelected(dataFormatterFunc(t.data.results[0])): {}
        });
    }, [match.params, queryParameter, dataProviderById, dataFormatterFunc]);

    useEffect(() => {
        if(!isOpen) {
            onClose();
        }
    }, [isOpen, history, onClose]);


    const classes = useStyles();
    return <Drawer
        anchor="right"
        onClose={() => setIsOpen(false)}
        transitionDuration={1000}
        open={isOpen}
    >
        {selected && <div className={classes.drawerContainer}>
            <div className={classes.background}/>
            <Avatar src={selected.avatar} className={classes.avatar}/>
            <div className={classes.majorText}>{selected.majorTextField}</div>
            <div className={classes.minorText}>{selected.minorTextField}</div>
        </div>}
    </Drawer>

}

export default DetailsSlider;