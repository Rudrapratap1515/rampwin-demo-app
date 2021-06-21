import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

class MobileViewModal extends React.Component {
    constructor(){
        super()
        this.state = {
            messegeToShow: []
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.messegeToShow && (this.props.messegeToShow != prevProps.messegeToShow)){
            this.setState({
                messegeToShow: [...this.props.messegeToShow]
            })
        }
    }

    render(){
        return(            
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={this.props.classes.modal}
                open={this.props.open}
                onClick={this.props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={this.props.open}>
                    <div class="smartphone">
                        <div class="content">
                            <div class="mobile">
                                <div class="chat-w">                                
                                    <ul>                                        
                                        <li>                                            
                                            {
                                                this.state.messegeToShow && this.state.messegeToShow.length &&
                                                this.state.messegeToShow.map(item => (
                                                    item.map(innerItem => (
                                                        innerItem.length ? 
                                                        <div class="bubble">{innerItem}</div>
                                                        :
                                                        ''
                                                    ))
                                                ))
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        )
    }
}

export default MobileViewModal;