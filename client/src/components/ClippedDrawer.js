import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DomainIcon from '@material-ui/icons/Domain';
import ShopIcon from '@material-ui/icons/Shop';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Collapse from '@material-ui/core/Collapse';
import ViewModule from '@material-ui/icons/ViewModule';
import Camera from '@material-ui/icons/Camera';
import Computer from '@material-ui/icons/Computer';
import AttachMoney from '@material-ui/icons/AttachMoney';
import { BASE_API_URL } from "../config";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    zIndex: theme.zIndex.appBar - 1,
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  card: {
    maxWidth: 345,
    display: 'inline-block',
    margin: theme.spacing.unit * 2,
    disabled: true,
  },
  media: {
    height: 140,
  },
});

class ClippedDrawer extends React.Component {
    state = {
      serviceOpen: true,
      organizationOpen: false,
      activePageId: "store",
      services: [],
    };

    componentDidMount() {
        this.loadServices();
    }

    handleClick = (id) => {
        return () => {
            if (id === "store") {
                this.loadServices();
            }

            if (id === "service") {
                this.setState(state => ({ serviceOpen: !state.serviceOpen }));
            }
            else if (id === "organization") {
                this.setState(state => ({ organizationOpen: !state.organizationOpen }));
            }
            else {
                this.setState(state => ({ activePageId: id }));
            }
        }
    };

    loadServices = () => {
        var url = BASE_API_URL + "/service/list";
        var self = this;
        fetch(url)
        .then(function(response) {
            if (response.status >= 400) {
            throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function(json) {
            self.setState({
              services: JSON.parse(json.data)
            });
        });
    }

    render() {
        const { classes } = this.props;
    
        return (
            <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    <ListItem button onClick={this.handleClick("service")}>
                        <ListItemIcon>
                            <Camera />
                        </ListItemIcon>
                        <ListItemText inset primary="Services" />
                        {this.state.serviceOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.serviceOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button onClick={this.handleClick("store")} className={classes.nested} selected={this.state.activePageId === "store"}>
                                <ListItemIcon>
                                    <ShopIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Store" />
                            </ListItem>
                            <ListItem button onClick={this.handleClick("instances")} className={classes.nested} selected={this.state.activePageId === "instances"}>
                                <ListItemIcon>
                                    <ViewModule />
                                </ListItemIcon>
                                <ListItemText inset primary="Instances" />
                            </ListItem>
                            <ListItem button onClick={this.handleClick("virtual-machines")} className={classes.nested} selected={this.state.activePageId === "virtual-machines"}>
                                <ListItemIcon>
                                    <Computer />
                                </ListItemIcon>
                                <ListItemText inset primary="Virtual Machines" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={this.handleClick("organization")}>
                        <ListItemIcon>
                            <DomainIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Organization" />
                        {this.state.organizationOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.organizationOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button onClick={this.handleClick("billing")} className={classes.nested} selected={this.state.activePageId === "billing"}>
                            <ListItemIcon>
                                <AttachMoney />
                            </ListItemIcon>
                            <ListItemText inset primary="Billing" />
                        </ListItem>
                        <ListItem button onClick={this.handleClick("access-groups")} className={classes.nested} selected={this.state.activePageId === "access-groups"}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Access Groups" />
                        </ListItem>
                        </List>
                    </Collapse>
                </List>
                <Divider />
                <List>
                    <ListItem button key='My profile' onClick={this.handleClick("my-profile")}>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary='My profile'/>
                    </ListItem>
                    <ListItem button key='Sign out' onClick={this.props.logout}>
                        <ListItemIcon>
                            <ExitToApp/>
                        </ListItemIcon>
                        <ListItemText primary='Sign out'/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {this.state.activePageId === "store" && <Typography paragraph>
                {this.state.services.map(function(service, idx){
                    return (<Card className={classes.card} disabled={true}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {service.name}
                            </Typography>
                            <Typography component="p">
                                {service.description}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            Share
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions>
                    </Card>)
                })}
                </Typography>}
                {this.state.activePageId === "instances" && <Typography paragraph>
                Instances page
                </Typography>}
                {this.state.activePageId === "virtual-machines" && <Typography paragraph>
                Virtual machines page
                </Typography>}
                {this.state.activePageId === "billing" && <Typography paragraph>
                Billing page
                </Typography>}
                {this.state.activePageId === "access-groups" && <Typography paragraph>
                Access groups page
                </Typography>}
                {this.state.activePageId === "my-profile" && <Typography paragraph>
                My profile page
                </Typography>}
                <Typography paragraph>
                Some content here.
                </Typography>
            </main>
            </div>
        );
    }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);