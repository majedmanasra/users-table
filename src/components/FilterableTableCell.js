import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    avatar: {
        float: 'left',
        marginRight: 20
    },
    majorCell: {
        color: theme.primaryText.color,
        fontSize: theme.primaryText.size,
        fontWeight: 600,
        letterSpacing: 1,
    },
    minorCell: {
        color: theme.secondaryText.color,
        fontSize: theme.secondaryText.size,
    }
}));


function FilterableTableCell({thumbnail, majorTextField, minorTextField}) {

    const classes = useStyles();

    return <div className={classes.cell}>
        {thumbnail && <Avatar src={thumbnail} className={classes.avatar}/>}
        <div className={classes.majorCell}>{majorTextField}</div>
        <div className={classes.minorCell}>{minorTextField}</div>
    </div>
}

export default FilterableTableCell;