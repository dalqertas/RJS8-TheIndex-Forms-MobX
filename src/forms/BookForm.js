import React, { Component } from "react";
import { observer } from "mobx-react";
import bookStore from '../stores/bookStore';

class BookForm extends Component{
    state= {
        title: "",
        color: "white"
    }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    submitBook = async event =>{
        event.preventDefault();
        await bookStore.addBook(this.state,this.props.author);
        if (!bookStore.errors) {
          this.props.closeModal();
        }
    }

    render () {
        return (
            <div className="mt-5 p-2">
        <form onSubmit={this.submitBook} onChange={this.handleChange}>
          {bookStore.errors && (
            <div className="alert alert-danger" role="alert">
              {bookStore.errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input type="text" className="form-control" name="title"/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            {/* <input type="color" className="form-control" name="color" onChange={this.handleChange}/> */}
            <select name="color">
                <option>Color</option>
                <option>yellow</option>
                <option>green</option>
                <option>purple</option>
                <option>red</option>
                <option>black</option>
            </select>
          </div>
          <input type="submit" />
        </form>
      </div>
        );
    }
}
export default observer(BookForm);