import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { pl } from 'date-fns/locale/pl';
registerLocale('pl', pl)
const AddActionForm = (props) => {
    const [startDate, setStartDate] = useState(new Date());
return (
    <div className="formwrapper">
        <form>
            <div className="wrapper">
            <label htmlFor="date">Data</label>
            <DatePicker locale="pl" id="date" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div>
            <label htmlFor="actiontype">Typ akcji</label>
            </div>
            <div>
            <label htmlFor="description">Opis</label>
            </div>
        </form>
    </div>
)
}
export default AddActionForm; 
