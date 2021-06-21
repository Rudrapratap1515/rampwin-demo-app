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
            currentTextAreaTag: 'selectedMergeFields0',
            selectedMergeFieldsArray: [],
            templateMsgField: ['selectedMergeFields0'],
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
            let newState = prevState;
            newState.templateName = '';
            Object.keys(prevState).map((item,key) => {
                if(/\d+$/.test(item) == true){
                    if(prevState[item].length){
                        newState[item] = '';                        
                        newState.templateMsgField.length > 1 && newState.templateMsgField.pop();
                    }
                }
            })
            return newState;
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
                                onClick={e => 
                                    {
                                        this.setState({currentTextAreaTag: 'selectedMergeFields0'})
                                        this.props.handleClose();
                                        this.clearInputFields()
                                    }
                                }
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
                                                    this.setState(prevState => 
                                                        ({ [this.state.currentTextAreaTag]: prevState[this.state.currentTextAreaTag] + '[' + item + ']'})
                                                    )
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
                                        <div className={this.props.classes.mergeFieldsBox}>
                                            <textarea
                                                name={item}
                                                className={this.props.classes.templateMsg}
                                                value={this.state[item]}
                                                onChange={this.handleInputChange}
                                                rows={6}
                                                cols={6}
                                            />
                                            <div className={this.props.classes.fileAddBox}>
                                                <input 
                                                    type="file" 
                                                    className='add-file' 
                                                    onChange={e => {
                                                        this.setState(prevState => {
                                                            let newState = prevState;
                                                            newState['file' + key] = URL.createObjectURL(e.target.files[0]);
                                                            return newState;
                                                        })
                                                    }}
                                                />
                                                {
                                                    this.state['file' + key] && 
                                                    <img className={this.props.classes.thumbnail} src={this.state['file' + key]} alt="Image preview..."/>
                                                }                                            
                                                {
                                                    this.state.templateMsgField.length == (key + 1) &&
                                                    <a 
                                                        onClick={e => {
                                                            this.setState({
                                                                templateMsgField: [...this.state.templateMsgField, 'selectedMergeFields' + (key + 1)],
                                                                currentTextAreaTag: 'selectedMergeFields' + (key + 1)
                                                            })
                                                        }}
                                                        className={this.props.classes.addBtn}
                                                    >
                                                        +
                                                    </a>
                                                }
                                            </div>
                                        </div>                                        
                                    ))
                                }
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={e => {
                                        if(this.state.templateName){
                                            this.setState({currentTextAreaTag: 'selectedMergeFields0'})
                                            this.props.submitMessegeTemplate(this.state);
                                            this.props.handleClose();
                                            this.clearInputFields();
                                        }                                    
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

export default NewMsgTemplateModal;