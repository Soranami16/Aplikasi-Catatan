import React from 'react';

class FormInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onInputHandler = this.onInputHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState({ title: event.target.value });
  }

  onInputHandler(event) {
    this.setState({
      body: event.target.innerHTML,
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          placeholder="Catatan rahasia..."
          value={this.state.title}
          onChange={this.onTitleChangeEventHandler}
        />
        <div
          className="add-new-page__input__body"
          data-placeholder="Sebenarnya saya adalah ...."
          contentEditable
          onInput={this.onInputHandler}
        />
        <div className="add-new-page__action">
          <button className="action" type="button" onClick={this.onSubmitHandler} title="Simpan">
            ✓
          </button>
        </div>
      </div>
    );
  }
}

export default FormInput;