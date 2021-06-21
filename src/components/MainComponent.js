import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import NewMsgTemplateModal from './NewMsgTemplateModal';
import MobileViewModal from './MobileViewModal';

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
        fontSize: '20px',
        cursor: 'pointer'
    },
    templateName:{
        width: '100%',
        borderBottom: '1px solid blue',
        border: 0
    },
    templateMsg:{
        width: '53%',
        display: 'block',
        border: '1px solid blue',
        borderRadius: 4,
        display: 'inline-block',
        resize: 'none'
    },
    mergeFieldsBox:{
        position: 'relative',
    },
    mergeFields: {
        padding: '7px',
        borderRadius: 5,
        backgroundColor: 'rgb(255, 105, 135)',
        color: 'black',
        fontSize: 'small',
        margin: '0 10px 10px 0',
        display: 'inline-block',
        cursor: 'pointer'
    },
    fileAddBox:{
        position: 'absolute',
        top: 0,
        right: 0,
    },
    addBtn: {
        color: '#3f51b5',
        fontWeight: '800',
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        right: '-15px'
    },
    thumbnail:{
        width:'50px',
        height:'50px'
    },
    mobileImage:{
        position: 'absolute',
        right: 20,
        cursor: 'pointer'
    }
});

class Main extends React.Component {
    constructor(){
        super()
        this.state = {
            open: false,
            messegeTemplate: [],
            selectedMergeFieldsArray: [],
            messegeToShow: [],
            openMobileModal: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpenMobileModal = this.handleOpenMobileModal.bind(this);
        this.handleCloseMobileModal = this.handleCloseMobileModal.bind(this);
        this.submitMessegeTemplate = this.submitMessegeTemplate.bind(this);
    }

    submitMessegeTemplate = (data) => {
        if(Object.keys(data).includes('selectedMergeFields0')){
            let tempSelectedMergeFieldsArray = [];
            Object.keys(data).map((item,key) => {
                if(item.includes('selectedMergeFields')){
                    tempSelectedMergeFieldsArray.push(data[item]);
                }            
            })
            tempSelectedMergeFieldsArray.shift();
            let tempMessegeTemplateDataObj = {};
            tempMessegeTemplateDataObj.templateName = data.templateName;
            tempMessegeTemplateDataObj.selectedMergeFieldsArray = [];
            tempMessegeTemplateDataObj.selectedMergeFieldsArray.push(tempSelectedMergeFieldsArray);
            this.setState({
                messegeTemplate: [...this.state.messegeTemplate,tempMessegeTemplateDataObj]
            })
        } else {
            this.setState({
                messegeTemplate: [...this.state.messegeTemplate, {
                    templateName: data.templateName,
                    selectedMergeFieldsArray: data.selectedMergeFields
                }]
            })
        }
    }
    
    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleOpenMobileModal = (messeges) => {
        this.setState(
            {
                openMobileModal: true,
                messegeToShow: [...messeges]
            }
        )
    };

    handleCloseMobileModal = () => {
        this.setState({openMobileModal: false})
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
                                </div>
                                {
                                    this.state.messegeTemplate.length ?
                                    this.state.messegeTemplate.map((item,key) => (
                                        <div className="card-row__item">
                                            <div className="card-row__column card-row__column--info">
                                                <h3 className="card-row__name card-row__name--bold">{item.templateName}</h3>
                                            </div>
                                            <img 
                                                className={classes.mobileImage} 
                                                onClick={e => {this.handleOpenMobileModal(item.selectedMergeFieldsArray)}} 
                                                src="https://img.icons8.com/material/24/000000/android--v1.png"
                                            />
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
                <MobileViewModal
                    classes={classes}
                    open={this.state.openMobileModal}
                    handleClose={this.handleCloseMobileModal}
                    messegeToShow={this.state.messegeToShow}
                />               
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