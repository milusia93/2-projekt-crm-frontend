const Select = (props) => {
return (
    <select value={props.selectedValue} onChange={props.OnValueChange}>
        {props.values.map(([value, text])=>
        <option key={value} value={value}>
            {text}
        </option>
        )}

    </select>
)
}
export default Select;