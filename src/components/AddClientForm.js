const AddClientForm = (props) => {
    return (
        <div className="formwrapper" >
            <form onSubmit={props.handleSubmit}>
                <div className="wrapper">
                    <label htmlFor="name">Nazwa</label>
                    <input className='formFields' type="text" id="name" name="name" value={props.addedClient.name} onChange={props.handleInputChange}></input>
                </div>
                {props.errors.name && <p>{props.errors.name}</p>}
                <div className="wrapper">
                    <label htmlFor="street">Ulica</label>
                    <input className='formFields' type="text" id="street" name="street" value={props.addedClient.address.street} onChange={props.handleAddressChange}></input>
                </div>
                {props.errors.address.street && <p>{props.errors.address.street}</p>}
                <div className="wrapper">
                    <label htmlFor="zipCode">Kod pocztowy</label>
                    <input className='formFields' type="text" id="zipCode" name="zipCode" value={props.addedClient.address.zipCode} onChange={props.handleAddressChange}></input>
                </div>
                {props.errors.address.zipCode && <p>{props.errors.address.zipCode}</p>}
                <div className="wrapper">
                    <label htmlFor="city">Miasto</label>
                    <input className='formFields' type="text" id="city" name="city" value={props.addedClient.address.city} onChange={props.handleAddressChange}></input>
                </div>
                {props.errors.address.city && <p>{props.errors.address.city}</p>}
                <div className="wrapper">
                    <label htmlFor="nip">NIP</label>
                    <input className='formFields' type="text" id="nip" name="nip" value={props.addedClient.nip} onChange={props.handleInputChange}></input>
                </div>
                {props.errors.nip && <p>{props.errors.nip}</p>}
                <div className="wrapper">
                    <button type="submit" onChange={props.handleInputChange}>Submit</button>
                </div>
            </form>
        </div>

    )
}
export default AddClientForm; 