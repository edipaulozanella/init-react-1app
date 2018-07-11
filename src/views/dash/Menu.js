import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Button, Avatar } from "@material-ui/core";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { TouchableOpacity, Content, View, Icon, StyleSheet } from "react-1app";

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !this.state.open && classes.drawerPaperClose
          )
        }}
        open={this.state.open}
      >
        <div
          className={classes.toolbar}
          onMouseEnter={() => {
            this.setState({ open: true });
          }}
          onMouseLeave={() => {
            this.setState({ open: false });
          }}
        >
          <List component="nav">
            <NavLink to={"/user"} activeClassName="active">
              <ListItem button>
                <ListItemIcon>
                  <BeachAccessIcon />
                </ListItemIcon>
                <ListItemText
                  primary={this.props.screenProps.store.getState().user.name}
                />
              </ListItem>
            </NavLink>

            <Divider />

            <NavLink to={"/leads"} activeClassName="active">
              <ListItem button>
                <ListItemIcon>
                  <View style={{ paddingRigth: 1, flex: 0 }}>
                    <Icon
                      style={{ color: "#777" }}
                      fromFontFamily={"Material Design Icons"}
                      name={"chart-timeline"}
                    />
                  </View>
                </ListItemIcon>
                <ListItemText primary="Leads" />
              </ListItem>
            </NavLink>

            <NavLink to={"/campanhas"} activeClassName="active">
              <ListItem button>
                <ListItemIcon>
                  <View style={{ paddingRigth: 1, flex: 0 }}>
                    <Icon
                      style={{ color: "#777" }}
                      fromFontFamily={"Material Design Icons"}
                      name={"credit-card"}
                    />
                  </View>
                </ListItemIcon>
                <ListItemText primary="Campanhas" />
              </ListItem>
            </NavLink>

            <NavLink to={"/equipe"} activeClassName="active">
              <ListItem button>
                <ListItemIcon>
                  <View style={{ paddingRigth: 1, flex: 0 }}>
                    <Icon
                      style={{ color: "#777" }}
                      fromFontFamily={"Material Design Icons"}
                      name={"account-multiple"}
                    />
                  </View>
                </ListItemIcon>
                <ListItemText primary="Equipe" />
              </ListItem>
            </NavLink>

            <NavLink to={"/config"} activeClassName="active">
              <ListItem button>
                <ListItemIcon>
                  <View style={{ paddingRigth: 1, flex: 0 }}>
                    <Icon
                      style={{ color: "#777" }}
                      fromFontFamily={"Material Design Icons"}
                      name={"cart"}
                    />
                  </View>
                </ListItemIcon>
                <ListItemText primary="Configurações" />
              </ListItem>
            </NavLink>
          </List>

          <Divider />
        </div>
      </Drawer>
    );
  }
}

var styles = theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

export default withStyles(styles, { withTheme: true })(MiniDrawer);
