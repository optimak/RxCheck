import "./InputField.scss";

function InputField({ label, name, type,other }) {
    return (
        <div className="field">
            <label htmlFor={name} className="field__label">
                {label} <span style={{ color: 'red' }}>{other}</span>
            </label>
            <input type={type} id={name} name={name} className="field__input" />
        </div>
    );
}

export default InputField;
