import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import NewMsgTemplateModal from './NewMsgTemplateModal';

const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        overflow: 'auto',
        backgroundColor: 'white',
        borderRadius:'10px',
        width: '60%',
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: '30px',
        position: 'relative'
    },
    button: {
        position: 'absolute',
        right: 0,
        top: '5%'
    },
    container:{
        width: '70%',
        margin: 'auto'
    },
    crossbtn:{
        position: 'absolute',
        right: 0,
        top: 0,
        color: 'black',
        padding: '10px',
        fontSize: '20px'
    },
    templateName:{
        width: '100%',
        borderBottom: '1px solid blue',
        border: 0
    },
    templateMsg:{
        width: '60%',
        display: 'block',
        border: '1px solid blue',
        borderRadius: 4,
        display: 'inline-block',
    },
    mergeFields: {
        padding: '10px',
        borderRadius: 5,
        backgroundColor: 'rgb(255, 105, 135)',
        color: 'black',
        margin: '0 10px 10px 0',
        display: 'inline-block'
    },
    addBtn: {
        backgroundColor: 'blue',
        borderRadius: '100%',
        color: 'white',
        padding: '10px 12px'
    }
});

class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            open: false,
            messegeTemplate: []
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitMessegeTemplate = this.submitMessegeTemplate.bind(this);
    }

    submitMessegeTemplate = (data) => {
        this.setState(prevState => {
            let newState = prevState;
            newState.messegeTemplate.push(data.templateName);
            return newState;
        })
    }
    
    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Button className={classes.button} variant="contained" color="secondary" onClick={e => {this.handleOpen()}}>
                    Add New +
                </Button>
                <div>
                    <section className="card-row">
                        <div className="container card-row__container">
                            <div className="card-row__wrapper">
                                <div className="card-row__item">
                                    <div className="card-row__column card-row__column--info">
                                        <h3 className="card-row__name card-row__name--bold">Template Name</h3>
                                    </div>
                                    <div className="card-row__column">
                                        <a className="card-row__link" href="#">Action</a>
                                    </div>
                                </div>
                                {
                                    this.state.messegeTemplate.length ?
                                    this.state.messegeTemplate.map(item => (
                                        <div className="card-row__item">
                                            <div className="card-row__column card-row__column--info">
                                                <h3 className="card-row__name card-row__name--bold">{item}</h3>
                                            </div>
                                            <div className="card-row__column">
                                                <a className="card-row__link" href="#">Learn More</a>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className="card-row__item">
                                        <div className="card-row__column card-row__column--info centered">
                                            <h3 className="card-row__name card-row__name--bold">No Tempate</h3>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                </div>
                <NewMsgTemplateModal 
                    classes={classes} 
                    open={this.state.open}
                    handleClose={this.handleClose}
                    submitMessegeTemplate={this.submitMessegeTemplate}
                />
            </div>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Main);