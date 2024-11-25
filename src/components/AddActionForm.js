import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { pl } from 'date-fns/locale/pl';
import Select from "./Select";
registerLocale('pl', pl)
const AddActionForm = (props) => {
    const [date, setDate] = useState(new Date());
    const [actionType, setActionType] = useState({ key: '', val: '' })

    const choicesActions = [
        ['', '---'],
        ['telephone', 'Kontakt telefoniczny'],
        ['meeting', 'Spotkanie z klientem'],
        ['email', 'Kontakt e-mail']
    ]

    const handleChangeAction = (e) => {
        setActionType({
            key: e.target.value,
            val: e.target.options[e.target.selectedIndex].innerText
        })
        props.handleInputChangeAction(e)
        
    }

    const handleChangeDate = (date) =>{
        setDate(date);
        props.handleInputChangeDate(date)
        console.log(date)
    } 
    return (
        <div className="formwrapper">
            <form onSubmit={props.handleSubmit}>
                <div className="wrapper">
                    <label htmlFor="date">Data</label>
                    <DatePicker dateFormat='dd-MM-yyyy' locale="pl" id="date" name="date" selected={date} onChange={handleChangeDate} />
                </div>
                {props.errors.date && <p>{props.errors.date}</p>}
                <div>
                    <label htmlFor="actiontype">Typ akcji</label>
                    <Select values={choicesActions} selectedValue={actionType.key} OnValueChange={handleChangeAction} name="actionType" />
                </div>
                {props.errors.actionType && <p>{props.errors.actionType}</p>}
                <div>
                    <label htmlFor="description">Opis</label>
                    <input type="text" id="description" name="description" value={props.addedAction.description} onChange={props.handleInputChange}></input>
                </div>
                {props.errors.description && <p>{props.errors.description}</p>}
                <div>
                    <button type="submit" onChange={props.handleInputChange}>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default AddActionForm; 
