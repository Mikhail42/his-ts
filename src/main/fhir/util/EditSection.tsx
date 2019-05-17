import React, {ReactFragment} from 'react';

interface EditProps {
    onEditClick: () => void;
    onSaveClick: () => void;
    edit: boolean;
}

interface EditState {
    editMode: boolean;
}

class EditSectionView extends React.Component<EditProps, EditState> {
    constructor(props: EditProps) {
        super(props);
        this.state = {
            editMode: this.props.edit
        }
    }

    onClick(): void {
        if (this.state.editMode) {
            this.props.onSaveClick();
            this.setState({editMode: false});
        } else {
            this.props.onEditClick();
            this.setState({editMode: true});
        }
    }

    render(): ReactFragment {
        const editMode = this.state.editMode;
        return <span className="edit-info">
                <span onClick={this.onClick.bind(this)}>{editMode ? "Сохранить" : "Изменить"}</span>
        </span>;
    }
}

export default EditSectionView;