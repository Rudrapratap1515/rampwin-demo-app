import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

class NewMsgTemplateModal extends React.Component {
    constructor(){
        super()
        this.state = {
            mergeFields: ['phone_number','full_name','first_name','last_name','company','email','address','city','state','zipcode','remarks','Expiry Date'],
            selectedMergeFields: [],
            templateMsgField: ['templateMsg']
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearInputFields = this.clearInputFields.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    clearInputFields(){
        this.setState(prevState => {
            if(prevState.selectedMergeFields.length && prevState.templateName != ''){
                let newState = prevState;
                newState.selectedMergeFields = [];
                newState.templateName = '';
                return newState;
            }            
        })
    }

    render(){
        return (
            <div>    
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={this.props.classes.modal}
                    open={this.props.open}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.props.open}>
                        <div className={this.props.classes.paper}>
                            <h2>Create Messege Template</h2>
                            <a 
                                className={this.props.classes.crossbtn}
                                onClick={e => {this.props.handleClose();this.clearInputFields()}}
                            >
                                x
                            </a>
                            <form>
                                <label>
                                    <input
                                        name="templateName"
                                        type="text"
                                        placeholder="Template Name"
                                        className={this.props.classes.templateName}
                                        value={this.state.templateName}
                                        onChange={this.handleInputChange} 
                                    />
                                </label>
                                <h4>Insert Merge Field</h4>
                                {
                                    this.state.mergeFields.map(item => (
                                        <div 
                                            onClick={
                                                e => {
                                                    this.setState(prevState => {
                                                        let newState = prevState;
                                                        newState.selectedMergeFields.splice(0,0,item);
                                                        return newState;
                                                    })                                    
                                                }
                                            } 
                                            className={this.props.classes.mergeFields}
                                        >
                                            {item}
                                        </div>
                                    ))
                                }
                                {
                                    this.state.templateMsgField.map((item,key) => (
                                        <label>
                                            <textarea
                                                name={item}
                                                className={this.props.classes.templateMsg}
                                                value={this.state.selectedMergeFields}
                                                onChange={this.handleInputChange}
                                                rows={6}
                                                cols={6}
                                            />
                                            <input type="file" className='add-file' name='Upload'/>
                                            <a 
                                                onClick={e => {
                                                    this.setState(prevState => {
                                                        let newState = prevState;
                                                        newState.templateMsgField.push('templateMsg' + (key + 1));
                                                        return newState;
                                                    })
                                                }}
                                                className={this.props.classes.addBtn}
                                            >
                                                +
                                            </a>
                                        </label>
                                        
                                    ))
                                }
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={e => {
                                        this.props.submitMessegeTemplate(this.state);
                                        this.props.handleClose();
                                        this.clearInputFields()
                                    
                                    }}
                                >
                                    Create
                                </Button>
                            </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default NewMsgTemplateModal