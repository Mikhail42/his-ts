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

    onClick() {
        if (this.state.editMode) {
            this.props.onSaveClick();
        } else {
            this.props.onEditClick();
        }
        this.setState((prevState: EditState) => {
            return {
                editMode: !prevState.editMode
            }
        });
    }

    render(): ReactFragment {
        const editMode = this.state.editMode;
        return <span className="edit-info">
                <span onClick={this.onClick.bind(this)}>{editMode ? "Сохранить" : "Изменить"}</span>
        </span>;
    }
}

export default EditSectionView;